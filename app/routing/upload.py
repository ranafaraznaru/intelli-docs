import os
from dotenv import load_dotenv
from pinecone import Pinecone
from fastapi import UploadFile, File,APIRouter, Depends,HTTPException
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
from app.dependencies import authenicate_user
from app.database.db import get_db
from sqlalchemy.orm import Session
from app.database.schema.document_schema import DocumentSchema
import cloudinary
import cloudinary.uploader
from app.config.app_config import getAppConfig
import uuid



load_dotenv()
router = APIRouter(prefix="/documents/upload" , dependencies=[Depends(authenicate_user)])

def get_cloudinary():
    config = getAppConfig()
    cloudinary.config(
        cloud_name=config.cloudinary_cloud_name,
        api_key=config.cloudinary_api_key,
        api_secret=config.cloudinary_api_secret,
    )


pc = Pinecone(
    api_key=os.getenv("PINECONE_API_KEY")
)
index = pc.Index("multi-pdf")



@router.post("")
async def upload_pdf(file: UploadFile = File(...),db: Session = Depends(get_db),user=Depends(authenicate_user)):
    user_id = user["id"]
    

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    file_bytes = file.file.read()

    get_cloudinary()

    result = cloudinary.uploader.upload(
        file_bytes,
        resource_type="raw",
        folder="pdfs",
        public_id=file.filename,
    )

    reader = PdfReader(file.file)

    total_pages = len(reader.pages)


    document = DocumentSchema(
        user_id=user_id,
        file_name=file.filename,
        status="processing",
        url = result["secure_url"],
        total_pages=total_pages
        
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    document_id = str(document.id)


    model = SentenceTransformer("all-MiniLM-L6-v2")


    splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

    # text = ""

    # # for page in reader.pages:
    # for page_number, page in enumerate(reader.pages, start=1):
    #     text += page.extract_text() or ""

    # chunks = splitter.split_text(text)
    # embeddings = model.encode(chunks)
    # vectors = []

    # for chunk, embedding in zip(chunks, embeddings):
    #     vectors.append(
    #         {
    #             "id":str(uuid.uuid4()),
    #             "values": embedding.tolist(),
    #             "metadata": {
    #                 "document_id": document_id,
    #                 "text": chunk,
    #                 "source": file.filename,
    #                 "page": page_number,
    #                 "user_id":user_id,
    #             }
    #         }
    #     )

    # index.upsert(vectors=vectors)
    documents = []

    for page_number, page in enumerate(reader.pages, start=1):

        page_text = page.extract_text() or ""

        page_chunks = splitter.split_text(page_text)

        for chunk in page_chunks:
            documents.append({
            "text": chunk,
            "page": page_number
        })
    # Generate embeddings
    texts = [doc["text"] for doc in documents]
    embeddings = model.encode(texts)

    vectors = []

    for doc, embedding in zip(documents, embeddings):
        vectors.append(
            {
                "id": str(uuid.uuid4()),
                "values": embedding.tolist(),
                "metadata": {
                    "document_id": document_id,
                    "user_id": user_id,
                    "text": doc["text"],
                    "page": doc["page"],
                    "source": file.filename,
                    "total_pages" : total_pages
                }
            }
        )
    
    index.upsert(vectors=vectors)


    

    document.status = "completed"
    db.commit()

    return {
        "message": "Document uploaded successfully",
        "filename": file.filename,
        "document_id": document_id,
        "user_id":user_id,
        "total_pages" : total_pages,
        "chunks": len(documents),
    }


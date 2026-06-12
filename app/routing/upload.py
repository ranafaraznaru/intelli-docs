import os
import uuid
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





load_dotenv()
router = APIRouter(prefix="/upload" , dependencies=[Depends(authenicate_user)])

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

    print('result',result)

    document = DocumentSchema(
        user_id=user_id,
        file_name=file.filename,
        status="processing",
        url = result["secure_url"]
    )
    print('document',document)

    db.add(document)
    db.commit()
    db.refresh(document)

    document_id = str(document.id)


    model = SentenceTransformer("all-MiniLM-L6-v2")


    splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
    
    reader = PdfReader(file.file)

    text = ""

    # for page in reader.pages:
    for page_number, page in enumerate(reader.pages, start=1):
        text += page.extract_text() or ""

    chunks = splitter.split_text(text)
    embeddings = model.encode(chunks)
    vectors = []

    for chunk, embedding in zip(chunks, embeddings):
        vectors.append(
            {
                "id":document_id,
                "values": embedding.tolist(),
                "metadata": {
                    "document_id": document_id,
                    "text": chunk,
                    "source": file.filename,
                    "page": page_number,
                    "user_id":user_id,
                }
            }
        )

    index.upsert(vectors=vectors)

    # stats = index.describe_index_stats()
    document.status = "completed"
    db.commit()

    return {
        "message": "Document uploaded successfully",
        "filename": file.filename,
        "document_id": document_id,
        "user_id":user_id,
        "chunks": len(chunks),
        # "index_stats": stats
    }


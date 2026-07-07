# from sentence_transformers import SentenceTransformer

# embedding_model = SentenceTransformer(
#     "all-MiniLM-L6-v2"
# )


from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.config.app_config import getAppConfig

config = getAppConfig()
# _model = GoogleGenerativeAIEmbeddings(
#     model="models/gemini-embedding-001",
#     google_api_key=config.google_api_key
# )


embeddings = GoogleGenerativeAIEmbeddings(
    # model="gemini-embedding-001"
     model = "gemini-embedding-2-preview",
     google_api_key=config.google_api_key
)

class EmbeddingModel:
    def encode(self, texts):
        return embeddings.embed_query(texts) if isinstance(texts, str) else embeddings.embed_documents(texts)

embedding_model = EmbeddingModel()

# 🚀 Intelli-Docs

An enterprise-grade RAG (Retrieval-Augmented Generation) application that allows users to upload PDF documents, index them into a vector database, and have intelligent conversations with their documents using state-of-the-art LLMs.

## 🏗️ System Architecture

The system follows a modern decoupled architecture, ensuring scalability, security, and high availability.

### Architecture Diagram

```mermaid
graph TD
    User((User)) -->|HTTPS| FE[Frontend: Next.js / Vercel]
    FE -->|REST API| Nginx[Nginx Reverse Proxy / SSL]
    Nginx -->|Proxy Pass| BE[Backend: FastAPI / Docker / EC2]

    subgraph "AI & Data Pipeline"
        BE -->|Upload PDF| Cloudinary[Cloudinary Storage]
        BE -->|Extract & Chunk| TextProcessor[Text Splitter]
        TextProcessor -->|Embeddings| Gemini[Gemini Embeddings]
        Gemini -->|Upsert Vectors| Pinecone[Pinecone Vector DB]
        BE -->|Query Vector| Pinecone
        Pinecone -->|Retrieve Context| BE
        BE -->|Augmented Prompt| Gemini[Google Gemini 2.5 Flash]
        Gemini -->|Generate Answer| BE
    end

    subgraph "Persistence Layer"
        BE -->|User/Doc/Chat Data| Aurora[AWS Aurora PostgreSQL]
    end

    subgraph "CI/CD Pipeline"
        Git[GitHub Repository] -->|Push| GHA[GitHub Actions]
        GHA -->|Build & Push| ECR[Amazon ECR]
        ECR -->|Pull Image| EC2[AWS EC2 Self-Hosted Runner]
        EC2 -->|Orchestrate| DC[Docker Compose]
        DC -->|Run| BE
    end
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Deployment**: Vercel

### Backend

- **Framework**: FastAPI (Python 3.12)
- **Database**: AWS Aurora (PostgreSQL)
- **Vector Store**: Pinecone (Serverless)
- **File Storage**: Cloudinary
- **AI Integration**:
  - **LLM**: Google Gemini 2.5 Flash
  - **Embeddings**: Google Gemini Embeddings
  - **Orchestration**: LangChain (Text Splitting & Prompting)

### Infrastructure & DevOps

- **Containerization**: Docker & Docker Compose
- **Cloud Provider**: AWS (EC2, ECR, Aurora)
- **CI/CD**: GitHub Actions (Self-hosted runner)
- **Web Server**: Nginx (Reverse Proxy)
- **Security**: SSL/TLS via Let's Encrypt (Certbot)

## ✨ Key Features

- **Document Management**: Upload and manage PDF documents per user.
- **Intelligent RAG Pipeline**:
  - PDF text extraction and recursive chunking.
  - High-dimensional vector search using Pinecone.
  - Context-aware responses powered by Gemini.
- **Conversational Memory**: Maintains chat history for each document to provide context-aware follow-up answers.
- **Secure Architecture**: JWT-based authentication, CORS protection, and SSL termination.
- **Automated Deployment**: Full CI/CD pipeline from commit to production.

## 🔄 How it Works: The Pipeline

### 1. Document Ingestion Flow

`User Upload` $\rightarrow$ `Cloudinary (Storage)` $\rightarrow$ `PyPDF (Extraction)` $\rightarrow$ `Recursive Character Splitting` $\rightarrow$ `Gemini Embeddings` $\rightarrow$ `Pinecone (Indexing)` $\rightarrow$ `Aurora DB (Metadata)`.

### 2. Chat Query Flow

`User Question` $\rightarrow$ `Gemini Embeddings` $\rightarrow$ `Pinecone Vector Search` $\rightarrow$ `Context Retrieval` $\rightarrow$ `Prompt Augmentation (History + Context)` $\rightarrow$ `Gemini LLM` $\rightarrow$ `Final Answer`.

### 3. Deployment Flow

`Code Push` $\rightarrow$ `GitHub Actions` $\rightarrow$ `Docker Build` $\rightarrow$ `Amazon ECR` $\rightarrow$ `EC2 Runner` $\rightarrow$ `Docker Compose Up` $\rightarrow$ `Nginx Proxy`.

## 🚀 Getting Started (Local Development)

### Prerequisites

- Docker & Docker Compose
- API Keys: Google Gemini, Pinecone, Cloudinary

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ranafaraznaru/intelli-docs.git
   cd intelli-docs
   ```

2. Configure Environment Variables:
   Create a `.env` file in the `backend/` directory:

   ```env
   DATABASE_URL=postgresql://user:pass@host:port/db
   PINECONE_API_KEY=your_key
   GOOGLE_API_KEY=your_key
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```

3. Launch with Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. Start Frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📡 API Endpoints

### Auth

- `POST /api/v1/auth/signup` - Create a new user account.
- `POST /api/v1/auth/login` - Authenticate and receive JWT.

### Documents

- `POST /api/v1/documents` - Upload a PDF and start indexing.
- `GET /api/v1/documents` - List all uploaded documents.
- `DELETE /api/v1/documents/{id}` - Remove a document and its vectors.

### Chat

- `POST /api/v1/chat/{doc_id}/query` - Ask a question about a specific document.
- `GET /api/v1/chat/{doc_id}/history` - Retrieve chat history for a specific document.

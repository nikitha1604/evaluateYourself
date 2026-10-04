# 🚀 Evaluate Yourself — AI-Powered Document Analysis & Evaluation

> An AI-powered full-stack application that uses **Retrieval-Augmented Generation (RAG)** to analyze documents, retrieve relevant information, answer questions, generate summaries, and provide intelligent evaluation using **Google Gemini**.

[![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Backend-Flask-black?logo=flask)](https://flask.palletsprojects.com/)
[![ChromaDB](https://img.shields.io/badge/Vector%20DB-ChromaDB-orange)](https://www.trychroma.com/)
[![Gemini](https://img.shields.io/badge/LLM-Google%20Gemini-4285F4?logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📌 Overview

**Evaluate Yourself** is a full-stack AI application designed to make document analysis and self-evaluation more intelligent and interactive.

Instead of sending an entire document directly to an LLM, the application follows a **Retrieval-Augmented Generation (RAG)** pipeline:

```text
Document Upload
      ↓
Text Extraction
      ↓
Document Chunking
      ↓
Embedding Generation
      ↓
ChromaDB Vector Storage
      ↓
Semantic Retrieval
      ↓
Relevant Context
      ↓
Google Gemini
      ↓
AI-Generated Response
      ↓
Interactive Frontend
```

This architecture allows the application to retrieve the most relevant information from a document before generating an answer, improving the relevance and contextual grounding of LLM responses.

---

## ✨ Key Features

### 📄 Document Processing
- Upload documents through the web interface
- Extract textual content from documents
- Process documents for downstream AI analysis
- Convert document content into searchable representations

### 🔎 Retrieval-Augmented Generation
- Generate vector embeddings from document content
- Store embeddings using **ChromaDB**
- Perform semantic similarity search
- Retrieve relevant document chunks for user queries
- Provide retrieved context to the LLM before generating responses

### 🤖 AI-Powered Analysis
- Generate intelligent document-based responses
- Ask questions about uploaded documents
- Generate document summaries
- Evaluate document content using an LLM

### 🎨 Interactive Frontend
- Modern React-based user interface
- TypeScript for type-safe development
- Interactive components
- Smooth UI animations using GSAP
- Responsive document-analysis workflow

---

## 🧠 RAG Architecture

The core of the application follows a Retrieval-Augmented Generation architecture.

### 1. Document Ingestion

The user uploads a document through the frontend.

```text
User → React Frontend → Flask Backend
```

### 2. Text Extraction

The backend extracts meaningful textual content from the uploaded document.

### 3. Chunking

The extracted content is divided into smaller chunks so that relevant portions can be retrieved efficiently.

### 4. Embedding Generation

Each document chunk is converted into a numerical vector representation.

```text
Text Chunk
    ↓
Embedding Model
    ↓
Vector Representation
```

### 5. Vector Storage

The generated embeddings are stored in **ChromaDB**, which acts as the vector database.

### 6. Semantic Retrieval

When the user asks a question, the query is converted into an embedding and compared with stored document vectors.

```text
User Query
    ↓
Query Embedding
    ↓
Similarity Search
    ↓
Top Relevant Chunks
```

### 7. Context-Aware Generation

The retrieved chunks are provided as context to Google Gemini.

```text
Retrieved Context + User Query
              ↓
        Google Gemini
              ↓
        Generated Answer
```

This reduces the need for the LLM to rely solely on its pretrained knowledge and allows responses to be grounded in the uploaded document.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │   + TypeScript       │
                    └──────────┬───────────┘
                               │
                         HTTP / API
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Flask Backend     │
                    │      Python          │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
       │   Document  │  │  ChromaDB   │  │   Gemini    │
       │ Processing  │  │ Vector DB   │  │     LLM     │
       └─────────────┘  └─────────────┘  └─────────────┘
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │ AI Generated Result  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Interface    │
                    └──────────────────────┘
```

---

## 🛠️ Technology Stack

### Backend

| Technology | Purpose |
|---|---|
| **Python** | Backend and AI processing |
| **Flask** | REST API and server-side application |
| **ChromaDB** | Vector database |
| **Google Gemini API** | Large Language Model |
| **Embeddings** | Semantic document representation |

### Frontend

| Technology | Purpose |
|---|---|
| **React.js** | User interface |
| **TypeScript** | Type-safe frontend development |
| **GSAP** | UI animations |
| **CSS** | Styling and layout |

### Development Tools

| Tool | Purpose |
|---|---|
| **Node.js / npm** | Frontend package management |
| **Git** | Version control |
| **GitHub** | Source-code hosting |

---

## 📂 Project Structure

```text
evaluateYourself/
│
├── backend/
│   ├── main.py
│   ├── test_gemini.py
│   ├── requirements.txt
│   ├── chroma_db/
│   └── venv/
│
├── my-app/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

> The repository currently uses `my-app` as the frontend directory.

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed:

- Python 3.x
- Node.js
- npm
- Git
- Google Gemini API key

---

## 1. Clone the Repository

```bash
git clone https://github.com/nikitha1604/evaluateYourself.git
cd evaluateYourself
```

---

# 🐍 Backend Setup

Navigate to the backend:

```bash
cd backend
```

### Create a Virtual Environment

```bash
python -m venv venv
```

### Activate the Environment

**Windows:**

```bash
venv\Scripts\activate
```

**Linux / macOS:**

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 🔐 Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

> Never commit your `.env` file or expose your API key publicly.

Add the following to `.gitignore` if it is not already present:

```gitignore
.env
venv/
__pycache__/
```

---

## ▶️ Start the Backend

From the `backend` directory:

```bash
python main.py
```

The Flask backend should be available at:

```text
http://localhost:5000
```

---

# ⚛️ Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd my-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

> If your `package.json` uses a different start script, use the command defined under `"scripts"`.

---

# 🔄 Application Workflow

```text
                ┌─────────────────┐
                │ Upload Document │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Extract Content │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Chunk Document  │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Create Embedding│
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │    ChromaDB     │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ User Question   │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Semantic Search │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Relevant Chunks │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ Google Gemini   │
                └────────┬────────┘
                         ↓
                ┌─────────────────┐
                │ AI Response     │
                └─────────────────┘
```

---

# 🎯 Use Cases

The architecture can be applied to several document-intelligence scenarios:

- 📚 Educational document analysis
- 📝 Self-assessment and evaluation
- 📄 Resume analysis
- 📖 Study material question answering
- 🔍 Document-based semantic search
- 📊 Automated document summarization
- 🤖 AI-powered knowledge assistants

---

# 💡 Why RAG?

Traditional LLM applications can generate responses based primarily on pretrained knowledge.

RAG introduces an additional retrieval step:

```text
Traditional LLM

Question → LLM → Answer
```

Whereas this project follows:

```text
RAG

Question
   ↓
Retrieve Relevant Information
   ↓
Relevant Context + Question
   ↓
LLM
   ↓
Context-Aware Answer
```

This approach is particularly useful when working with **private, domain-specific, or user-provided documents**.

---

# 🔌 Backend API

The backend exposes APIs that support document processing and AI-powered operations.

Typical application operations include:

| Operation | Purpose |
|---|---|
| Document Processing | Process and index uploaded documents |
| Question Answering | Answer questions using retrieved context |
| Summarization | Generate summaries from document content |
| Evaluation | Generate AI-based document feedback |

The API layer allows the React frontend to communicate with the Python backend through HTTP requests.

---

# 🔒 Security Considerations

For production deployment:

- Store API keys using environment variables.
- Never commit `.env` files.
- Validate uploaded files.
- Restrict allowed file types.
- Add authentication and authorization.
- Implement request-rate limiting.
- Sanitize user inputs.
- Configure CORS appropriately.
- Avoid storing sensitive documents unnecessarily.

---

# 🚀 Future Enhancements

Potential improvements include:

- [ ] User authentication and authorization
- [ ] Multi-document conversations
- [ ] Conversation history
- [ ] Advanced evaluation scoring
- [ ] Interactive analytics dashboard
- [ ] Document comparison
- [ ] Citation/source highlighting
- [ ] Support for additional document formats
- [ ] Improved embedding models
- [ ] Docker containerization
- [ ] Cloud deployment
- [ ] Production-grade database and caching
- [ ] Automated testing and CI/CD

---

# 📈 Learning Outcomes

This project provided practical experience with:

- Retrieval-Augmented Generation
- Large Language Models
- Vector databases
- Semantic search
- Embedding-based information retrieval
- REST API development
- React and TypeScript
- Full-stack application architecture
- AI application integration
- Git and GitHub

---

# 👩‍💻 Author

**Nikitha J**

Computer Science Engineering Student

GitHub: [@nikitha1604](https://github.com/nikitha1604)

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---



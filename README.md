# 🚀 Evaluate Yourself — AI Quiz Generator

**Evaluate Yourself** is a full-stack AI-powered learning application that generates quizzes and learning insights from uploaded study materials.

The application allows users to upload documents such as **PDF, DOCX, and image files**, process their content using a **Retrieval-Augmented Generation (RAG)** pipeline, and generate AI-powered quizzes, summaries, and document-based answers.

---

## 📌 Project Overview

Students often study from large amounts of notes, documents, and learning materials but may find it difficult to evaluate how well they actually understand the content.

**Evaluate Yourself** addresses this problem by transforming learning materials into an interactive self-assessment experience.

### The system can:

- 📄 Upload learning documents
- 🔍 Extract text from documents
- 🧠 Process and retrieve relevant information using RAG
- 🤖 Generate AI-powered quizzes
- 💬 Answer questions based on uploaded documents
- 📝 Generate document summaries
- 📊 Help users evaluate their understanding

---

## ✨ Key Features

### 📄 Document Processing

Supports multiple input formats:

- PDF
- DOCX
- Images
- Text-based documents

### 🧠 Retrieval-Augmented Generation

The application uses a RAG pipeline to:

1. Extract content from uploaded documents
2. Split and process the extracted content
3. Generate embeddings
4. Store embeddings in ChromaDB
5. Retrieve relevant information
6. Pass relevant context to Gemini
7. Generate grounded responses

### 📝 AI Quiz Generation

Generate quizzes automatically from uploaded learning materials.

The generated questions are based on the content of the uploaded document rather than relying only on general-purpose knowledge.

### 💬 Document Question Answering

Users can ask questions about their uploaded documents and receive AI-generated answers based on the retrieved context.

### 📋 Summarization

Generate concise summaries from lengthy learning materials to support faster revision.

### 🌐 Full-Stack Architecture

The project combines:

- React + TypeScript frontend
- Node.js + Express backend
- Python-based AI/RAG processing
- ChromaDB vector database
- Google Gemini API

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React + TypeScript  │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Document Parsing   │
                    │ PDF / DOCX / Image  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Python RAG Pipeline │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │      ChromaDB       │
                    │   Vector Database   │
                    └──────────┬──────────┘
                               │
                         Relevant Context
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Google Gemini    │
                    │      LLM / AI       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Quiz / Summary / QA │
                    └─────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- GSAP
- Lucide React
- CSS

## Backend

- Node.js
- Express.js
- Multer
- CORS

## AI / RAG

- Python
- Google Gemini API
- Retrieval-Augmented Generation (RAG)
- ChromaDB
- Document embeddings

## Document Processing

- PDF processing
- DOCX processing
- Image processing / OCR

---

# 📂 Project Structure

```text
evaluateYourself/
│
├── backend/
│   ├── main.py
│   ├── server.js
│   ├── package.json
│   ├── req.txt
│   └── parsers/
│       ├── docxp.js
│       ├── imagep.js
│       └── pdfp.js
│
├── public/
│   ├── professional-developer-portrait-male.png
│   └── professional-female-developer.png
│
├── src/
│   ├── api/
│   │   └── upload.ts
│   ├── components/
│   │   └── Quiz.tsx
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── QAPage.tsx
│   │   ├── SummaryPage.tsx
│   │   └── UploadPage.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 🔄 RAG Workflow

```text
Document Upload
       ↓
Document Parsing
       ↓
Text Extraction
       ↓
Text Processing / Chunking
       ↓
Embedding Generation
       ↓
ChromaDB Vector Storage
       ↓
User Query
       ↓
Semantic Retrieval
       ↓
Relevant Context
       ↓
Google Gemini
       ↓
AI Generated Response
       ↓
Quiz / Summary / Answer
```

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Python 3.10+
- Git
- Google Gemini API key

---

## 1. Clone the Repository

```bash
git clone https://github.com/nikitha1604/evaluateYourself.git
cd evaluateYourself
```

---

## 2. Frontend Setup

Install the frontend dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL in the terminal.

---

## 3. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a Python virtual environment.

### Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r req.txt
```

---

## 4. Configure Environment Variables

Create a `.env` file for your API credentials.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
```

⚠️ **Never commit your `.env` file or API keys to GitHub.**

---

## 5. Start the Backend

From the `backend` directory:

```bash
node server.js
```

The backend API will start on the configured local port.

---

# 🔌 Backend API

The application provides endpoints for different AI-powered operations.

| Endpoint | Purpose |
|----------|---------|
| `/process-document` | Process an uploaded document |
| `/generate-quiz` | Generate quiz questions |
| `/summarize` | Generate a document summary |
| `/ask-question` | Answer questions using document context |

---

# 🧠 Why RAG?

Traditional LLM applications may generate responses using only the model's general knowledge.

Evaluate Yourself uses **Retrieval-Augmented Generation (RAG)** to provide the model with relevant information retrieved from the user's uploaded documents.

This helps the application:

- Ground responses in the provided learning material
- Reduce irrelevant responses
- Support document-specific questions
- Generate quizzes from user-provided content
- Handle large documents through retrieval

---

# 🎯 Use Cases

Evaluate Yourself can be useful for:

- 🎓 Students preparing for examinations
- 📚 Self-learning and revision
- 📝 Quiz generation from lecture notes
- 📄 Understanding technical documents
- 🔍 Document-based question answering
- 🧠 Self-assessment and knowledge evaluation

---

# 🔐 Security

The following files and directories should remain local and should not be committed:

```text
.env
venv/
node_modules/
__pycache__/
chroma_db/
chat_logs/
```

These are excluded through `.gitignore`.

---

# 🚀 Future Improvements

- [ ] User authentication
- [ ] Persistent user profiles
- [ ] Quiz difficulty selection
- [ ] Adaptive question generation
- [ ] Detailed performance analytics
- [ ] Learning progress dashboard
- [ ] Improved document processing
- [ ] More document formats

---

# 👩‍💻 Author

**Nikitha J**

Computer Science and Engineering Student

---

# ⭐ Project Highlights

This project demonstrates practical experience with:

- Full-stack development
- Generative AI
- Retrieval-Augmented Generation
- Vector databases
- Document processing
- REST API development
- React and TypeScript
- Python AI pipelines

---

## 📄 License

This project is licensed under the MIT License.

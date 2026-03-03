# 🚀 Evaluate Yourself – RAG Based AI Resume Analyzer

## 📌 Project Overview

**Evaluate Yourself** is a full-stack AI-powered Resume Analysis System built using a **Retrieval-Augmented Generation (RAG)** architecture.

The system allows users to upload resumes and:

* Extracts resume content
* Stores embeddings in a vector database
* Retrieves relevant context
* Generates intelligent feedback using a Large Language Model

This project demonstrates real-world implementation of:

* RAG architecture
* Vector databases
* Backend API integration
* Full-stack development

---

## 🏗️ System Architecture

User Upload → Text Extraction → Embedding Generation → Vector Storage (ChromaDB) → Context Retrieval → LLM Response (Gemini) → Feedback Display

---

## 🛠️ Tech Stack

### 🔹 Backend

* Python
* Flask
* ChromaDB (Vector Database)
* Google Gemini API
* ONNX Runtime (for embeddings)

### 🔹 Frontend

* React.js
* TypeScript
* GSAP (animations)
* CSS

### 🔹 Other Tools

* Node.js
* Git & GitHub

---

## 🧠 Key Features

* Document Upload
* Automatic Text Extraction
* Vector Embedding Storage
* Semantic Search
* AI-based Evaluation
* Question Answering from Document
* Summary Generation

---

## 📂 Project Structure

```
evaluate/
│
├── backend/
│   ├── main.py
│   ├── test_gemini.py
│   ├── chroma_db/
│   └── venv/
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── package.json
│
└── README.md
```

---

## ⚙️ How to Run the Project

### 🔹 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python main.py
```

Backend runs on:

```
http://localhost:5000
```

---

### 🔹 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env` file in backend:

```
GEMINI_API_KEY=your_api_key_here
```

---

## 📊 RAG Workflow

1. Resume uploaded
2. Text extracted
3. Embeddings generated
4. Stored in ChromaDB
5. Query processed
6. Relevant chunks retrieved
7. Context sent to Gemini
8. AI generates structured evaluation

---

## 🎯 Why This Project?

This project demonstrates:

* Real-world AI system design
* Practical RAG implementation
* Vector database integration
* Full-stack architecture
* Problem-solving using LLMs

---

## 👩‍💻 Author

Nikitha
AI & Robotics Enthusiast
Robocon – AI & ROS Team Member

---

## 🌟 Future Improvements

* Deploy to cloud
* Add authentication
* Improve UI/UX
* Add scoring dashboard
* Switch to production embedding model
* Dockerization

---

⭐ If you like this project, give it a star!

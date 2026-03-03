import os
import sys
import json
import uuid
from datetime import datetime
from typing import List, Dict, Any
from sentence_transformers import SentenceTransformer

import chromadb
from chromadb.config import Settings
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()


class RAGProcessor:

    def __init__(self):

        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("Set GEMINI_API_KEY in .env")

        genai.configure(api_key=api_key)

        self.chunker_model = genai.GenerativeModel('gemini-2.0-flash')
        self.quiz_model    = genai.GenerativeModel('gemini-2.0-flash')
        self.summary_model = genai.GenerativeModel('gemini-2.0-flash')
        self.qa_model      = genai.GenerativeModel('gemini-2.0-pro')
        self.client = chromadb.PersistentClient(
            path="./chroma_db",
            settings=Settings(anonymized_telemetry=False)
        )
        self.embed_model = SentenceTransformer("all-MiniLM-L6-v2")

        try:
            self.collection = self.client.get_collection("documents")
        except:
            self.collection = self.client.create_collection(
                name="documents",
                metadata={"hnsw:space": "cosine"},
                embedding_function=None
            )

    # ---------- Chunk ----------

    def chunk_text(self, text: str) -> List[str]:

        if not text.strip():
            return []

        prompt = f"""
Split text into semantic chunks (~800-1200 chars).
Return ONLY JSON array.

TEXT:
{text}
"""

        try:
            r = self.chunker_model.generate_content(prompt)
            t = r.text.strip().replace("```json", "").replace("```", "")
            chunks = json.loads(t)
            return chunks
        except:
            size = 1000
            return [text[i:i + size] for i in range(0, len(text), size)]

    # ---------- Embeddings ----------

    def create_embeddings(self, texts):
        embeddings = self.embed_model.encode(texts)
        return embeddings.tolist()

    # ---------- Store ----------

    def store(self, chunks, embeddings, metadata):

        doc_id = str(uuid.uuid4())

        ids = [f"{doc_id}_{i}" for i in range(len(chunks))]

        metas = []
        for i in range(len(chunks)):
            m = dict(metadata)
            m.update({
                "doc_id": doc_id,
                "chunk_index": i
            })
            metas.append(m)

        self.collection.add(
            documents=chunks,
            embeddings=embeddings,
            metadatas=metas,
            ids=ids
        )

        return doc_id

    # ---------- Process ----------

    def process(self, text_path, filename, doc_type):

        with open(text_path, "r", encoding="utf-8") as f:
            text = f.read()

        chunks = self.chunk_text(text)

        if not chunks:
            return {"success": False, "error": "No chunks"}

        embeds = self.create_embeddings(chunks)

        meta = {
            "filename": filename,
            "doc_type": doc_type,
            "processed_at": datetime.now().isoformat()
        }

        doc_id = self.store(chunks, embeds, meta)

        return {
            "success": True,
            "doc_id": doc_id,
            "chunks": len(chunks)
        }

    # ---------- Quiz ----------

    def generate_quiz(self, doc_id, num_questions, level):

        results = self.collection.get(
            where={"doc_id": doc_id},
            include=["documents"]
        )

        docs = results.get("documents", [])

        context = " ".join(docs[:10])

        prompt = f"""
Generate {num_questions} {level} questions from text.

TEXT:
{context}

Return JSON:
{{
 "questions":[
   {{
     "question":"",
     "options":[],
     "answer":"",
     "explanation":""
   }}
 ]
}}
"""

        r = self.quiz_model.generate_content(prompt)

        raw = r.text

        start = raw.find("{")
        end = raw.rfind("}") + 1

        data = json.loads(raw[start:end])

        return {
            "success": True,
            "quiz": data
        }


# ---------- CLI ----------

def main():

    cmd = sys.argv[1]

    rag = RAGProcessor()

    if cmd == "process":

        text_path = sys.argv[2]
        filename = sys.argv[3]
        doc_type = sys.argv[4]

        print(json.dumps(
            rag.process(text_path, filename, doc_type)
        ))

    elif cmd == "generate_quiz":

        doc_id = sys.argv[2]
        num_q = int(sys.argv[3])
        level = sys.argv[4]

        print(json.dumps(
            rag.generate_quiz(doc_id, num_q, level)
        ))


if __name__ == "__main__":
    main()
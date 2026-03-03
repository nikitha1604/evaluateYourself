import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import dotenv from 'dotenv';
import { parsePdf } from './parsers/pdfp.js';
import { parseDocx } from './parsers/docxp.js';
import { parseImage } from './parsers/imagep.js';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPythonExecutable() {
  const venvDir = path.resolve(__dirname, './venv312');
  let pythonPath =
    process.platform === 'win32'
      ? path.join(venvDir, 'Scripts', 'python.exe')
      : path.join(venvDir, 'bin', 'python');

  if (!fs.existsSync(pythonPath)) {
    console.warn('⚠️ venv Python not found, using system python');
    pythonPath = 'python';
  }

  console.log("Using Python:", pythonPath);
  return pythonPath;
}

const PYTHON_EXEC = getPythonExecutable();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const getDocType = (mimetype) => {
  if (mimetype === 'application/pdf') return 'pdf';
  if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx';
  if (mimetype.startsWith('image/')) return 'photo';
  return null;
};

function writeTempText(text) {
  const p = path.join(
    os.tmpdir(),
    `rag_${Date.now()}_${Math.random().toString(36).slice(2)}.txt`
  );
  fs.writeFileSync(p, text, { encoding: 'utf-8' });
  return p;
}

function runPython(args) {
  console.log("Spawning Python:", PYTHON_EXEC, args);

  return new Promise((resolve, reject) => {
    const py = spawn(PYTHON_EXEC, ['main.py', ...args], {
      cwd: path.resolve(__dirname)
    });

    let out = '';
    let err = '';

    py.stdout.on('data', (d) => (out += d.toString()));
    py.stderr.on('data', (d) => (err += d.toString()));

    py.on('close', (code) => {
      console.log("Python exit code:", code);
      console.log("STDOUT:", out);
      console.log("STDERR:", err);

      if (code !== 0) {
        return reject(new Error(err || `Python exited ${code}`));
      }

      try {
        const parsed = JSON.parse(out.trim());
        if (parsed.success === false) {
          return reject(new Error(parsed.error || "Python error"));
        }
        resolve(parsed);
      } catch (e) {
        reject(new Error("Invalid JSON from Python: " + out));
      }
    });
  });
}

app.post('/api/generate-quiz', upload.single('file'), async (req, res) => {
  try {
    const { numQuestions, level } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const docType = getDocType(file.mimetype);
    if (!docType) return res.status(400).json({ error: "Unsupported file" });

    let text = '';
    if (docType === 'pdf') text = await parsePdf(file.buffer);
    else if (docType === 'docx') text = await parseDocx(file.buffer);
    else text = await parseImage(file.buffer);

    const textPath = writeTempText(text);

    const proc = await runPython([
      'process',
      textPath,
      file.originalname,
      docType
    ]);

    const quiz = await runPython([
      'generate_quiz',
      proc.doc_id,
      String(numQuestions || 5),
      level || 'medium'
    ]);

    fs.unlink(textPath, () => {});

    res.json({
      message: "Quiz generated successfully!",
      quiz: quiz.quiz
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
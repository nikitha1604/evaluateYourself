import { spawn } from 'child_process';

// Use backslashes or double-backslashes
const pythonPath = 'D:\\evaluate\\venv312\\Scripts\\python.exe';

const py = spawn(pythonPath, ['--version']);

py.stdout.on('data', (d) => console.log(d.toString()));
py.stderr.on('data', (d) => console.error(d.toString()));

py.on('error', (err) => console.error('Spawn error:', err));
py.on('close', (code) => console.log('Process exited with code', code));

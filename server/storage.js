import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');

function ensureDataFiles() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(usersFile)) {
    const seed = [
      { id: 'u1', email: 'user@example.com', password: 'user123', role: 'user' },
      { id: 'a1', email: 'admin@example.com', password: 'admin123', role: 'admin' }
    ];
    fs.writeFileSync(usersFile, JSON.stringify(seed, null, 2));
  }
}

export function loadUsers() {
  try {
    ensureDataFiles();
    const raw = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  ensureDataFiles();
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}



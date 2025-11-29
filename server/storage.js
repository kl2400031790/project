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
    
    // Check if file exists before reading
    if (!fs.existsSync(usersFile)) {
      console.warn(`Users file not found at ${usersFile}, returning empty array`);
      return [];
    }
    
    const raw = fs.readFileSync(usersFile, 'utf-8');
    
    // Handle empty file
    if (!raw || raw.trim() === '') {
      console.warn('Users file is empty, returning empty array');
      return [];
    }
    
    const parsed = JSON.parse(raw);
    
    // Ensure we return an array
    if (!Array.isArray(parsed)) {
      console.error('Users file does not contain an array, returning empty array');
      return [];
    }
    
    return parsed;
  } catch (error) {
    console.error('Error loading users:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      path: usersFile,
      fileExists: fs.existsSync(usersFile)
    });
    return [];
  }
}

export function saveUsers(users) {
  try {
    ensureDataFiles();
    
    // Validate users array
    if (!Array.isArray(users)) {
      throw new Error('Users must be an array');
    }
    
    // Try to write the file
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFile, data, { encoding: 'utf-8', flag: 'w' });
    
    // Verify the file was written
    if (!fs.existsSync(usersFile)) {
      throw new Error('File was not created after write operation');
    }
    
    console.log(`Successfully saved ${users.length} users to ${usersFile}`);
  } catch (error) {
    console.error('Error writing users file:', error);
    console.error('File path:', usersFile);
    console.error('Directory exists:', fs.existsSync(dataDir));
    try {
      fs.accessSync(dataDir, fs.constants.W_OK);
      console.error('Directory is writable: true');
    } catch (accessError) {
      console.error('Directory is writable: false', accessError.message);
    }
    throw error;
  }
}



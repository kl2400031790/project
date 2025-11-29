# How to Start Both Servers

## Option 1: Start Both Together (Recommended)
Open a terminal and run:
```powershell
cd C:\Users\bhaga\OneDrive\Desktop\project\project
npm run dev:full
```

This starts both:
- Backend server on port 5174
- Frontend (Vite) on port 5173

## Option 2: Start Separately (Two Terminals)

### Terminal 1 - Backend:
```powershell
cd C:\Users\bhaga\OneDrive\Desktop\project\project
npm run server
```

### Terminal 2 - Frontend:
```powershell
cd C:\Users\bhaga\OneDrive\Desktop\project\project
npm run dev
```

## Verify Both Are Running

1. **Backend**: Open http://localhost:5174/api/health
   - Should show: `{"ok":true,"message":"Backend is running"}`

2. **Frontend**: Open http://localhost:5173
   - Should show your React app

## Current Status
- ✅ Backend server: Running on port 5174
- ❌ Frontend server: NOT running (needs to be started)

## After Starting
Once both are running, you can:
- Access the app at: http://localhost:5173
- The frontend will automatically proxy API calls to the backend


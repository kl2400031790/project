# Troubleshooting 500 Server Error on Login

## Quick Fix Steps

### 1. Restart the Server
The server must be restarted after code changes:

**If using `npm run server`:**
- Stop the server (Ctrl+C in the terminal running the server)
- Start it again: `npm run server`

**If using `npm run dev:full`:**
- Stop it (Ctrl+C)
- Start again: `npm run dev:full`

### 2. Check Server Console
Look at the server terminal output. You should see:
- `🚀 Server running on http://localhost:5174`
- `📊 Health check: http://localhost:5174/api/health`
- When you try to login, you should see detailed logs like:
  - `Login request received`
  - `Attempting login for email: ...`
  - `Loaded X users for login attempt`

### 3. Test Health Endpoint
Open your browser and go to:
```
http://localhost:5174/api/health
```

You should see: `{"ok":true,"message":"Backend is running"}`

If this doesn't work, the server is not running properly.

### 4. Check for Port Conflicts
Make sure port 5174 is not being used by another application:
```powershell
netstat -ano | findstr :5174
```

If you see many TIME_WAIT connections, the server might be crashing. Restart it.

### 5. Verify Users File
Check that the users file exists and is valid:
- File location: `server/data/users.json`
- Should contain valid JSON array
- Example:
```json
[
  {
    "id": "u1",
    "email": "user@example.com",
    "password": "user123",
    "role": "user"
  }
]
```

### 6. Check Browser Console
Open browser DevTools (F12) and check:
- Network tab: Look at the login request
- Console tab: Check for any JavaScript errors
- The response should show the actual error message

### 7. Common Issues

**Issue: "Cannot connect to server"**
- Server is not running
- Solution: Start the server with `npm run server`

**Issue: "Failed to load user data"**
- File permission issue
- Solution: Check that `server/data/users.json` exists and is readable

**Issue: "Invalid email or password"**
- This is a 401 error, not 500
- Check your credentials
- Try: `user@example.com` / `user123`

**Issue: Server crashes on every request**
- Check server console for error messages
- Verify Node.js version (should be v16+)
- Try deleting `node_modules` and running `npm install` again

## Debug Mode

To see more detailed error messages, set:
```powershell
$env:NODE_ENV="development"
npm run server
```

This will show full error stacks in the response.

## Test Login Manually

You can test the login endpoint directly using curl or Postman:

```powershell
Invoke-RestMethod -Uri "http://localhost:5174/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"user@example.com","password":"user123"}'
```

If this works, the issue is in the frontend. If it doesn't, check the server logs.


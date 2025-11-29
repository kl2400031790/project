# How to Restart the Server

## If the server is not responding:

### Step 1: Kill all Node processes
Open PowerShell and run:
```powershell
Get-Process -Name node | Stop-Process -Force
```

### Step 2: Wait a few seconds
```powershell
Start-Sleep -Seconds 3
```

### Step 3: Start the server
```powershell
cd project
npm run server
```

OR if using dev:full:
```powershell
cd project
npm run dev:full
```

## Alternative: Kill specific port

If you want to kill only processes using port 5174:
```powershell
# Find process using port 5174
$process = Get-NetTCPConnection -LocalPort 5174 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

# Kill it
if ($process) {
    Stop-Process -Id $process -Force
    Write-Host "Killed process on port 5174"
}
```

## Verify server is running

After starting, you should see:
```
🚀 Server running on http://localhost:5174
📊 Health check: http://localhost:5174/api/health
```

Then test in browser:
- http://localhost:5174/api/health

You should see: `{"ok":true,"message":"Backend is running"}`


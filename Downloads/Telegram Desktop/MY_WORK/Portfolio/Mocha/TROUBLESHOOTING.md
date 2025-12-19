# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ "Cannot find module 'axios'"

**Problem:** Dependencies not installed

**Solution:**
```powershell
npm install
```

---

### ❌ "Cannot connect to MongoDB"

**Problem:** MongoDB is not running

**Solutions:**

**Option A - Start Local MongoDB:**
```powershell
mongod
```

**Option B - Use MongoDB Atlas (Free Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account and cluster
3. Get your connection string
4. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mocha-campus-db
   ```

---

### ❌ "Port 5173 is already in use"

**Problem:** Another app is using the port

**Solution:**
```powershell
# Find what's using the port
netstat -ano | findstr :5173

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

Or change the port in `vite.config.ts`:
```typescript
server: {
  port: 3000,  // Change to any available port
  open: true,
}
```

---

### ❌ "Port 5000 is already in use"

**Problem:** Another app is using the backend port

**Solution:**
```powershell
# Find what's using the port
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F
```

Or change the port in `backend/.env`:
```env
PORT=5001
```

And update frontend `.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

---

### ❌ Backend shows TypeScript errors

**Problem:** Backend dependencies not installed

**Solution:**
```powershell
cd backend
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

---

### ❌ Frontend shows blank page

**Problem:** Check browser console (F12)

**Common fixes:**

1. **Clear node_modules and reinstall:**
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm install
   npm run dev
   ```

2. **Check if backend is running:**
   - Backend must be running on port 5000
   - Test: http://localhost:5000/api/health

3. **Check browser console:**
   - Press F12
   - Look for error messages
   - Most common: "Network Error" = backend not running

---

### ❌ "Cannot find module 'bcryptjs'" (Backend)

**Problem:** Backend dependencies not installed

**Solution:**
```powershell
cd backend
npm install
```

---

### ❌ Login/Register not working

**Checklist:**
1. ✅ Backend running? Check http://localhost:5000/api/health
2. ✅ MongoDB running? Check backend terminal for connection message
3. ✅ Using CU email? Must be `@stu.cu.edu.ng`
4. ✅ Valid matric number? Format: `18CSC001`
5. ✅ Check browser console (F12) for errors

---

### ❌ Vite error: "Failed to resolve import"

**Problem:** Missing dependencies

**Solution:**
```powershell
npm install
npm run dev
```

---

## 🔄 Complete Reset (Nuclear Option)

If nothing works, try this complete reset:

```powershell
# Stop all running processes (Ctrl+C in all terminals)

# Frontend cleanup
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force dist
npm install

# Backend cleanup
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force dist
npm install
cd ..

# Start fresh
# Terminal 1
cd backend
npm run dev

# Terminal 2 (new terminal)
npm run dev
```

---

## 📞 Quick Diagnostic Commands

**Check Node.js:**
```powershell
node --version    # Should be v18 or higher
npm --version
```

**Check MongoDB:**
```powershell
mongod --version
```

**Check if ports are free:**
```powershell
netstat -ano | findstr :5173   # Frontend
netstat -ano | findstr :5000   # Backend
netstat -ano | findstr :27017  # MongoDB
```

**Test backend manually:**
```powershell
curl http://localhost:5000/api/health
```

**Check backend logs:**
Look in the terminal where `npm run dev` is running for error messages

---

## 🆘 Still Not Working?

1. Make sure you're in the correct directory
2. Check all terminals for error messages
3. Verify MongoDB is installed and running
4. Ensure Node.js version is 18+
5. Try the complete reset above

---

## ✅ When Everything Works

You should see:

**Backend Terminal:**
```
✅ MongoDB connected successfully
📦 Database: mocha-campus-db
🚀 Server running on port 5000
📊 Environment: development
```

**Frontend Terminal:**
```
VITE v6.3.5  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Browser:**
- Opens automatically to http://localhost:5173
- Shows the Mocha login/registration page

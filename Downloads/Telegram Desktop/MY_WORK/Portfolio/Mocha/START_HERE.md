# 🚀 QUICK START GUIDE

Follow these exact steps to run your app:

## Step 1: Install Dependencies

```powershell
npm install
```

Wait for it to complete, then:

```powershell
cd backend
npm install
cd ..
```

## Step 2: Setup Backend Environment

```powershell
cd backend
Copy-Item .env.example .env
cd ..
```

## Step 3: Start the App

Open **TWO** PowerShell terminals:

### Terminal 1 - Backend
```powershell
cd backend
npm run dev
```

Wait until you see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Terminal 2 - Frontend
```powershell
npm run dev
```

Your browser should open automatically to http://localhost:5173

## 🎯 If MongoDB Error Appears

You need MongoDB installed and running:

**Option 1 - Install MongoDB Locally:**
1. Download: https://www.mongodb.com/try/download/community
2. Install it
3. Run: `mongod`

**Option 2 - Use MongoDB Atlas (Cloud):**
1. Create free account: https://www.mongodb.com/cloud/atlas/register
2. Create cluster and get connection string
3. Update `backend/.env`:
   ```
   MONGODB_URI=your-atlas-connection-string
   ```

## ✅ Success!

If everything works, you'll see:
- Backend: "Server running on port 5000"
- Frontend: Opens in browser at http://localhost:5173

## 📝 First Time Setup (Optional)

To add sample rewards to the database:
```powershell
cd backend
npm run seed
```

---

**Still having issues?** Check `TROUBLESHOOTING.md` below.

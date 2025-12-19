# Setup and Run Script for Mocha Campus Transaction App

## ⚡ Quick Setup

Run this command to install all dependencies:

```powershell
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

## 🚀 Running the App

### Option 1: Run Backend Only (for testing)
```powershell
cd backend
npm run dev
```

### Option 2: Run Full Stack App

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

The app will open at http://localhost:5173

## 📝 Important Notes

1. **MongoDB** must be running first:
   - Install MongoDB if you haven't: https://www.mongodb.com/try/download/community
   - Start MongoDB: `mongod`

2. **Environment Files** are already configured:
   - Frontend: `.env` 
   - Backend: `backend/.env.example` (copy to `backend/.env`)

3. **Seed Database** (first time only):
   ```powershell
   cd backend
   npm run seed
   ```

## ⚠️ If App Won't Start

**Frontend issues:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

**Backend issues:**
```powershell
cd backend
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

## 🆘 Common Errors

**"Cannot find module 'axios'"**
→ Run `npm install` in the root directory

**"Cannot connect to MongoDB"**
→ Make sure MongoDB is running: `mongod`

**"Port 5173 already in use"**
→ Kill the process or change port in `vite.config.ts`

**"Port 5000 already in use"**
→ Kill the process or change port in `backend/.env`

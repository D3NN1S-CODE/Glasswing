# Command Reference - Mocha Campus Transaction App

## 🚀 Installation Commands

### Initial Setup
```powershell
# Frontend
npm install

# Backend
cd backend
npm install
```

## 🏃 Running the Application

### Start Backend Server
```powershell
cd backend

# Development mode (with auto-reload)
npm run dev

# Production mode
npm run build
npm start

# Seed rewards database (first time only)
npm run seed
```

### Start Frontend Server
```powershell
# From root directory
npm run dev

# Build for production
npm run build
```

## 🗄️ Database Commands

### MongoDB Local
```powershell
# Start MongoDB service
mongod

# Check MongoDB version
mongod --version

# MongoDB shell
mongosh
```

### MongoDB Commands (in mongosh)
```javascript
// Show databases
show dbs

// Use Mocha database
use mocha-campus-db

// Show collections
show collections

// View users
db.users.find().pretty()

// View transactions
db.transactions.find().pretty()

// View rewards
db.rewards.find().pretty()

// Count documents
db.users.countDocuments()
db.transactions.countDocuments()

// Delete all users (CAUTION!)
db.users.deleteMany({})

// Delete all transactions (CAUTION!)
db.transactions.deleteMany({})
```

## 🧪 Testing Commands

### API Testing with curl

#### Register User
```powershell
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{
    \"matricNumber\": \"18CSC001\",
    \"firstName\": \"John\",
    \"lastName\": \"Doe\",
    \"email\": \"john.doe@stu.cu.edu.ng\",
    \"password\": \"password123\"
  }'
```

#### Login
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    \"matricNumber\": \"18CSC001\",
    \"password\": \"password123\"
  }'
```

#### Get Balance (Protected)
```powershell
# Replace YOUR_TOKEN with actual token from login
curl http://localhost:5000/api/transactions/balance `
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔍 Debugging Commands

### Check Running Processes
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Check if port 5173 is in use
netstat -ano | findstr :5173

# Check Node.js processes
tasklist | findstr node
```

### Kill Processes
```powershell
# Kill process on port 5000
# First find PID from netstat, then:
taskkill /PID <process_id> /F
```

### View Logs
```powershell
# Backend logs (in backend terminal)
# Logs appear automatically with npm run dev

# Frontend logs
# Check browser console (F12)
```

## 📦 Package Management

### Update Dependencies
```powershell
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm update axios
```

### Add New Package
```powershell
# Frontend
npm install package-name

# Backend
cd backend
npm install package-name
```

## 🛠️ Development Tools

### TypeScript Compilation
```powershell
# Backend
cd backend
npm run build

# Check for type errors
npx tsc --noEmit
```

### Code Formatting (if you add prettier)
```powershell
# Format all files
npx prettier --write .

# Check formatting
npx prettier --check .
```

## 🗑️ Cleanup Commands

### Clear Node Modules
```powershell
# Frontend
Remove-Item -Recurse -Force node_modules
npm install

# Backend
cd backend
Remove-Item -Recurse -Force node_modules
npm install
```

### Clear Build Directories
```powershell
# Frontend
Remove-Item -Recurse -Force dist

# Backend
cd backend
Remove-Item -Recurse -Force dist
```

## 🔄 Git Commands

### Initial Commit
```powershell
git init
git add .
git commit -m "Initial commit: Mocha Campus Transaction App"
```

### Regular Workflow
```powershell
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to remote
git push origin main
```

## 🌐 Environment Management

### Create Environment Files
```powershell
# Frontend
Copy-Item .env.example .env

# Backend
cd backend
Copy-Item .env.example .env
```

### View Environment Variables
```powershell
# Windows PowerShell
Get-Content .env
Get-Content backend\.env
```

## 📊 Performance Monitoring

### Check Application Health
```powershell
# Backend health check
curl http://localhost:5000/api/health

# Frontend (visit in browser)
# http://localhost:5173
```

### Monitor Memory Usage
```powershell
# Windows Task Manager
taskmgr

# Or use PowerShell
Get-Process node | Select-Object Name, CPU, WorkingSet
```

## 🆘 Emergency Commands

### Reset Everything
```powershell
# Stop all servers (Ctrl+C in terminals)

# Clear all node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force backend\node_modules

# Reinstall
npm install
cd backend
npm install

# Clear database (in mongosh)
use mocha-campus-db
db.dropDatabase()

# Re-seed
npm run seed
```

## 📝 Quick Reference

### Backend Default Ports
- API Server: `5000`
- MongoDB: `27017`

### Frontend Default Port
- Vite Dev Server: `5173`

### Common Issues
```powershell
# Port already in use
netstat -ano | findstr :5000
taskkill /PID <pid> /F

# MongoDB not running
mongod

# Module not found
npm install

# TypeScript errors
npm run build
```

---

**Pro Tip**: Keep these commands handy for quick reference during development!

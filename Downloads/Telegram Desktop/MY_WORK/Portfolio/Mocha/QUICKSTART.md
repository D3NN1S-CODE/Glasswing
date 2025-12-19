# Quick Start Guide - Mocha Campus Transaction App

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Dependencies

```powershell
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Setup Environment Files

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mocha-campus-db
JWT_SECRET=mocha-secret-key-2024
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB

**Option A - Local MongoDB:**
```powershell
mongod
```

**Option B - MongoDB Atlas:**
Update `MONGODB_URI` in `backend/.env` with your Atlas connection string

### Step 4: Start the Application

**Terminal 1 - Backend:**
```powershell
cd backend
npm run seed    # Seed initial rewards (first time only)
npm run dev     # Start backend server
```

**Terminal 2 - Frontend:**
```powershell
npm run dev     # Start frontend
```

### Step 5: Access the App

Open browser: `http://localhost:5173`

## 🎯 Test the App

### Create Your First Account
1. Click "Sign Up"
2. Fill in details:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john.doe@stu.cu.edu.ng`
   - Matric Number: `18CSC001`
   - Password: `password123`
3. Click "Start Brewing"

### Try Features
1. **Top Up Wallet**: Add ₦5,000 to your account
2. **Create Second User**: Register another test user
3. **Send Money**: Transfer ₦1,000 to the second user
4. **QR Payment**: Pay a vendor using QR code
5. **Check Rewards**: View your loyalty points and available rewards

## 📋 Default Test Data

After running `npm run seed`, these rewards will be available:
- Free Coffee (50 points)
- 10% Off Cafeteria (100 points)
- Free Lunch (200 points)
- Bookstore Voucher (300 points)
- And more...

## ⚠️ Common Issues

### Backend won't start
```powershell
# Check if MongoDB is running
mongod --version

# Check if port 5000 is in use
netstat -ano | findstr :5000
```

### Frontend can't connect
- Verify backend is running on port 5000
- Check browser console for errors
- Ensure `.env` files are configured

## 🚀 What's Next?

1. Explore the Dashboard
2. Test all transaction types
3. Earn loyalty points
4. Redeem rewards
5. Check transaction history

## 📚 Full Documentation

See `README.md` for complete documentation including:
- Detailed API endpoints
- Security features
- Project structure
- Troubleshooting guide

---

Need help? Check the main README.md or backend/README.md for detailed documentation.

# Mocha - Student Campus Transaction App

A comprehensive digital wallet and payment system for Covenant University students, featuring wallet management, peer-to-peer transfers, QR code payments, and a loyalty rewards program.

## 🌟 Features

### Core Features
- **🔐 Secure Authentication**: JWT-based user registration and login with CU email validation
- **💰 Digital Wallet**: Top-up wallet, check balance, and manage funds securely
- **💸 Peer-to-Peer Transfers**: Send money to other students using matric numbers
- **📱 QR Code Payments**: Scan and pay vendors instantly with QR codes
- **🎁 Loyalty Rewards Program**: Earn points on every transaction and redeem for rewards
- **📊 Transaction History**: Complete audit trail of all financial activities
- **🏆 Tier System**: Progress through Bronze, Silver, Gold, and Premium levels

### Technical Features
- Real-time balance updates
- Transaction validation and error handling
- Secure password hashing with bcrypt
- Token-based session management
- MongoDB database with Mongoose ODM
- RESTful API architecture
- Responsive UI with Tailwind CSS
- Animated UI with Framer Motion

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Notifications**: Sonner (toast notifications)

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **QR Code**: qrcode library
- **Validation**: express-validator

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Installation & Setup

### 1. Clone the Repository
```powershell
git clone <repository-url>
cd "Student Campus Transaction App"
```

### 2. Backend Setup

#### Install Backend Dependencies
```powershell
cd backend
npm install
```

#### Configure Backend Environment
Create a `.env` file in the `backend` folder:
```powershell
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mocha-campus-db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

#### Start MongoDB
If using local MongoDB:
```powershell
# Make sure MongoDB is running
mongod
```

#### Seed Initial Rewards Data
```powershell
npm run seed
```

#### Start Backend Server
```powershell
# Development mode with auto-reload
npm run dev

# Or build and run production
npm run build
npm start
```

The backend will be running at `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

#### Install Frontend Dependencies
```powershell
cd ..  # Back to root directory
npm install
```

#### Configure Frontend Environment
Create a `.env` file in the root folder:
```powershell
cp .env.example .env
```

The default configuration should work:
```env
VITE_API_URL=http://localhost:5000/api
```

#### Start Frontend Development Server
```powershell
npm run dev
```

The frontend will be running at `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 👤 User Registration

To create an account:
1. Click "Sign Up" on the login page
2. Fill in the registration form:
   - **First Name** & **Last Name**
   - **University Email**: Must be a CU student email (`@stu.cu.edu.ng`)
   - **Matric Number**: Format like `18CSC001`
   - **Password**: Minimum 6 characters

## 🎯 Usage Guide

### Authentication
- **Sign Up**: Create a new student account
- **Sign In**: Login with matric number and password
- **Logout**: Securely end your session

### Wallet Operations
- **Top Up**: Add funds using card, bank transfer, or USSD
- **Check Balance**: View current wallet balance and loyalty points
- **Transaction History**: View all past transactions

### Transfers
- **Send Money**: Transfer funds to other students by matric number
- **Add Note**: Include optional message with transfers
- **Quick Amounts**: Use preset amounts for faster transfers

### QR Payments
- **Scan QR**: Use camera to scan vendor QR codes
- **Quick Pay**: Pay popular campus vendors instantly
- **Earn Points**: Get 1 loyalty point per ₦100 spent

### Loyalty Rewards
- **Earn Points**: 1 point for every ₦100 in transactions
- **Level Up**: Progress through loyalty tiers
  - Bronze Brew: 0-199 points
  - Silver Sip: 200-499 points
  - Gold Blend: 500-999 points
  - Premium Espresso: 1000+ points
- **Redeem Rewards**: Exchange points for discounts, free items, and special perks

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user (protected)
```

### Transactions
```
GET    /api/transactions                - Get transaction history
GET    /api/transactions/balance        - Get wallet balance
POST   /api/transactions/topup          - Top up wallet
POST   /api/transactions/send           - Send money to another student
```

### Payments
```
GET    /api/payments/qr/generate        - Generate payment QR code
POST   /api/payments/qr/scan            - Process QR payment
GET    /api/payments/vendors            - Get popular vendors
```

### Loyalty & Rewards
```
GET    /api/loyalty/rewards             - Get available rewards
POST   /api/loyalty/rewards/:id/redeem  - Redeem a reward
GET    /api/loyalty/my-rewards          - Get redeemed rewards
GET    /api/loyalty/status              - Get loyalty status
```

### Users
```
GET    /api/users/search?q=matric       - Search users
GET    /api/users/:matricNumber         - Get user profile
```

## 🗂️ Project Structure

```
Student Campus Transaction App/
├── backend/                    # Backend server
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Express middleware
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── scripts/           # Utility scripts
│   │   └── server.ts          # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── src/                       # Frontend source
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── AuthPage.tsx     # Authentication page
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── SendMoney.tsx    # Money transfer
│   │   ├── TopUp.tsx        # Wallet top-up
│   │   ├── ScanQR.tsx       # QR payment
│   │   └── ...
│   ├── services/            # API services
│   │   └── api.service.ts   # API client
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── package.json
├── vite.config.ts
└── README.md
```

## 🔒 Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT tokens for stateless authentication
- Protected API routes with middleware
- Email validation (CU students only)
- Matric number format validation
- Transaction validation and error handling
- MongoDB injection prevention with Mongoose
- CORS configuration for secure cross-origin requests

## 🧪 Testing

### Test User Credentials
After seeding, you can create test accounts or use the registration flow.

### API Testing
Use tools like Postman or Thunder Client:
1. Register/Login to get JWT token
2. Add token to Authorization header: `Bearer <token>`
3. Test protected endpoints

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check `.env` configuration
- Verify port 5000 is available

### Frontend can't connect to backend
- Confirm backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Verify CORS settings in backend

### Database connection failed
- Check MongoDB connection string
- Ensure MongoDB service is running
- Verify network connectivity (if using Atlas)

## 📝 Development Scripts

### Frontend
```powershell
npm run dev      # Start development server
npm run build    # Build for production
```

### Backend
```powershell
npm run dev      # Start with nodemon (auto-reload)
npm run build    # Compile TypeScript
npm start        # Run compiled version
npm run seed     # Seed rewards database
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

CSC335 Project - Covenant University

## 🙏 Acknowledgments

- Covenant University
- Radix UI for component primitives
- Framer Motion for animations
- The open-source community

---

**For Covenant University Students Only** 🎓

Made with ☕ by the Mocha Team
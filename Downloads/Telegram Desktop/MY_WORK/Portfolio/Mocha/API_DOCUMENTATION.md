# API Documentation - Mocha Campus Transaction App

Base URL: `http://localhost:5000/api`

## 🔐 Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Register User
**POST** `/auth/register`

Register a new student account.

**Request Body:**
```json
{
  "matricNumber": "18CSC001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@stu.cu.edu.ng",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "matricNumber": "18CSC001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@stu.cu.edu.ng",
      "balance": 0,
      "loyaltyPoints": 0,
      "level": "Bronze Brew",
      "createdAt": "2024-11-27T10:30:00.000Z"
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User with this matric number or email already exists"
}
```

---

### Login User
**POST** `/auth/login`

Authenticate and get access token.

**Request Body:**
```json
{
  "matricNumber": "18CSC001",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "matricNumber": "18CSC001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@stu.cu.edu.ng",
      "balance": 5000,
      "loyaltyPoints": 120,
      "level": "Silver Sip",
      "createdAt": "2024-11-27T10:30:00.000Z"
    }
  }
}
```

---

### Get Current User
**GET** `/auth/me` 🔒

Get authenticated user's profile.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "matricNumber": "18CSC001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@stu.cu.edu.ng",
      "balance": 5000,
      "loyaltyPoints": 120,
      "level": "Silver Sip",
      "createdAt": "2024-11-27T10:30:00.000Z"
    }
  }
}
```

---

## 💰 Transactions

### Get Balance
**GET** `/transactions/balance` 🔒

Get current wallet balance and loyalty points.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "balance": 5000,
    "loyaltyPoints": 120,
    "level": "Silver Sip"
  }
}
```

---

### Get Transaction History
**GET** `/transactions` 🔒

Get user's transaction history.

**Query Parameters:**
- `limit` (optional): Number of transactions (default: 50)
- `page` (optional): Page number (default: 1)
- `type` (optional): Filter by type (payment, transfer, received, topup, reward)

**Example:** `/transactions?limit=20&page=1&type=transfer`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "type": "transfer",
        "amount": 1000,
        "description": "Transfer to 19CSC045",
        "recipient": {
          "matricNumber": "19CSC045",
          "firstName": "Jane",
          "lastName": "Smith"
        },
        "status": "completed",
        "pointsEarned": 10,
        "balanceBefore": 6000,
        "balanceAfter": 5000,
        "createdAt": "2024-11-27T11:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 15,
      "pages": 1
    }
  }
}
```

---

### Top Up Wallet
**POST** `/transactions/topup` 🔒

Add funds to wallet.

**Request Body:**
```json
{
  "amount": 5000,
  "paymentMethod": "card"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Top-up successful",
  "data": {
    "transaction": {
      "_id": "507f1f77bcf86cd799439011",
      "type": "topup",
      "amount": 5000,
      "description": "Wallet top-up via card",
      "status": "completed",
      "pointsEarned": 0,
      "balanceBefore": 0,
      "balanceAfter": 5000,
      "createdAt": "2024-11-27T11:00:00.000Z"
    },
    "newBalance": 5000
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Minimum top-up amount is ₦500"
}
```

---

### Send Money
**POST** `/transactions/send` 🔒

Transfer money to another student.

**Request Body:**
```json
{
  "recipientMatricNumber": "19CSC045",
  "amount": 1000,
  "note": "Lunch money"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Transfer successful",
  "data": {
    "transaction": {
      "_id": "507f1f77bcf86cd799439011",
      "type": "transfer",
      "amount": 1000,
      "description": "Lunch money",
      "recipientMatricNumber": "19CSC045",
      "status": "completed",
      "pointsEarned": 10,
      "balanceBefore": 6000,
      "balanceAfter": 5000,
      "createdAt": "2024-11-27T11:00:00.000Z"
    },
    "newBalance": 5000,
    "pointsEarned": 10,
    "totalPoints": 130
  }
}
```

**Error Responses:**
- 400: Insufficient balance
- 404: Recipient not found
- 400: Cannot send money to yourself

---

## 📱 Payments

### Generate QR Code
**GET** `/payments/qr/generate` 🔒

Generate a payment QR code for the authenticated user.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    "paymentData": {
      "userId": "507f1f77bcf86cd799439011",
      "matricNumber": "18CSC001",
      "name": "John Doe",
      "timestamp": 1701089400000
    }
  }
}
```

---

### Process QR Payment
**POST** `/payments/qr/scan` 🔒

Process a QR code payment.

**Request Body:**
```json
{
  "amount": 1200,
  "vendorName": "CU Cafeteria",
  "qrData": {}
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Payment successful",
  "data": {
    "transaction": {
      "_id": "507f1f77bcf86cd799439011",
      "type": "payment",
      "amount": 1200,
      "description": "Payment to CU Cafeteria",
      "vendorName": "CU Cafeteria",
      "status": "completed",
      "pointsEarned": 12,
      "balanceBefore": 6200,
      "balanceAfter": 5000,
      "createdAt": "2024-11-27T11:30:00.000Z"
    },
    "newBalance": 5000,
    "pointsEarned": 12,
    "totalPoints": 142
  }
}
```

---

### Get Popular Vendors
**GET** `/payments/vendors` 🔒

Get user's most frequently used vendors.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "vendors": [
      {
        "_id": "CU Cafeteria",
        "count": 15,
        "totalSpent": 18000
      },
      {
        "_id": "Campus Bookstore",
        "count": 8,
        "totalSpent": 12000
      }
    ]
  }
}
```

---

## 🎁 Loyalty & Rewards

### Get Available Rewards
**GET** `/loyalty/rewards` 🔒

Get all available rewards with unlock status.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "rewards": [
      {
        "id": "507f1f77bcf86cd799439011",
        "title": "Free Coffee",
        "description": "Get a free cup of coffee at campus café",
        "pointsRequired": 50,
        "icon": "☕",
        "category": "freebie",
        "unlocked": true
      },
      {
        "id": "507f1f77bcf86cd799439012",
        "title": "Free Lunch",
        "description": "Redeem for a free lunch at the campus cafeteria",
        "pointsRequired": 200,
        "icon": "🍱",
        "category": "food",
        "unlocked": false
      }
    ],
    "userPoints": 120,
    "userLevel": "Silver Sip"
  }
}
```

---

### Redeem Reward
**POST** `/loyalty/rewards/:rewardId/redeem` 🔒

Redeem a loyalty reward.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Reward redeemed successfully",
  "data": {
    "userReward": {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439011",
      "rewardId": "507f1f77bcf86cd799439012",
      "pointsSpent": 50,
      "redeemedAt": "2024-11-27T12:00:00.000Z",
      "used": false
    },
    "remainingPoints": 70,
    "newLevel": "Silver Sip"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Insufficient loyalty points"
}
```

---

### Get My Rewards
**GET** `/loyalty/my-rewards` 🔒

Get user's redeemed rewards.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "rewards": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "rewardId": {
          "title": "Free Coffee",
          "description": "Get a free cup of coffee at campus café",
          "pointsRequired": 50,
          "icon": "☕"
        },
        "pointsSpent": 50,
        "redeemedAt": "2024-11-27T12:00:00.000Z",
        "used": false
      }
    ]
  }
}
```

---

### Get Loyalty Status
**GET** `/loyalty/status` 🔒

Get user's loyalty tier and progress.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "currentPoints": 142,
    "currentLevel": "Silver Sip",
    "nextLevel": "Gold Blend",
    "pointsToNextLevel": 358,
    "stats": {
      "totalPointsEarned": 192,
      "totalTransactions": 18
    }
  }
}
```

---

## 👥 Users

### Search Users
**GET** `/users/search?q=<matric>` 🔒

Search users by matric number.

**Query Parameters:**
- `q`: Search query (required)

**Example:** `/users/search?q=19CSC`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "matricNumber": "19CSC045",
        "firstName": "Jane",
        "lastName": "Smith"
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "matricNumber": "19CSC032",
        "firstName": "Mike",
        "lastName": "Johnson"
      }
    ]
  }
}
```

---

### Get User Profile
**GET** `/users/:matricNumber` 🔒

Get user profile by matric number.

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "matricNumber": "19CSC045",
      "firstName": "Jane",
      "lastName": "Smith",
      "level": "Gold Blend"
    }
  }
}
```

---

## 📋 Response Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request (validation error)
- **401** - Unauthorized (invalid/missing token)
- **404** - Not Found
- **500** - Server Error

## 🔒 Security Notes

1. **Always** include the JWT token in protected requests
2. Tokens expire after 7 days (configurable)
3. Passwords are hashed with bcrypt (10 rounds)
4. Email must be valid CU student email (@stu.cu.edu.ng)
5. Matric number format: `##ABC###` (e.g., 18CSC001)

## 💡 Tips

- Store JWT token securely (localStorage/sessionStorage)
- Handle 401 responses by redirecting to login
- Validate input on frontend before API calls
- Use appropriate HTTP methods (GET, POST, etc.)
- Check `success` field in all responses

---

🔒 = Protected endpoint (requires authentication)

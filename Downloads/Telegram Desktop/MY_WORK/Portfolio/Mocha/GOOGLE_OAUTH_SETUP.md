# Google OAuth Setup Guide

## Overview
Students can now sign in to Mocha using their Covenant University Google accounts (@stu.cu.edu.ng). This guide will help you set up Google OAuth for the application.

## ✨ Features
- ✅ One-click sign-in with CU Google accounts
- ✅ Automatic account creation for new users
- ✅ Email domain validation (only @stu.cu.edu.ng allowed)
- ✅ Auto-extraction of matric number from email
- ✅ No password required - secure OAuth flow

## 📋 Prerequisites
You need a Google Cloud Console account to create OAuth credentials.

## 🚀 Setup Steps

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name: `Mocha Campus Transaction`
4. Click "Create"

### Step 2: Enable Google+ API

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** user type
3. Click "Create"
4. Fill in the required information:
   - **App name**: Mocha Campus Transaction
   - **User support email**: Your CU email
   - **Developer contact**: Your email
5. Click "Save and Continue"
6. **Scopes**: Click "Add or Remove Scopes"
   - Select: `userinfo.email`, `userinfo.profile`, `openid`
7. Click "Save and Continue"
8. **Test users** (Optional for development):
   - Add your CU email addresses for testing
9. Click "Save and Continue"

### Step 4: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `Mocha Web Client`
5. **Authorized JavaScript origins**:
   ```
   http://localhost:5174
   http://localhost:5173
   ```
6. **Authorized redirect URIs**:
   ```
   http://localhost:5174
   http://localhost:5173
   ```
7. Click "Create"
8. **Copy your Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)

### Step 5: Update Environment Variables

#### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
```

#### Backend (backend/.env)
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mocha-campus-db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
```

### Step 6: Restart Both Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

## 🎯 How It Works

### For Students:
1. Click the **"Sign in with Google"** button
2. Choose their CU Google account (@stu.cu.edu.ng)
3. Automatically logged in or account created

### Email Format Expected:
```
firstname.lastname.matricnumber@stu.cu.edu.ng
Example: john.doe.23csc001@stu.cu.edu.ng
```

The system extracts:
- **First name**: john
- **Last name**: doe
- **Matric number**: 23CSC001

### Backend Validation:
- ✅ Verifies Google token is authentic
- ✅ Checks email ends with `@stu.cu.edu.ng`
- ✅ Extracts matric number from email
- ✅ Creates account if new user
- ✅ Issues JWT token for session

## 🔧 API Endpoint

**POST** `/api/auth/google`

**Request Body:**
```json
{
  "credential": "google-oauth-token-from-frontend"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "matricNumber": "23CSC001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe.23csc001@stu.cu.edu.ng",
      "balance": 0,
      "loyaltyPoints": 0,
      "level": "Bronze Brew",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## 🛡️ Security Features

1. **Email Domain Validation**: Only @stu.cu.edu.ng emails allowed
2. **Token Verification**: Google tokens verified server-side
3. **Matric Validation**: Matric number format checked
4. **JWT Authentication**: Secure session management
5. **No Password Storage**: OAuth users don't need passwords

## 📝 Traditional Sign-In Still Available

Students can still register/login with:
- Matric number
- Password
- CU email

## 🐛 Troubleshooting

### "Only CU emails allowed"
- Make sure you're using an @stu.cu.edu.ng email

### "Invalid Client ID"
- Check VITE_GOOGLE_CLIENT_ID in frontend .env
- Check GOOGLE_CLIENT_ID in backend .env
- Ensure both match your Google Cloud Console credentials

### "Redirect URI mismatch"
- Add your localhost URLs to authorized origins/redirects in Google Cloud Console

### Google button not showing
- Check browser console for errors
- Verify @react-oauth/google is installed: `npm list @react-oauth/google`
- Ensure VITE_GOOGLE_CLIENT_ID is set in .env

## 🎓 For Production Deployment

When deploying to production:

1. Update OAuth consent screen to "In Production"
2. Add production domain to authorized origins:
   ```
   https://yourdomain.com
   ```
3. Update environment variables with production URLs
4. Consider adding additional security measures

## 📞 Support

For issues with Google OAuth setup, check:
- Google Cloud Console logs
- Browser console for frontend errors
- Backend terminal for server errors

---

**Happy Brewing! ☕**

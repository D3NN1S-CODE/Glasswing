# 🎉 Google Sign-In Now Available!

## What's New?

Students can now sign in to Mocha using their **Covenant University Google accounts** (@stu.cu.edu.ng)! 

## ✨ Quick Start

### Option 1: Sign in with Google (Recommended)
1. Click the **"Sign in with Google"** button on the login page
2. Select your CU Google account
3. You're in! 🎊

### Option 2: Traditional Sign-in/Sign-up
Still works as before with matric number and password.

## ⚠️ IMPORTANT: Setup Required

To enable Google Sign-in, you need to get a Google OAuth Client ID:

### Quick Setup (5 minutes):

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** called "Mocha Campus Transaction"
3. **Enable Google+ API** in APIs & Services → Library
4. **Create OAuth credentials**:
   - Go to APIs & Services → Credentials
   - Create OAuth Client ID (Web application)
   - Add authorized origins:
     - `http://localhost:5174`
     - `http://localhost:5173`
5. **Copy your Client ID**
6. **Update your .env files**:

#### Frontend (.env):
```
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
```

#### Backend (backend/.env):
```
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE.apps.googleusercontent.com
```

7. **Restart both servers**

📖 **Full instructions**: See `GOOGLE_OAUTH_SETUP.md`

## 🔒 Security

- Only @stu.cu.edu.ng emails are allowed
- Automatic matric number extraction from email
- Google tokens verified server-side
- Secure JWT session management

## 📧 Email Format

Your CU email should be formatted like:
```
firstname.lastname.matricnumber@stu.cu.edu.ng
```
Example: `john.doe.23csc001@stu.cu.edu.ng`

The system automatically extracts your matric number (23CSC001) from the email!

## 🐛 Troubleshooting

**Google button not showing?**
- Make sure you've set `VITE_GOOGLE_CLIENT_ID` in your `.env` file
- Restart the frontend server

**"Only CU emails allowed" error?**
- Use your @stu.cu.edu.ng email, not personal Gmail

**Need help?**
- Check `GOOGLE_OAUTH_SETUP.md` for detailed instructions
- Check browser console for errors

---

**Happy Brewing! ☕**

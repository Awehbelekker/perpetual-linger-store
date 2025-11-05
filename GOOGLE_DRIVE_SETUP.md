# 🔐 Google Drive OAuth 2.0 Setup Guide

## Overview

This guide will help you set up Google Drive integration for your Perpetual Linger website. The new simplified authentication flow requires **one-time setup** of OAuth credentials, after which admin users can connect with just **one click**.

---

## ✨ What You'll Get

Once configured, your admin panel will have:

- ✅ **One-Click Connection** - No manual API key entry required
- ✅ **Automatic Backups** - All content and images saved to Google Drive
- ✅ **Cross-Device Sync** - Access your content from any device
- ✅ **Image Library** - Upload and manage product images effortlessly
- ✅ **Auto-Save** - Content saves automatically to Google Drive

---

## 📋 Setup Steps

### Step 1: Go to Google Cloud Console

1. Open your browser and go to: **https://console.cloud.google.com**
2. Sign in with your Google account (use the same account you'll use for storing website content)

### Step 2: Create a New Project

1. Click the **project dropdown** at the top of the page (next to "Google Cloud")
2. Click **"NEW PROJECT"**
3. Enter project name: `Perpetual Linger Store` (or any name you prefer)
4. Click **"CREATE"**
5. Wait for the project to be created (takes a few seconds)
6. Make sure the new project is selected in the dropdown

### Step 3: Enable Google Drive API

1. In the left sidebar, click **"APIs & Services"** → **"Library"**
2. In the search bar, type: `Google Drive API`
3. Click on **"Google Drive API"** from the results
4. Click the blue **"ENABLE"** button
5. Wait for it to enable (takes a few seconds)

### Step 4: Create OAuth 2.0 Credentials

1. In the left sidebar, click **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"** from the dropdown

### Step 5: Configure OAuth Consent Screen (if prompted)

If this is your first time creating OAuth credentials, you'll need to configure the consent screen:

1. Click **"CONFIGURE CONSENT SCREEN"**
2. Select **"External"** user type
3. Click **"CREATE"**
4. Fill in the required fields:
   - **App name:** `Perpetual Linger Admin`
   - **User support email:** Your email address
   - **Developer contact information:** Your email address
5. Click **"SAVE AND CONTINUE"**
6. On the "Scopes" page, click **"SAVE AND CONTINUE"** (no changes needed)
7. On the "Test users" page, click **"SAVE AND CONTINUE"** (no changes needed)
8. Click **"BACK TO DASHBOARD"**
9. Go back to **"Credentials"** in the left sidebar
10. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"** again

### Step 6: Configure OAuth Client ID

1. **Application type:** Select **"Web application"**
2. **Name:** Enter `Perpetual Linger Web Client` (or any name you prefer)
3. **Authorized JavaScript origins:** Click **"+ ADD URI"** and add:
   - `http://localhost:5173` (for local development)
   - `https://perpetuallinger.co.za` (for production)
4. **Authorized redirect URIs:** Leave empty (not needed for client-side OAuth)
5. Click **"CREATE"**

### Step 7: Copy Your Client ID

1. A popup will appear with your credentials
2. **Copy the Client ID** (it looks like: `123456789-abc123xyz.apps.googleusercontent.com`)
3. Click **"OK"** to close the popup

### Step 8: Update Your Code

1. Open the file: `src/App.jsx`
2. Find line **660** (near the top of the file)
3. Look for this line:
   ```javascript
   const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_OAUTH_CLIENT_ID_HERE.apps.googleusercontent.com';
   ```
4. Replace `YOUR_GOOGLE_OAUTH_CLIENT_ID_HERE.apps.googleusercontent.com` with your actual Client ID
5. Save the file

**Example:**
```javascript
const GOOGLE_CLIENT_ID = '123456789-abc123xyz.apps.googleusercontent.com';
```

### Step 9: Build and Deploy

1. Open your terminal in the project directory
2. Run the build command:
   ```bash
   npm run build
   ```
3. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add Google OAuth Client ID"
   git push origin master
   ```
4. Vercel will automatically deploy your changes (takes ~30 seconds)

### Step 10: Test the Connection

1. Go to your website: **https://perpetuallinger.co.za**
2. Open the **Admin Panel** (click the 🔒 lock icon or use mobile menu)
3. Enter admin password: `perpetual2024`
4. Click the **"Google Drive Settings"** tab
5. Click the big **"🔗 Connect Google Drive"** button
6. Sign in with your Google account
7. Click **"Allow"** to grant permissions
8. You should see: **"✅ Successfully connected to Google Drive!"**

---

## 🎉 You're Done!

Your Google Drive integration is now active! Here's what you can do:

### Upload Images
1. Go to **"Product Management"** or **"Page Builder"** tab
2. Click on any image upload area
3. Drag & drop images or click to select
4. Images are automatically uploaded to Google Drive

### View Image Library
1. Go to **"Image Library"** tab
2. See all your uploaded images
3. Copy URLs or delete unused images

### Auto-Save Content
- All content changes are automatically saved to Google Drive
- You can access your content from any device
- Your content is backed up in your Google Drive

---

## 🔧 Troubleshooting

### "Authentication failed" error

**Solution:** Make sure you added the correct authorized JavaScript origins in Step 6:
- `http://localhost:5173` (for development)
- `https://perpetuallinger.co.za` (for production)

### "Google Drive not connected" message

**Solution:** Click the "Connect Google Drive" button again and grant permissions.

### Images not uploading

**Solution:** 
1. Make sure you're connected to Google Drive (check the "Google Drive Settings" tab)
2. Try disconnecting and reconnecting
3. Check your internet connection

### Token expired

**Solution:** The access token expires after 1 hour. Simply click "Connect Google Drive" again to refresh it.

---

## 🔒 Security Notes

### Is it safe to include the Client ID in the code?

**Yes!** The OAuth Client ID is **not a secret**. It's designed to be included in client-side code. It only identifies your application to Google - it doesn't grant any access on its own.

### What about the access token?

The access token is **never stored in the code**. It's:
- Generated when the user clicks "Connect Google Drive"
- Stored only in the browser's localStorage
- Expires after 1 hour
- Only accessible to authenticated admin users

### Who can access the Google Drive?

Only users who:
1. Know the admin password (`perpetual2024`)
2. Click "Connect Google Drive"
3. Sign in with their Google account
4. Grant permissions

---

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console for error messages (F12 → Console tab)
2. Make sure you completed all setup steps
3. Try disconnecting and reconnecting to Google Drive
4. Verify your Client ID is correct in `src/App.jsx`

---

## 🚀 Next Steps

Now that Google Drive is connected, you can:

- Upload product images in the **Product Management** tab
- Create promotional content in the **Page Builder** tab
- Edit website text in the **Content Management** tab
- Customize visual effects in the **Theme Settings** tab

All your changes will be automatically saved to Google Drive! 🎊


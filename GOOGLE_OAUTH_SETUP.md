# Google OAuth 2.0 Setup Guide

## ✅ Status

✅ **Client ID has been updated in the code**
✅ **API Key has been added to the code**
✅ **JavaScript origins configured in Google Cloud Console**
⚠️ **MISSING: Redirect URIs in Google Cloud Console** ← THIS IS THE PROBLEM!

Your Google OAuth credentials are configured in `src/App.jsx`.

## 🔴 **CRITICAL: You're Missing Redirect URIs!**

Your current Google Cloud Console configuration shows:
- ✅ JavaScript origins: CONFIGURED
- ❌ Redirect URIs: **NOT CONFIGURED** (this causes the 400 error!)

The JSON file you downloaded only has `javascript_origins` but is missing `redirect_uris`.

## 🔧 Required Configuration in Google Cloud Console

To fix the OAuth error, you need to configure the **Authorized redirect URIs** and **Authorized JavaScript origins** in your Google Cloud Console.

### Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. Select your project: **rosy-dynamics-477308-t2**

### Step 2: Navigate to Credentials

1. Click on the menu (☰) in the top-left
2. Go to **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID in the list
4. Click the **Edit** button (pencil icon)

### Step 3: Add Authorized JavaScript Origins

Add these URLs to the **Authorized JavaScript origins** section:

```
http://localhost:5173
https://perpetual-linger-store.vercel.app
https://perpetuallinger.co.za
```

### Step 4: Add Authorized Redirect URIs

Add these URLs to the **Authorized redirect URIs** section:

```
http://localhost:5173
https://perpetual-linger-store.vercel.app
https://perpetuallinger.co.za
```

### Step 5: Enable Google Drive API

1. Go to **APIs & Services** → **Library**
2. Search for "Google Drive API"
3. Click on it and click **Enable**

### Step 6: Save Changes

1. Click **Save** at the bottom of the page
2. Wait a few minutes for changes to propagate (usually instant, but can take up to 5 minutes)

## 🧪 Testing

After configuring:

1. Go to your site: https://perpetual-linger-store.vercel.app
2. Log in to admin panel (password: `perpetual2024`)
3. Go to **Image Library** tab
4. Click **Connect to Google Drive**
5. You should see the Google sign-in popup
6. Grant permissions
7. Upload images!

## ⚠️ Common Issues

### Issue: "400: redirect_uri_mismatch"
**Solution:** Make sure the redirect URIs in Google Cloud Console EXACTLY match the URLs above (no trailing slashes, correct protocol http/https)

### Issue: "403: access_denied"
**Solution:** Make sure Google Drive API is enabled in your project

### Issue: "401: invalid_client"
**Solution:** Double-check that the Client ID in the code matches the one in Google Cloud Console

## 🔒 Security Notes

- The `google-oauth-credentials.json` file is in `.gitignore` and will NOT be committed to Git
- The Client ID is safe to expose publicly (it's in your frontend code)
- The Client Secret should be kept secure, but for OAuth 2.0 with PKCE flow, it's not used in the browser
- All authentication happens through Google's secure servers

## 📝 Current Status

✅ Client ID updated in code
✅ Credentials file created
✅ .gitignore updated
⏳ Waiting for you to configure redirect URIs in Google Cloud Console

Once you've configured the redirect URIs, the Google Drive integration will work perfectly!


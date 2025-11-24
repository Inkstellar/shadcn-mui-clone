# Microsoft Azure AD Login Setup Guide

This guide will help you set up Microsoft Azure AD authentication for the Cascade UI application.

## Prerequisites

- An Azure account (free tier works fine)
- Access to Azure Portal

## Step 1: Register Your Application in Azure

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Fill in the details:
   - **Name**: Cascade UI (or your preferred name)
   - **Supported account types**: Choose based on your needs:
     - **Single tenant**: Only users in your organization
     - **Multitenant**: Users in any organization
     - **Personal Microsoft accounts**: Anyone with a Microsoft account (recommended for testing)
   - **Redirect URI**: 
     - Platform: **Single-page application (SPA)**
     - URI: `http://localhost:8080` (for development)
5. Click **Register**

## Step 2: Configure Your Application

After registration, you'll be taken to the app overview page:

1. **Copy the Application (client) ID** - you'll need this for your `.env` file
2. **Copy the Directory (tenant) ID** (if using single tenant)
3. Go to **Authentication** in the left sidebar:
   - Ensure **Single-page application** is selected
   - Add redirect URIs if needed:
     - Development: `http://localhost:8080`
     - Production: `https://yourdomain.com`
   - Under **Implicit grant and hybrid flows**, ensure nothing is checked (not needed for MSAL 2.0+)
   - Save changes

4. Go to **API permissions** in the left sidebar:
   - You should see `User.Read` permission already added
   - This is sufficient for basic authentication
   - Click **Grant admin consent** if you're an admin (optional but recommended)

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the Azure AD configuration in `.env`:
   ```bash
   # Microsoft Azure AD Configuration
   VITE_AZURE_CLIENT_ID=your_application_client_id_here
   VITE_AZURE_AUTHORITY=https://login.microsoftonline.com/common
   VITE_AZURE_REDIRECT_URI=http://localhost:8080
   ```

3. Replace `your_application_client_id_here` with the Application (client) ID from Step 2

4. **Authority URL options**:
   - **Common** (recommended for testing): `https://login.microsoftonline.com/common`
     - Allows any Microsoft account (personal or work/school)
   - **Organizations**: `https://login.microsoftonline.com/organizations`
     - Only work/school accounts
   - **Consumers**: `https://login.microsoftonline.com/consumers`
     - Only personal Microsoft accounts
   - **Specific tenant**: `https://login.microsoftonline.com/{tenant-id}`
     - Only users from your specific tenant

## Step 4: Restart Development Server

After updating the `.env` file, restart your development server:

```bash
npx yarn run dev
```

## Step 5: Test Authentication

1. Navigate to `http://localhost:8080`
2. Click the **Sign In** button in the top right corner
3. A popup window will appear asking you to sign in with your Microsoft account
4. After successful authentication:
   - The Sign In button will be replaced with your avatar
   - Click the avatar to see your name and email
   - You can sign out from the dropdown menu

## Features

- ✅ **Popup Authentication**: Clean popup-based login flow
- ✅ **User Profile**: Displays user name and email after login
- ✅ **Avatar**: Shows user's initial in the AppBar
- ✅ **Secure**: Uses Microsoft Authentication Library (MSAL) 2.0
- ✅ **Session Storage**: Tokens stored securely in session storage

## Troubleshooting

### "AADSTS50011: The redirect URI specified in the request does not match"

**Solution**: Make sure the redirect URI in your `.env` file exactly matches one of the redirect URIs configured in Azure Portal.

### "AADSTS700016: Application not found"

**Solution**: Double-check that the `VITE_AZURE_CLIENT_ID` in your `.env` file matches the Application (client) ID from Azure Portal.

### Popup blocked by browser

**Solution**: Allow popups for `localhost:8080` in your browser settings.

### "Failed to acquire token silently"

**Solution**: This is normal on first login. The user will be prompted to sign in via popup.

## Production Deployment

When deploying to production:

1. Add your production URL to the redirect URIs in Azure Portal:
   - Go to **Authentication** > **Add a platform** > **Single-page application**
   - Add your production URL (e.g., `https://yourdomain.com`)

2. Update your production `.env`:
   ```bash
   VITE_AZURE_REDIRECT_URI=https://yourdomain.com
   ```

3. Consider using environment-specific tenant IDs for better security

## Additional Resources

- [MSAL.js Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)
- [Azure AD App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [MSAL React Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react)

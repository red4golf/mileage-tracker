# Google Cloud Setup Instructions

## 1. Create a Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Click "New Project"
3. Name it "Mileage Tracker" (or your preferred name)
4. Note the Project ID for later use

## 2. Enable Required APIs
In the Google Cloud Console:
1. Go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - Google Sheets API
   - Google Drive API
   - Identity and Access Management (IAM) API

## 3. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Configure the OAuth consent screen:
   - User Type: External
   - App name: Mileage Tracker
   - Support email: [your email]
4. Create OAuth client ID:
   - Application type: Web application
   - Name: Mileage Tracker Web Client
   - Authorized JavaScript origins: 
     - http://localhost:5173 (for development)
     - [Your production URL]
   - Authorized redirect URIs:
     - http://localhost:5173/auth/callback
     - [Your production URL]/auth/callback

## 4. Create Service Account (for backend)
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Name: mileage-tracker-service
4. Grant roles:
   - Editor role for Google Sheets API
5. Create and download the JSON key file

## 5. Set up the Base Google Sheet
1. Create a new Google Sheet
2. Share it with the service account email
3. Note the Sheet ID from the URL
# ScanGrow Mobile App

A React Native mobile app for ScanGrow AI platform owners to manage their business dashboard, view AI insights, and process QR code payments.

## Features

- **Dashboard**: Revenue metrics and business overview
- **AI Insights**: Business intelligence and recommendations from backend
- **QR Scanner**: Scan customer QR codes for fast payments

## Setup

1. Install dependencies:
   ```bash
   cd mobile
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on device/emulator:
   - For iOS: `npm run ios`
   - For Android: `npm run android`
   - For Web: `npm run web`

## Backend Connection

The app connects to the backend API at `http://127.0.0.1:8000` by default. Make sure the backend server is running before using the app.

## Navigation

- Use the navigation buttons on the Dashboard to access Insights and QR Scanner
- Use the back button to return to previous screens
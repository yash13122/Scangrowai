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
   npm start -- --port 8082 --tunnel --clear
   ```

3. Run on device/emulator/browser:
   - For a physical iPad with Expo Go: use the QR code shown in the terminal after `npm start`
   - For Android: `npm run android`
   - For Web browser: `npm run web -- --port 8082`

> Note: `npm run ios` only works on macOS with Xcode installed. Use Expo Go on your iPad or run the web version in your browser instead.

> This app has been updated to Expo SDK 54.0.0 so it works with newer Expo Go versions and iOS simulator workflows.

## Backend Connection

The app connects to the backend API at `http://127.0.0.1:8000` by default. Make sure the backend server is running before using the app.

## Navigation

- Use the navigation buttons on the Dashboard to access Insights and QR Scanner
- Use the back button to return to previous screens
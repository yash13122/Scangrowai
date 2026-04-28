#!/bin/bash

echo "🚀 Starting ScanGrow AI Platform..."
echo ""

# Check if backend is running
if curl -s http://127.0.0.1:8000 > /dev/null; then
    echo "✅ Backend API is running on port 8000"
else
    echo "❌ Backend API not found. Please start the backend first:"
    echo "   cd backend && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
    exit 1
fi

echo ""
echo "📱 Starting Mobile App..."

# Check if we're in the mobile directory
if [ ! -f "package.json" ]; then
    echo "📱 Changing to mobile directory..."
    cd mobile
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "🚀 Starting Expo development server..."
echo "📱 Instructions:"
echo "   1. Install 'Expo Go' app on your phone"
echo "   2. Scan the QR code that appears"
echo "   3. Or press 'w' in the terminal for web version"
echo "   4. Test: Dashboard → Insights → QR Scanner"
echo ""
echo "🔗 Backend API: http://127.0.0.1:8000"
echo "📊 Dashboard: http://127.0.0.1:8000/dashboard/demo"
echo ""

# Start Expo development server on port 8082 with tunnel mode to avoid timeout issues
npm start -- --port 8082 --tunnel
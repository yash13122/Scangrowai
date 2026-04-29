#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

echo "🚀 Starting ScanGrow AI Platform..."

echo "Checking backend API..."
if curl -s http://127.0.0.1:8000/ > /dev/null; then
    echo "✅ Backend API is running on port 8000"
else
    echo "❌ Backend API not found. Please start the backend first:"
    echo "   ./run-all.sh"
    echo "   or cd backend && .venv/bin/python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
    exit 1
fi

echo ""
echo "📱 Starting Mobile App..."

cd mobile
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found in mobile/"
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Installing mobile dependencies..."
    npm install
fi

echo ""
echo "Clearing Expo cache and local project state..."
rm -rf .expo

echo ""
echo "🚀 Starting Expo development server..."
echo "📱 Backend API: http://127.0.0.1:8000"
echo "📱 Use Expo Go on your iPad and scan the QR code in the terminal"
echo "📱 If you want browser access later, run './run-web.sh' or 'npm run web -- --port 8082' from mobile/"
echo "📱 Do not use 'npm run ios' on an iPad; that command is for the macOS simulator only"
echo ""
npm start -- --port 8082 --tunnel --clear
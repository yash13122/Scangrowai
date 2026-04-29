#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

echo "🚀 Starting ScanGrow mobile app in browser..."
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
echo "Clearing Expo cache..."
rm -rf .expo

echo ""
echo "🚀 Launching Expo web..."
npm run web -- --port 8082

#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

echo "🚀 Starting ScanGrow Full Stack Application..."

if [ ! -d ".venv" ]; then
  echo "⚠️  Python virtual environment not found. Creating .venv..."
  python3 -m venv .venv
fi

if [ -x ".venv/bin/python" ]; then
  PYTHON=".venv/bin/python"
else
  PYTHON="$(command -v python3 || command -v python)"
fi

echo "🔧 Installing backend dependencies..."
"$PYTHON" -m pip install --upgrade pip
"$PYTHON" -m pip install -r backend/app/requirements.txt

if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null; then
  echo "✅ Backend server is already running on port 8000"
else
  echo "📡 Starting backend server..."
  cd "$ROOT"
  nohup "$PYTHON" -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload > "$ROOT/backend.log" 2>&1 &
  echo $! > "$ROOT/backend.pid"
  sleep 3
  if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null; then
    echo "✅ Backend server started successfully"
  else
    echo "❌ Failed to start backend server"
    exit 1
  fi
fi

echo ""
./run-mobile.sh
#!/bin/bash

echo "🚀 Starting ScanGrow Full Stack Application..."

# Function to check if a process is running on a port
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "✅ Port $1 is already in use (service running)"
        return 0
    else
        echo "❌ Port $1 is free"
        return 1
    fi
}

# Start backend if not running
echo "🔧 Checking backend server..."
if ! check_port 8000; then
    echo "📡 Starting backend server..."
    cd backend/app
    nohup ../../../.venv/bin/python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload > ../../../backend.log 2>&1 &
    echo $! > ../../../backend.pid
    cd ../..
    sleep 3
    if check_port 8000; then
        echo "✅ Backend server started successfully"
    else
        echo "❌ Failed to start backend server"
        exit 1
    fi
else
    echo "✅ Backend server already running"
fi

# Start mobile app
echo "📱 Starting mobile app..."
./run-mobile.sh
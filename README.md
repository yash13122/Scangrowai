# ScanGrow AI Platform

A full-stack AI-powered platform for small business owners to manage revenue tracking, customer insights, and QR code payments.

## 🏗️ Architecture

- **Backend**: FastAPI (Python) with AI processing pipeline
- **Mobile**: React Native (Expo) with QR scanning and dashboard
- **Web**: Simple payment interface
- **Database**: PostgreSQL (via SQLAlchemy)

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- npm or yarn
- PostgreSQL (optional, uses in-memory storage by default)

### 1. Backend Setup
```bash
# Install Python dependencies
cd backend/app
pip install -r requirements.txt

# Start backend server
python -m uvicorn main:app --reload
```

### 2. Mobile App Setup
```bash
# Install mobile dependencies
cd mobile
npm install

# Start Expo development server
npm start
```

### 3. Run Everything
```bash
# From project root - starts both backend and mobile
./run-all.sh

# Or run individually:
./run-mobile.sh  # Mobile app only
```

## 📱 Features

### Backend API
- `/` - Health check
- `/dashboard/{store_id}` - Business insights and AI recommendations
- `/pay/{store_id}` - Generate UPI payment links
- `/confirm` - Confirm payment transactions
- `/store/create` - Create new store profiles
- `/feedback` - Submit customer feedback

### Mobile App
- **Dashboard**: Revenue metrics and business overview
- **AI Insights**: Real-time business intelligence from backend
- **QR Scanner**: Scan customer QR codes for instant payments
- **Navigation**: React Navigation with native stack

### AI Pipeline
- **Ingestion**: Process transaction data
- **Processor**: Clean and normalize data
- **BI Layer**: Generate business intelligence metrics
- **AI Agents**: Run ML models for insights
- **RAG Engine**: Retrieve and generate recommendations
- **Inference**: Final AI-powered insights

## 🧪 Testing

### Backend Tests
```bash
# Test all endpoints
curl http://localhost:8000/
curl http://localhost:8000/dashboard/demo
curl "http://localhost:8000/pay/demo?amount=100"
```

### Mobile Tests
```bash
cd mobile
npm test  # If test scripts added
```

## 📁 Project Structure

```
scangrowai/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app
│   │   ├── routes/              # API endpoints
│   │   ├── flow/                # AI processing pipeline
│   │   ├── requirements.txt     # Python dependencies
│   │   └── config.py            # App configuration
├── mobile/
│   ├── app.js                   # Main React Native app
│   ├── screens/                 # App screens
│   ├── package.json             # Mobile dependencies
│   └── app.json                 # Expo config
├── web/
│   ├── pay.js                   # Payment interface
│   └── qr_pay.html              # Simple payment page
├── infra/
│   └── docker-compose.yml       # Docker setup (empty)
└── run-*.sh                     # Launch scripts
```

## 🔧 Development

### Adding New Features
1. Backend: Add routes in `backend/app/routes/`
2. Mobile: Add screens in `mobile/screens/`
3. AI: Extend pipeline in `backend/app/flow/`

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- Backend runs on `http://localhost:8000`
- Mobile connects to backend via `BACKEND_URL`

## 📄 License

MIT License - see LICENSE file for details.

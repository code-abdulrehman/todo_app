#!/bin/bash

echo "🚀 Setting up Todo App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

echo "✅ Node.js and PostgreSQL are installed"

# Backend setup
echo "📦 Setting up backend..."
cd backend

# Install dependencies
if [ -f "package-lock.json" ]; then
    npm install
elif [ -f "pnpm-lock.yaml" ]; then
    pnpm install
else
    npm install
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
PORT=5000
DB_NAME=todo_app
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
DB_DIALECT=postgres
EOF
    echo "⚠️  Please update the .env file with your PostgreSQL credentials"
fi

cd ..

# Frontend setup
echo "📦 Setting up frontend..."
cd frontend

# Install dependencies
if [ -f "package-lock.json" ]; then
    npm install
elif [ -f "pnpm-lock.yaml" ]; then
    pnpm install
else
    npm install
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your PostgreSQL credentials"
echo "2. Create the database: CREATE DATABASE todo_app;"
echo "3. Start backend: cd backend && npm run dev (tables will be auto-created)"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Backend will run on: http://localhost:5000"
echo "🌐 Frontend will run on: http://localhost:5173" 
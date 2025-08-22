# Todo App

A full-stack todo application with React frontend and Express.js backend with PostgreSQL database.

## Backend Setup

### Database Setup
```bash
# Connect to PostgreSQL
psql -U postgres

# Create user and database
CREATE USER todo_user WITH ENCRYPTED PASSWORD '12345';
CREATE DATABASE todo_app OWNER todo_user;
GRANT ALL PRIVILEGES ON DATABASE todo_app TO todo_user;
```

### Backend Installation & Run
```bash
cd backend
pnpm i
pnpm dev
```

## API Endpoints

### Base URL: `http://localhost:5000/todos`

### 1. Get All Todos
```bash
curl -X GET http://localhost:5000/todos
```

### 2. Get Todo by ID
```bash
curl -X GET http://localhost:5000/todos/1
```

### 3. Get Todo by Title
```bash
curl -X GET http://localhost:5000/todos/title/Learn%20Express.js
```

### 4. Create a New Todo
```bash
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Express.js",
    "description": "Study Express.js framework and build REST APIs",
    "priority": "high"
  }'
```

### 5. Create Another Todo
```bash
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build a REST API",
    "description": "Create a complete REST API with Express and PostgreSQL",
    "priority": "medium"
  }'
```

### 6. Update Todo (Mark as Completed)
```bash
curl -X PUT http://localhost:5000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

### 7. Update Todo (Change Title and Description)
```bash
curl -X PUT http://localhost:5000/todos/2 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build a REST API with Express",
    "description": "Create a complete REST API with Express, PostgreSQL, and proper error handling",
    "priority": "high"
  }'
```

### 8. Update Todo Priority
```bash
curl -X PUT http://localhost:5000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "priority": "low"
  }'
```

### 9. Delete a Todo
```bash
curl -X DELETE http://localhost:5000/todos/1
```

### 10. Get All Todos (After Changes)
```bash
curl -X GET http://localhost:5000/todos
```

## Todo Model Schema

```javascript
{
  id: Number (auto-increment),
  title: String (required),
  description: String (required),
  priority: String (optional: "low", "medium", "high"),
  completed: Boolean (default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Frontend Setup

```bash
cd frontend
pnpm i
pnpm dev
```

## Features

- ✅ Create, Read, Update, Delete todos
- ✅ Mark todos as completed/incomplete
- ✅ Set priority levels (low, medium, high)
- ✅ Search todos by title
- ✅ PostgreSQL database with Sequelize ORM
- ✅ React frontend with Tailwind CSS
- ✅ Custom dropdown components
- ✅ Responsive design


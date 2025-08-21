### todo_app

backend setup
-     psql -U postgres



-      CREATE USER todo_user WITH ENCRYPTED PASSWORD '12345';
-      CREATE DATABASE todo_app OWNER todo_user;
-      GRANT ALL PRIVILEGES ON DATABASE todo_app TO todo_user;


-     pnpm i
-     pnpm dev

- mock data curl:

### 1. Create a new todo
    curl -X POST http://localhost:5000/todos \
    -H "Content-Type: application/json" \
    -d '{"title": "Learn Express.js"}'

### 2. Create another todo
    curl -X POST http://localhost:5000/todos \
    -H "Content-Type: application/json" \
    -d '{"title": "Build a REST API"}'

### 3. Get all todos
    curl -X GET http://localhost:5000/todos

### 4. Mark first todo as completed
    curl -X PUT http://localhost:5000/todos/1 \
    -H "Content-Type: application/json" \
    -d '{"completed": true}'

### 5. Update second todo title
    curl -X PUT http://localhost:5000/todos/2 \
    -H "Content-Type: application/json" \
    -d '{"title": "Build a REST API with Express"}'

### 6. Get all todos again to see changes
    curl -X GET http://localhost:5000/todos

### 7. Delete the first todo
    curl -X DELETE http://localhost:5000/todos/1

### 8. Get all todos to confirm deletion
    curl -X GET http://localhost:5000/todos


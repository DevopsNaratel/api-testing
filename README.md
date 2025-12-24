# Simple Express.js API

Backend sederhana menggunakan Express.js tanpa database (menggunakan in-memory storage).

## Installation

```bash
npm install
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Running Tests

```bash
npm test
```

## Docker

Build image:
```bash
docker build -t simple-express-api .
```

Run container:
```bash
docker run -p 3000:3000 simple-express-api
```

## Jenkins CI/CD

Project sudah dilengkapi dengan Jenkinsfile untuk automated CI/CD pipeline yang meliputi:
- Checkout code
- Install dependencies
- Run tests
- Build Docker image
- Deploy container

## API Endpoints

- `GET /health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Example Usage

```bash
# Get all users
curl http://localhost:3000/api/users

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"New User","email":"new@example.com"}'
```
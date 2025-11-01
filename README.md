# 📝 Todo Application - Backend API

A robust RESTful API built with Node.js, Express, TypeScript, and MongoDB. Features JWT authentication, secure token management, and complete CRUD operations for todo management.

## ✨ Features

- 🔐 JWT-based authentication with access and refresh tokens
- 🔒 Secure password hashing with bcryptjs
- 🍪 HTTP-only cookies for token storage
- ✅ Complete todo CRUD operations
- 🔍 Search and pagination support
- 👤 User-specific data isolation
- ✔️ Request validation with express-validator
- 🛡️ Protected routes and middleware

## 🛠 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password encryption
- **express-validator** - Input validation
- **cookie-parser** - Cookie handling
- **cors** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/theabhipatel/deploy_todo_nginx_docker_be.git
cd deploy_todo_nginx_docker_be
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**

Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. **Start MongoDB** (if running locally):
```bash
mongod
```

Or use MongoDB Atlas connection string in `MONGODB_URI`.

5. **Run the server:**

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The API will run on `http://localhost:5000`

## 📁 Project Structure

```
/src
  /models
    User.ts              # User schema
    Todo.ts              # Todo schema
  /controllers
    authController.ts    # Authentication logic
    todoController.ts    # Todo CRUD logic
  /routes
    authRoutes.ts        # Auth endpoints
    todoRoutes.ts        # Todo endpoints
  /middlewares
    auth.ts              # JWT verification
    errorHandler.ts      # Error handling
  /utils
    jwt.ts               # JWT utilities
  /config
    database.ts          # MongoDB connection
  server.ts              # Express app setup
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup    - Register new user
POST   /api/auth/login     - Login user
GET    /api/auth/me        - Get current user (protected)
POST   /api/auth/logout    - Logout user (protected)
```

### Todos
```
GET    /api/todos          - Get all todos (protected)
                            Query params: ?page=1&limit=10&search=keyword
GET    /api/todos/:id      - Get single todo (protected)
POST   /api/todos          - Create todo (protected)
PUT    /api/todos/:id      - Update todo (protected)
DELETE /api/todos/:id      - Delete todo (protected)
```

## 🔒 Security Features

- Password hashing with bcryptjs (salt rounds: 10)
- JWT tokens stored in HTTP-only cookies
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Automatic token refresh mechanism
- Request validation on all endpoints
- CORS configuration for specific origins
- Protected routes with authentication middleware

## 🧪 Testing the API

You can test the endpoints using:
- **Postman** or **Insomnia**
- **curl** commands
- **Thunder Client** (VS Code extension)

**Example Request:**
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check if port 27017 is available
- Verify `MONGODB_URI` in `.env` file
- For Atlas, ensure IP whitelist is configured

**Authentication Issues:**
- Verify JWT secrets are set in `.env`
- Check cookie settings in CORS configuration
- Ensure `FRONTEND_URL` matches your frontend URL

**Port Already in Use:**
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use MongoDB Atlas for database
3. Generate strong JWT secrets (use crypto.randomBytes)
4. Enable HTTPS
5. Configure production CORS origins
6. Set up environment variables on hosting platform

## 📄 License

MIT License


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!


---

Built with ❤️ using Node.js, Express, and TypeScript by [TheAbhiPatel](https://www.theabhipatel.com)
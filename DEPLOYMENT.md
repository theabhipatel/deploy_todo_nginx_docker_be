# 📝 MERN Stack Todo Application

A full-stack Todo application built with MongoDB, Express, React, and Node.js (MERN) using TypeScript. Features JWT authentication, modern UI with shadcn/ui components, and complete CRUD operations.

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication with access and refresh tokens
- HTTP-only cookies for secure token storage
- Password hashing with bcryptjs
- Protected routes and API endpoints

### ✅ Todo Management
- Create, read, update, and delete todos
- Mark todos as pending or done
- Search todos by title or description
- Pagination (10 items per page)
- User-specific todos (users only see their own)

### 🎨 Modern UI
- Clean and responsive design
- Built with Tailwind CSS and shadcn/ui components
- Loading states and empty states
- Form validation
- Modal dialogs for add/edit operations
- Beautiful gradient backgrounds

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Request validation
- **cookie-parser** - Cookie handling
- **cors** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 📁 Project Structure

```
/backend
  /src
    /models
      User.ts           # User model
      Todo.ts           # Todo model
    /controllers
      authController.ts # Auth logic
      todoController.ts # Todo CRUD logic
    /routes
      authRoutes.ts     # Auth endpoints
      todoRoutes.ts     # Todo endpoints
    /middlewares
      auth.ts           # JWT verification
      errorHandler.ts   # Error handling
    /utils
      jwt.ts            # JWT utilities
    /config
      database.ts       # MongoDB connection
    server.ts           # Express app setup

/frontend
  /src
    /components
      /ui               # shadcn/ui components
      ProtectedRoute.tsx
    /contexts
      AuthContext.tsx   # Auth state management
    /pages
      LoginPage.tsx
      SignupPage.tsx
      DashboardPage.tsx
    /lib
      api.ts            # API calls
      utils.ts          # Utilities
    App.tsx
    main.tsx
    index.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
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

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Run the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🧪 Testing the Application

### Demo User

For testing, you can create a user through the signup page or use these credentials if you seed the database:

**Email:** `demo@example.com`  
**Password:** `password123`

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

#### Todos
- `GET /api/todos?page=1&limit=10&search=keyword` - Get all todos (protected)
- `GET /api/todos/:id` - Get single todo (protected)
- `POST /api/todos` - Create todo (protected)
- `PUT /api/todos/:id` - Update todo (protected)
- `DELETE /api/todos/:id` - Delete todo (protected)

## 📝 Usage Guide

### Creating an Account
1. Navigate to the signup page
2. Enter your name, email, and password (min 6 characters)
3. Click "Create account"
4. You'll be automatically logged in and redirected to the dashboard

### Managing Todos
1. **Add Todo**: Click the "Add Todo" button, fill in the title and optional description
2. **Mark as Done**: Click the checkbox next to any todo to toggle its status
3. **Edit Todo**: Click the edit icon to modify title, description, or status
4. **Delete Todo**: Click the trash icon to remove a todo
5. **Search**: Use the search bar to filter todos by title or description
6. **Pagination**: Navigate through pages if you have more than 10 todos

## 🔒 Security Features

- Passwords are hashed using bcryptjs before storage
- JWT tokens stored in HTTP-only cookies (prevents XSS attacks)
- Access tokens expire after 15 minutes
- Refresh tokens expire after 7 days
- Automatic token refresh on API calls
- Protected routes on both frontend and backend
- Input validation on all forms
- CORS configured for security

## 🎨 UI Components

The application uses shadcn/ui components:
- **Button** - Primary actions and navigation
- **Input** - Form inputs with validation
- **Card** - Content containers
- **Dialog** - Modal popups for add/edit
- **Badge** - Status indicators
- **Table** - Todo list display

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or update `MONGODB_URI` with your MongoDB Atlas connection string
- Check if the port 27017 is not being used by another application

### CORS Errors
- Verify that `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that `withCredentials: true` is set in axios configuration

### Authentication Issues
- Clear browser cookies and try logging in again
- Ensure JWT secrets are properly set in `.env`
- Check that cookies are being sent with requests (check Network tab)

### Build Errors
- Delete `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Ensure TypeScript version compatibility
- Check that all required dependencies are installed

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Set strong JWT secrets
4. Enable HTTPS
5. Set up proper CORS origins
6. Deploy to services like Heroku, Railway, or DigitalOcean

### Frontend
1. Update API base URL in `vite.config.ts` or use environment variables
2. Build the production bundle: `npm run build`
3. Deploy the `dist` folder to Vercel, Netlify, or any static hosting service

## 📄 License

MIT License - feel free to use this project for learning or production!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using the MERN stack and TypeScript

---

**Happy Coding! 🎉**
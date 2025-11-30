# 🚀 Single Command MERN App Deployment on Any Server
This project provides a **fully automated**, production-ready CI/CD setup for deploying a **MERN Application** (Frontend + Backend) with Domain & Auto SSL on any Ubuntu server (I will use EC2 instance) using **Docker, Docker Compose, Nginx, Certbot SSL**, and **GitHub Actions**.

Just **push your code to the `production` branch** — your server will automatically install everything, configure itself, build both repos, and deploy the updated application.

> Check [Frontend](https://github.com/theabhipatel/deploy_todo_nginx_docker_fe.git) repo here.

---

# ✨ What This Setup Does

### ✅ 1. First-Time Server Setup (Fully Automatic)
When your EC2/Ubuntu server is empty, the GitHub Action will automatically:

- Install Docker & Docker Compose  
- Clone *both* frontend and backend repositories  
- Create the `.env` files using GitHub Secrets  
- Build and start all Docker containers  
- Configure Nginx reverse proxy  
- Generate & install SSL certificates using Certbot  

---

### ✅ 2. Auto-Update on Every Push
If the application already exists on the server:

- Fetch latest `production` branch from both repos  
- Hard reset to ensure clean sync  
- Recreate `.env` files from GitHub Secrets  
- Rebuild all Docker containers  
- Restart application with near-zero downtime  
- Clean old Docker images  

---

### ✅ 3. Zero Manual SSH Work
Deployment is **100% handled by GitHub Actions**.

---

# 🧑‍💻 What You Need To Do Manually (Only Once)

### ✔ 1. Clone both repositories
Update the application code or keep it as-is for testing.
```
git clone https://github.com/theabhipatel/deploy_todo_nginx_docker_fe.git
git clone https://github.com/theabhipatel/deploy_todo_nginx_docker_be.git
```

### ✔ 2. Create a new SSH key pair ([more](#-ssh-key-setup))

### ✔ 3. Create an Ubuntu VPS / AWS EC2 instance

### ✔ 4. Add your SSH public key to the server ([more](#-ssh-key-setup))

### ✔ 5. Point your domain to your EC2
Add DNS “A Records”:

```
yourdomain.com → <EC2_PUBLIC_IP>
api.yourdomain.com → <EC2_PUBLIC_IP>
```

### ✔ 6. Create `.env` files for frontend & backend ([more](#-environment-variables-env-setup))

### ✔ 7. Add GitHub Secrets ([more](#-add-these-to-frontend-repo-github-secrets))

### ✔ 8. Use the `production` branch for deployment  
Every push to `production` triggers the GitHub Actions workflow and deploys your app automatically.

That’s it. 🎉  
Your app gets deployed in under **2 minutes** with minimal manual work.

---

# 📦 Project Structure (Combined)

```
/project-root
  ├── frontend/
  │   ├── docker-compose.yml
  │   ├── Dockerfile
  │   ├── install-docker.sh
  │   ├── nginx/
  │   │   ├── entrypoint.sh
  │   │   └── templates/
  │   │       ├── http.template
  │   │       ├── https.template
  │   ├── .env.example
  │   ├── React/Tailwind app code...
  │   └── .github/
  │       └── workflows/
  │           └── deploy.yml      ← Frontend GitHub Actions workflow

  ├── backend/
  │   ├── docker-compose.yml
  │   ├── Dockerfile
  │   ├── install-docker.sh
  │   ├── nginx/
  │   │   ├── entrypoint.sh
  │   │   └── templates/
  │   │       ├── http.template
  │   │       ├── https.template
  │   ├── .env.example
  │   ├── Node/Express/MongoDB code...
  │   └── .github/
  │       └── workflows/
  │           └── deploy.yml      ← Backend GitHub Actions workflow
```

---

# 🔧 Environment Variables (`.env` Setup)
Before deploying, create a .env file in respective dir using .env.example file or the template below:

### Backend `.env` example:
```
PORT=5000
# MONGODB_URI=mongodb://localhost:27017/todo-app # local db url
MONGODB_URI=mongodb://mongo:27017/tododb # docker container url
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend `.env` example:
```
FRONTEND_DOMAIN=todo-domain.com
BACKEND_DOMAIN=api.todo-domain.com
DOMAINS=todo-domain.com,api.todo-domain.com
EMAIL=your-email@gmail.com
VITE_API_URL=https://api.todo-domain.com/api
```


Then:

1. Copy the content of your `.env` file respectively for frontend and backend 
2. Go to GitHub → Repository → **Settings → Secrets → Actions**  
3. Create a secret named for frontend:
```
ENV_FILE_FRONTEND 
```
Paste your `.env` content 
4. Create a secret named for backend:
```
ENV_FILE_BACKEND 
```
Paste your `.env` content 

### 🔐 Add these to Frontend repo GitHub Secrets:

| Secret Name | Description |
|-------------|-------------|
| **EC2_HOST** | EC2 server IP |
| **EC2_USER** | `ubuntu` |
| **EC2_SSH_KEY** | Private SSH key |
| **ENV_FILE_BACKEND** | Backend `.env` content |
| **ENV_FILE_FRONTEND** | Frontend `.env` content |
| **BACKEND_REPO_NAME** | Backend repo name only. eg `deploy_todo_nginx_docker_be` |

### 🔐 Add these to Backend repo GitHub Secrets:

| Secret Name | Description |
|-------------|-------------|
| **EC2_HOST** | EC2 server IP |
| **EC2_USER** | `ubuntu` |
| **EC2_SSH_KEY** | Private SSH key |
| **ENV_FILE_BACKEND** | Backend `.env` content |

---

# 🔑 SSH Key Setup

Generate:
```
ssh-keygen -t ed25519 -C "github-deploy" -f ./my-ec2-key
```

Add:

- `my-ec2-key.pub` → EC2 `~/.ssh/authorized_keys`
- `my-ec2-key` → GitHub Secret `EC2_SSH_KEY`

---

# 🚀 How Deployment Works

### Push to `production` → GitHub Action:

```
Push → GitHub Action triggers →
    SSH into EC2 →
        If app does NOT exist:
            install docker
            clone both repos
            create .env files
            build & run containers
            configure nginx + SSL
        Else:
            fetch latest code
            reset files
            update envs
            rebuild both frontend & backend
            restart services
```

Everything is automated.

---

# 🎉 Final Result

You get a full **MERN stack deployment pipeline** with:

- Docker  
- Docker Compose  
- Nginx Reverse Proxy  
- Auto SSL (Certbot)  
- GitHub Actions  
- EC2 / Ubuntu  

Write code → Push (production) → Your Todo App goes live. 🚀
That's it. 💯

---

### built by:
**TheAbhiPatel**  
[Portfolio](https://www.theabhipatel.com) • [LinkedIn](https://www.linkedin.com/in/theabhipatel)

# Chatty 💬 - Real-Time Chat Application

A premium, full-stack real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and styled gracefully with Tailwind CSS & DaisyUI.

---

## 🛠️ Recommended VS Code Extensions

To get the best development experience with this project, it is highly recommended to install the following VS Code extensions:

1. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - **Why:** Essential for writing CSS. It gives you auto-completion, syntax highlighting, and linting for Tailwind utility classes directly in your React components.
2. **ESLint** (`dbaeumer.vscode-eslint`)
   - **Why:** Enforces code quality and catches syntax errors early based on our ESLint configuration. 
3. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
   - **Why:** Automatically formats your code so you have a consistent code style across your files.
4. **DotENV** (`mikestead.dotenv`)
   - **Why:** Provides syntax highlighting for `.env` files making it easier to manage your environment variables.
5. **MongoDB for VS Code** (`mongodb.mongodb-vscode`)
   - **Why:** Lets you connect to the database from inside VS Code to verify users and messages directly.

---

## 🚀 How to Run the Project Locally

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### 2. Environment Setup
Inside the `backend` folder, copy the `.env.example` file to create a `.env` file and fill in your keys:
```bash
# Example basic variables needed
MONGODB_URI=your_mongodb_connection_string
PORT=5002
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5174
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Start the Backend Server
Open a terminal and navigate to the `backend` directory:
```bash
cd backend
npm install
npm run dev
```
*(The backend will start using Nodemon on port 5002).*

### 4. Start the Frontend Server
Open a second terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
*(The frontend Vite server typically starts on http://localhost:5174 or 5173).*

---

## 🐳 How the Docker Files Work

This application is fully containerized to make deployment completely seamless without configuring local dependencies. We utilize `docker-compose` along with two separate `Dockefile`s. 

### 1. Backend Dockerfile (`backend/Dockerfile`)
The backend uses a standard Node.js image to serve the Express API.
- **Base Image:** It pulls `node:20-alpine` (a lightweight version of Node.js) to keep the container small.
- **Dependencies:** It copies over the `package.json`, runs `npm ci --only=production` to strictly install exactly what is needed for production, skipping dev dependencies.
- **Execution:** It copies your active source code and starts the server via `node src/index.js`. 

### 2. Frontend Dockerfile (`frontend/Dockerfile`)
The frontend utilizes a **Multi-stage build**, making it highly optimized for production.
- **Stage 1 (Build):** It uses `node:20-alpine` to install dependencies and run `npm run build`. This bundles your entire React+Tailwind application into static HTML/CSS/JS files inside the `/dist` folder.
- **Stage 2 (Serve):** It pulls a brand new, ultra-lightweight `nginx:alpine` web-server image. It snatches *only* the compiled static files from Stage 1. 
- **Nginx Configuration:** It manually writes a `default.conf` server block to ensure SPA Support. Because React relies on client-side routing, Nginx is told to route all 404 falling requests (`try_files`) back to `index.html`.

### 3. Docker Compose (`docker-compose.yml`)
The docker-compose file orchestrates your entire architecture locally or in production via a single command (`docker-compose up --build`).
- **Services setup:** It initializes three containers:
  1. `backend`: Built from your local `./backend` folder, tied to port `5002` and passing your `.env` variables securely.
  2. `frontend`: Built from your local `./frontend` folder, tied to standard HTTP port `80`, routing your UI.
  3. `mongodb`: Pulls a sterile standard MongoDB database container (`mongo:7`) and binds to `27017` so you don't even need MongoDB permanently installed on your computer.
- **Volume Mapping:** It defines a persistent Docker volume (`mongo-data`) mapped to `/data/db`. So even if you destroy your containers, your database tables (Users, Messages) are preserved on your hard drive!

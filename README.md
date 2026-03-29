# Full-Stack Chat Application

A real-time, full-stack chat application built with a modern MERN-like stack. It features instant messaging functionality utilizing WebSockets for a seamless, live chat experience.

## ✨ Key Features
- **Real-Time Messaging:** Instant message delivery powered by Socket.io.
- **Modern UI/UX:** Clean, responsive, and beautifully designed interfaces built with React, DaisyUI, and Framer Motion.
- **Secure Authentication:** JWT-based user authentication and secure password hashing.
- **Scalable Architecture:** Clean separation of concerns between the frontend SPA and the backend REST API & WebSocket server.
- **Containerization:** Fully Dockerized for "one-click" deployments and consistent environments.

---

## 🚀 Technologies Used

**Frontend Ecosystem:**
- **React 19 (Vite):** Blazing fast frontend builds.
- **Zustand:** Lightweight global state management.
- **TailwindCSS & DaisyUI:** Utility-first and component-first styling.
- **Socket.io-client:** Bi-directional real-time communication.
- **Framer Motion:** Smooth application animations.

**Backend Ecosystem:**
- **Node.js & Express:** Robust backend HTTP server.
- **MongoDB & Mongoose:** NoSQL database for flexible data storage.
- **Socket.io:** WebSocket server integration.
- **Zod:** Strict runtime schema validation.
- **JSON Web Tokens (JWT):** Secure session handling.

---

## 🛠️ Recommended Developer Tools & Extensions

If you are developing or exploring this project locally, especially using **VS Code**, here are the recommended tools and extensions:

- **ESLint** (`dbaeumer.vscode-eslint`): For identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **Prettier - Code formatter** (`esbenp.prettier-vscode`): To keep the codebase styling consistent.
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): For intelligent Tailwind class auto-completion and linting on the frontend.
- **Docker** (`ms-azuretools.vscode-docker`): Crucial for building, managing, and debugging Docker containers directly inside VS Code.
- **Thunder Client** (`rangav.vscode-thunder-client`) or **Postman**: For sending HTTP requests to the backend API without needing the frontend.
- **MongoDB for VS Code** (`mongodb.mongodb-vscode`): To easily view and manipulate your database records without leaving the editor.

---

## ⚙️ Environment Configuration

Whether running locally or in Docker, the Backend requires environment variables.

1. Navigate to the `backend` directory.
2. Create a `.env` file (if one doesn't exist).
3. The `.env` file must include the following configuration:

```env
# Server Port
PORT=5002

# MongoDB Connection String
# 📌 IMPORTANT: 
# If running via Docker Compose, use: mongodb://mongodb:27017/chat_app
# If running LOCALLY (Node.js naked execution), use: mongodb://localhost:27017/chat_app
MONGODB_URI=mongodb://mongodb:27017/chat_app

# JWT Secret
JWT_SECRET=your_super_secret_key

# Node Environment
NODE_ENV=development
```

---

## 🏃 Running the Application (Locally / Development Mode)

If you want to run the code normally on your computer (without Docker), follow these steps. Note: You must have **Node.js** and **MongoDB** installed on your system.

### 1. Database Setup
Ensure that you have a local instance of MongoDB running on port `27017`.
Update your `backend/.env` file so the connection string points to `localhost`:
`MONGODB_URI=mongodb://localhost:27017/chat_app`

### 2. Start the Backend Server
Open a terminal and execute the following:
```bash
cd backend
npm install
npm run dev
```
*(The backend will start using `nodemon` on `http://localhost:5002` and will auto-restart on file changes).*

### 3. Start the Frontend Server
Open a **second** terminal window and execute:
```bash
cd frontend
# Using legacy-peer-deps to avoid strict peer dependency conflicts with React 19
npm install --legacy-peer-deps
npm run dev
```
*(The Vite development server will start, typically on `http://localhost:5173` or similar).*

---

## 🐳 Running the Application (Via Docker)

This is the recommended approach to run the entire stack effortlessly, as it doesn't require installing MongoDB or configuring local Node.js environments.

### Prerequisites
- [Docker & Docker CLI](https://docs.docker.com/get-docker/) installed and running.

### Execution Steps
1. Open your terminal at the root directory of this project (`/chat_app`).
2. Make sure your `backend/.env` has `MONGODB_URI=mongodb://mongodb:27017/chat_app`.
3. Build and start the containers in detached mode:
   ```bash
   docker compose up -d --build
   ```
4. Verify everything is running smoothly:
   ```bash
   docker compose ps
   ```

### Accessing the Dockerized Services
- **Frontend App:** [http://localhost](http://localhost) (Accessible via standard Port 80, served by Nginx)
- **Backend API:** [http://localhost:5002](http://localhost:5002)
- **MongoDB Database:** `localhost:27017`

### Stopping the Dockerized App
To gracefully stop all running services:
```bash
docker compose down
```
*(Your database records will be saved securely in the `mongo-data` docker volume).*

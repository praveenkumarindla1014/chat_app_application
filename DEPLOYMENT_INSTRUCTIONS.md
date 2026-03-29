# Kubernetes Deployment Instructions

This guide provides the exact, step-by-step terminal commands required to build your Docker images and deploy your Chat Application to a local Kubernetes cluster using Minikube.

---

### Prerequisites
- Docker Desktop is installed and **currently running** (Engine is green).
- **Minikube** and **kubectl** are installed.
- You are running these commands in a **PowerShell (Administrator)** window.
- Your terminal is open at the root of your project: `C:\Users\prave\OneDrive\Desktop\practise\chat_app`

---

## Step 1: Start the Cluster
First, we need to turn on the Minikube virtual machine that will act as our Kubernetes cluster.

```powershell
minikube start --driver=docker
```
*(Wait until you see the "Done! kubectl is now configured to use minikube" message).*

---

## Step 2: Connect to Minikube's Internal Docker
Kubernetes cannot use the Docker images on your regular PC. We must tell your PowerShell terminal to temporarily push all Docker commands directly inside Minikube's internal hard drive.

```powershell
minikube docker-env | Invoke-Expression
```
*(This command won't output anything, but it changes where your Docker builds your images).*

---

## Step 3: Build the Docker Images
Now that we are connected to Minikube's Docker, we build the images. Since we use `imagePullPolicy: Never` in our YAML files, Kubernetes requires the images to be named exactly as shown below:

**Build the Backend:**
```powershell
docker build -t chat-backend:latest ./backend
```

**Build the Frontend:**
```powershell
docker build -t chat-frontend:latest ./frontend
```
*(This might take a couple of minutes depending on your computer's speed).*

---

## Step 4: Apply the Kubernetes Configuration
Now we tell Kubernetes to read our `k8s/` folder and spin up the Database, Backend (2 replicas), and Frontend (2 replicas).

```powershell
kubectl apply -f ./k8s
```

You should see an output similar to:
```text
persistentvolumeclaim/mongo-pvc created
deployment.apps/mongodb-deployment created
service/mongodb created
configmap/backend-config created
secret/backend-secret created
deployment.apps/backend-deployment created
service/backend-service created
deployment.apps/frontend-deployment created
service/frontend-service created
```

---

## Step 5: Verify the Deployment
Before opening the app, make sure all 5 Pods (1 database + 2 backends + 2 frontends) are fully downloaded and "Running".

```powershell
kubectl get pods
```

> **Note:** The `mongodb-deployment` pod will likely say `ContainerCreating` for a minute or two the very first time, because Minikube has to download the `mongo:7` database software from the internet. Run the command again until they all say `Running`!

---

## Step 6: Access the Application!
Our frontend uses a `NodePort` service. This means Minikube has opened a special port to your computer to let you view the website. 

Run this command to automatically open your default web browser to the live application:

```powershell
minikube service frontend-service
```

---
### 🛑 How to Stop Everything
When you are done testing, you can gracefully shut down your cluster to save computer memory:

```powershell
minikube stop
```
*(Your database messages are saved safely inside the cluster for the next time you type `minikube start`!)*

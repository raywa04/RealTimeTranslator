# Real-Time Language Translation Platform

## Overview
This project is a full-stack application for real-time language translation. It uses Next.js for the frontend, Go for the backend, and a Python service for translation. The application features user authentication, real-time communication with WebSockets, and Docker for containerization.

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS, Firebase, Socket.io-client
- **Backend:** Go, Gorilla WebSocket, Gin Gonic, Firebase Admin SDK
- **Translation Service:** Python, Flask, Transformers (Hugging Face), MarianMTModel
- **Database:** Firebase Firestore
- **Containerization:** Docker

## Setup Instructions

### Frontend (Next.js)

1. **Initialize Next.js Project**
    ```sh
    npx create-next-app frontend
    cd frontend
    ```

2. **Install Required Dependencies**
    ```sh
    npm install firebase @next-auth/firebase-adapter next-auth
    npm install socket.io-client
    npm install --save-dev tailwindcss@latest postcss@latest autoprefixer@latest
    ```

3. **Configure Tailwind CSS**
    ```sh
    npx tailwindcss init -p
    ```

4. **Setup Firebase**
    ```sh
    // Create firebase.js and configure Firebase
    ```

5. **Create Authentication Components**
    ```sh
    // Create Login.js component
    ```

6. **Create Translation Page**
    ```sh
    // Create index.js page
    ```

7. **Create API Route for Translation**
    ```sh
    // Create translate.js API route
    ```

8. **Install Node Modules**
    ```sh
    npm install
    ```

9. **Run the Development Server**
    ```sh
    npm run dev
    ```

### Backend (Go)

1. **Initialize Go Project**
    ```sh
    mkdir backend
    cd backend
    go mod init backend
    ```

2. **Install Required Dependencies**
    ```sh
    go get github.com/gin-gonic/gin
    go get github.com/gorilla/websocket
    go get firebase.google.com/go/v4
    go get google.golang.org/api/option
    ```

3. **Create Main Go File**
    ```sh
    // Create main.go
    ```

4. **Create go.mod**
    ```sh
    go mod tidy
    ```

5. **Run the Go Server**
    ```sh
    go run main.go
    ```

### Translation Service (Python)

1. **Create Translation Service**
    ```sh
    // Create translate.py
    ```

2. **Create Requirements File**
    ```sh
    // Create requirements.txt
    ```

3. **Install Python Dependencies**
    ```sh
    pip install -r requirements.txt
    ```

4. **Run the Translation Service**
    ```sh
    python translate.py
    ```

### Docker (Optional)

1. **Build Docker Images**
    ```sh
    docker build -t translation-backend ./backend
    docker build -t translation-service ./translation-service
    ```

2. **Run Docker Containers**
    ```sh
    docker run -d -p 8080:8080 translation-backend
    docker run -d -p 5000:5000 translation-service
    ```

This setup provides a full-stack application for real-time language translation using Next.js for the frontend, Go for the backend, and a Python service for translation. It includes user authentication, real-time communication with WebSockets, and containerization with Docker for deployment.


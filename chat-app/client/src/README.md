# 💬 Real-Time WebSocket Chat Application

A full-stack, real-time messaging platform built to demonstrate **WebSocket architecture**, **state management**, and **modern React hooks**.

![Project Screenshot](path-to-your-screenshot.png)
*(Replace this text with a screenshot of your app once running)*

---

## 🚀 Key Features

* **Zero-Latency Messaging:** Bi-directional communication using `Socket.io` (WebSockets) eliminates HTTP polling overhead.
* **Persistent History:** Server-side in-memory storage ensures new users immediately see previous chat context upon joining.
* **Room Architecture:** Scalable room-based logic allows for future expansion into private channels.
* **Responsive UI:** A "Glassmorphism" inspired design with a mobile-first approach, built with pure CSS modules.
* **Developer Experience:** Includes automation scripts for single-command startup.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), CSS3
* **Backend:** Node.js, Express
* **Protocol:** Socket.io (WebSockets)
* **Dev Ops:** Concurrently (for parallel execution)

---

## ⚡ Quick Start Guide (Automated)

This project is configured with automation scripts to make setup instant.

### 1. Prerequisites
Ensure you have **Node.js** installed on your machine.

### 2. Installation
Run this single command in the root folder to install dependencies for **both** the client and server automatically:

```bash
npm run install-all
-----------------------------------------------------------------

Step 1: Set Up the Backend (Server)
Open a terminal and navigate to the server folder:

Bash
cd server
npm install      # Install backend dependencies
node index.js    # Start the server
Output: You should see SERVER RUNNING ON PORT 3001

Step 2: Set Up the Frontend (Client)
Open a new terminal window (do not close the server terminal) and navigate to the client folder:

Bash
cd client
npm install      # Install frontend dependencies
npm run dev      # Start React
Output: You should see Local: http://localhost:5173/

Step 3: Test the App
Open your browser to http://localhost:5173.

Open a second tab or Incognito window to the same URL.

Join with two different usernames and start chatting!
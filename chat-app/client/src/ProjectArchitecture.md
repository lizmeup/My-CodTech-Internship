chat-app/
├── package.json        # Root automation scripts (concurrently)
├── README.md           # Documentation
│
├── server/             # Backend (Node/Express/Socket.io)
│   ├── index.js        # Websocket server & event listeners
│   └── package.json    # Backend dependencies
│
└── client/             # Frontend (React/Vite)
    ├── src/
    │   ├── App.jsx     # Main Client logic & Socket connection
    │   ├── index.css   # Global styling & UI themes
    │   └── main.jsx    # React DOM entry
    └── package.json    # Frontend dependencies
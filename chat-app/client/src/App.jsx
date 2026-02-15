import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./index.css";

// Connect to backend
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("General"); // Default room
  const [showChat, setShowChat] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // Auto-scroll to bottom of chat
  const scrollRef = useRef(null);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    // Listen for history when first connecting
    socket.on("load_history", (history) => {
      setMessageList(history);
    });

    // Cleanup listener to prevent duplicates
    return () => socket.off("receive_message");
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const joinChat = () => {
    if (username !== "") {
      setShowChat(true);
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        text: currentMessage,
      };

      await socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Professional Chat</h3>
          <input
            type="text"
            placeholder="Enter your name..."
            onChange={(event) => setUsername(event.target.value)}
          />
          <button onClick={joinChat}>Join Room</button>
        </div>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <p>Live Support / {room}</p>
          </div>
          <div className="chat-body">
            {messageList.map((messageContent) => {
              const isMe = username === messageContent.author;
              return (
                <div
                  className="message"
                  id={isMe ? "you" : "other"}
                  key={messageContent.id}
                >
                  <div className="message-content">
                    <p>{messageContent.text}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              );
            })}
            <div ref={scrollRef} />
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Type a message..."
              onChange={(event) => setCurrentMessage(event.target.value)}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
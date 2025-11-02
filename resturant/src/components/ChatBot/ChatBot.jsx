import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import axios from "axios";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:3000/chat", {
        message: input,
      });
      console.log(res);

      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
      setInput("");
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error connecting to AI." },
      ]);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Icon */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1050,
        }}
      >
        <button
          className="btn rounded-circle shadow"
          style={{ backgroundColor: "#d08700", color: "white",width:"50px",height:"50px" ,textAlign:"center" }}
          onClick={toggleChat}
        >
          {isOpen ?<i class="bi bi-chat-right-text"></i> : <FaRobot />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="card shadow"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            maxHeight: "400px",
            display: "flex",
            flexDirection: "column",
            zIndex: 1050,
          }}
        >
          {/* Header */}
          <div
            className="card-header d-flex justify-content-between align-items-center  text-white"
            style={{ backgroundColor: "#d08700" }}
          >
            <span>AI Chat</span>
            <button className="btn btn-sm btn-light" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div
            className="card-body flex-grow-1 overflow-auto"
            style={{ padding: "0.5rem" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${
                  msg.sender === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div

                  style={{
                    backgroundColor:
                      msg.sender === "user" ? "#d08700" : "#f8f9fa",
                    color: msg.sender === "user" ? "white" : "black",
                    padding: "0.5rem",
                    maxWidth: "80%",
                    borderRadius: "0.25rem",
                    marginBottom: "0.5rem",
                    alignSelf:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="card-footer d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="btn"
              style={{ backgroundColor: "#d08700",color:"white" }}
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

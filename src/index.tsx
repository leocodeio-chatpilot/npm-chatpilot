import * as React from "react";
import { SiChatbot } from "react-icons/si";
import { GiCrossedBones } from "react-icons/gi";
import { IoSendSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export const Capitalize = ({ str }: { str: string }) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

interface Message {
  role: string;
  content: string;
}

export const ChatPilotBot = ({
  apiKey,
  apiUrl = "https://api.chatpilot.com",
}: {
  apiKey: string;
  apiUrl?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = { role: "user", content: inputMessage };
    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      toast.error("Failed to get response");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      position: "fixed",
      bottom: "2rem",
      right: "2rem",
    },
    chatContainer: {
      maxWidth: "20rem",
      width: "100%",
      backgroundColor: "white",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      zIndex: 50,
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.75rem",
      backgroundColor: "white",
      borderBottom: "1px solid #e5e7eb",
      position: "relative",
    },
    headerTitle: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    closeButton: {
      position: "absolute",
      top: "-1.5rem",
      right: "0.5rem",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      ":hover": {
        transform: "scale(1.25)",
      },
    },
    messagesContainer: {
      height: "20rem",
      overflowY: "auto",
      padding: "1rem",
    },
    messageWrapper: (isUser: boolean) => ({
      marginBottom: "0.75rem",
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
    }),
    message: (isUser: boolean) => ({
      maxWidth: "75%",
      borderRadius: "1rem",
      padding: "0.75rem 1rem",
      backgroundColor: isUser ? "#3b82f6" : "#f3f4f6",
      color: isUser ? "white" : "black",
    }),
    noMessages: {
      textAlign: "center",
      color: "#9ca3af",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem",
      borderTop: "1px solid #e5e7eb",
    },
    input: {
      flexGrow: 1,
      padding: "0.5rem",
      borderRadius: "0.5rem",
      border: "1px solid #e5e7eb",
      outline: "none",
      ":focus": {
        borderColor: "#3b82f6",
      },
    },
    sendButton: {
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      ":hover": {
        backgroundColor: "#2563eb",
      },
    },
    chatButton: {
      backgroundColor: "#ef4444",
      color: "white",
      padding: "0.5rem",
      borderRadius: "9999px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      ":hover": {
        backgroundColor: "#dc2626",
      },
    },
  };

  return (
    <div className="container">
      <Toaster position="top-right" />
      {isOpen ? (
        <div className="chat-container">
          <div className="header">
            <div className="header-title">
              <SiChatbot className="chatbot-icon" />
              <span className="header-title-text">ChatPilot</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-button">
              <GiCrossedBones className="close-icon" />
            </button>
          </div>

          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                style={styles.messageWrapper(message.role === "user")}
              >
                <div style={styles.message(message.role === "user")}>
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message-wrapper">
                <div className="message">Typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="input"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="send-button"
              >
                <IoSendSharp className="send-icon" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="chat-button">
          <SiChatbot className="chat-icon" />
        </button>
      )}
    </div>
  );
};

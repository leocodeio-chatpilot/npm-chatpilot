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
      bottom: "1rem",
      right: "1rem",
    },
    chatContainer: {
      width: "24rem",
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem",
      backgroundColor: "white",
      borderBottom: "1px solid #e5e7eb",
    },
    headerTitle: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    closeButton: {
      padding: "0.5rem",
      borderRadius: "9999px",
      ":hover": {
        backgroundColor: "#f3f4f6",
      },
    },
    messagesContainer: {
      height: "24rem",
      overflowY: "auto",
      padding: "1rem",
    },
    messageWrapper: (isUser: boolean) => ({
      marginBottom: "1rem",
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
    }),
    message: (isUser: boolean) => ({
      maxWidth: "80%",
      borderRadius: "0.5rem",
      padding: "0.75rem",
      backgroundColor: isUser ? "#3b82f6" : "#e5e7eb",
      color: isUser ? "white" : "black",
    }),
    inputContainer: {
      padding: "1rem",
      borderTop: "1px solid #e5e7eb",
    },
    inputWrapper: {
      display: "flex",
      gap: "0.5rem",
    },
    input: {
      flexGrow: 1,
      borderRadius: "0.5rem",
      border: "1px solid #e5e7eb",
      padding: "0.5rem",
      outline: "none",
      ":focus": {
        ring: "2px",
        ringColor: "#3b82f6",
      },
    },
    sendButton: {
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      ":hover": {
        backgroundColor: "#2563eb",
      },
      ":disabled": {
        opacity: 0.5,
      },
    },
    chatButton: {
      backgroundColor: "#3b82f6",
      color: "white",
      padding: "1rem",
      borderRadius: "9999px",
      ":hover": {
        backgroundColor: "#2563eb",
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
              <SiChatbot style={{ width: "1.5rem", height: "1.5rem" }} />
              <span style={{ fontWeight: 600 }}>ChatPilot</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
              <GiCrossedBones style={{ width: "1.25rem", height: "1.25rem" }} />
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
              <div style={styles.messageWrapper(false)}>
                <div style={styles.message(false)}>Typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} style={styles.inputContainer}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                style={styles.input}
              />
              <button
                type="submit"
                disabled={isLoading}
                style={styles.sendButton}
              >
                <IoSendSharp style={{ width: "1.25rem", height: "1.25rem" }} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} style={styles.chatButton}>
          <SiChatbot style={{ width: "1.5rem", height: "1.5rem" }} />
        </button>
      )}
    </div>
  );
};

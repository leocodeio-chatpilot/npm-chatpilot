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
  xApiKey,
  theme = "system",
}: {
  apiKey: string;
  xApiKey: string;
  apiUrl?: string;
  theme?: "light" | "dark" | "system";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const colors = {
    light: {
      background: "#ffffff",
      surface: "#f3f4f6",
      border: "#e5e7eb",
      text: "#000000",
      textSecondary: "#9ca3af",
      primary: "#3b82f6",
      primaryHover: "#2563eb",
      userMessage: "#3b82f6",
      userMessageText: "#ffffff",
      assistantMessage: "#f3f4f6",
      assistantMessageText: "#000000",
      danger: "#ef4444",
      dangerHover: "#dc2626",
    },
    dark: {
      background: "#1f2937",
      surface: "#374151",
      border: "#4b5563",
      text: "#ffffff",
      textSecondary: "#9ca3af",
      primary: "#3b82f6",
      primaryHover: "#2563eb",
      userMessage: "#3b82f6",
      userMessageText: "#ffffff",
      assistantMessage: "#374151",
      assistantMessageText: "#ffffff",
      danger: "#ef4444",
      dangerHover: "#dc2626",
    },
  };

  const currentColors = isDarkMode ? colors.dark : colors.light;

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
      const response = await fetch(`https://chatpilot.leocode.tech/action/npm/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xApiKey,
        },
        body: JSON.stringify({
          queryText: inputMessage,
          apiKey: apiKey,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.data.payload.response },
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
      zIndex: 50,
    },
    chatContainer: {
      maxWidth: "25rem",
      maxHeight: "35rem",
      backgroundColor: currentColors.background,
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      zIndex: 50,
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      padding: "0.75rem",
    },
    closeButton: {
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      color: currentColors.text,
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
      backgroundColor: isUser ? currentColors.userMessage : currentColors.assistantMessage,
      color: isUser ? currentColors.userMessageText : currentColors.assistantMessageText,
    }),
    noMessages: {
      textAlign: "center",
      color: currentColors.textSecondary,
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem",
      borderTop: `1px solid ${currentColors.border}`,
    },
    input: {
      flexGrow: 1,
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: `1px solid ${currentColors.border}`,
      outline: "none",
      backgroundColor: currentColors.background,
      color: currentColors.text,
      ":focus": {
        borderColor: currentColors.primary,
      },
    },
    sendButton: {
      backgroundColor: currentColors.primary,
      color: "white",
      borderRadius: "0.5rem",
      border: "none",
      padding: "0.75rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ":hover": {
        backgroundColor: currentColors.primaryHover,
      },
    },
    chatButton: {
      backgroundColor: currentColors.danger,
      color: "white",
      padding: "0.5rem",
      borderRadius: "9999px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ":hover": {
        backgroundColor: currentColors.dangerHover,
      },
    },
    chatbotIcon: {
      width: "1.5rem",
      height: "1.5rem",
    },
    inputWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem",
      borderTop: `1px solid ${currentColors.border}`,
    },
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <Toaster position="top-right" />
      {isOpen ? (
        <div style={styles.chatContainer as React.CSSProperties}>
          <div style={styles.header as React.CSSProperties}>
            <button onClick={() => setIsOpen(false)} style={styles.closeButton as React.CSSProperties}>
              <GiCrossedBones />
            </button>
          </div>

          <div style={styles.messagesContainer as React.CSSProperties}>
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

          <form
            onSubmit={handleSendMessage}
            style={styles.inputContainer as React.CSSProperties}
          >
            <div style={styles.inputWrapper as React.CSSProperties}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                style={styles.input as React.CSSProperties}
              />
              <button
                type="submit"
                disabled={isLoading}
                style={styles.sendButton as React.CSSProperties}
              >
                <IoSendSharp />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} style={styles.chatButton as React.CSSProperties}>
          <SiChatbot style={styles.chatbotIcon as React.CSSProperties} />
        </button>
      )}
    </div>
  );
};

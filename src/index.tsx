import * as React from 'react';
import { SiChatbot } from "react-icons/si";
import { GiCrossedBones } from "react-icons/gi";
import { IoSendSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import './styles.css';

export const Capitalize = ({ str }: { str: string }) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

interface Message {
  role: string;
  content: string;
}

export const ChatPilotBot = ({ 
  apiKey,
  apiUrl = "https://api.chatpilot.com" 
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
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      toast.error("Failed to get response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatpilot-fixed chatpilot-bottom-4 chatpilot-right-4">
      <Toaster position="top-right" />
      {isOpen ? (
        <div className="chatpilot-container">
          <div className="chatpilot-header">
            <div className="chatpilot-flex chatpilot-items-center chatpilot-gap-2">
              <SiChatbot className="chatpilot-w-6 chatpilot-h-6" />
              <span className="chatpilot-font-semibold">ChatPilot</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="chatpilot-p-2 chatpilot-rounded-full hover:chatpilot-bg-gray-100"
            >
              <GiCrossedBones className="chatpilot-w-5 chatpilot-h-5" />
            </button>
          </div>
          
          <div className="chatpilot-h-96 chatpilot-overflow-y-auto chatpilot-p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatpilot-mb-4 chatpilot-flex ${
                  message.role === "user" ? "chatpilot-justify-end" : "chatpilot-justify-start"
                }`}
              >
                <div
                  className={`chatpilot-max-w-[80%] chatpilot-rounded-lg chatpilot-p-3 ${
                    message.role === "user"
                      ? "chatpilot-bg-blue-500 chatpilot-text-white"
                      : "chatpilot-bg-gray-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatpilot-flex chatpilot-justify-start chatpilot-mb-4">
                <div className="chatpilot-bg-gray-200 chatpilot-rounded-lg chatpilot-p-3">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chatpilot-p-4 chatpilot-border-t">
            <div className="chatpilot-flex chatpilot-gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="chatpilot-flex-1 chatpilot-rounded-lg chatpilot-border chatpilot-p-2 chatpilot-focus:outline-none chatpilot-focus:ring-2 chatpilot-focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="chatpilot-bg-blue-500 chatpilot-text-white chatpilot-p-2 chatpilot-rounded-lg hover:chatpilot-bg-blue-600 chatpilot-transition-colors disabled:chatpilot-opacity-50"
              >
                <IoSendSharp className="chatpilot-w-5 chatpilot-h-5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="chatpilot-bg-blue-500 chatpilot-text-white chatpilot-p-4 chatpilot-rounded-full hover:chatpilot-bg-blue-600 chatpilot-transition-colors"
        >
          <SiChatbot className="chatpilot-w-6 chatpilot-h-6" />
        </button>
      )}
    </div>
  );
};
// chat/MessageList.tsx
import React, { useRef, useEffect, useState } from "react";
import { Clipboard } from "lucide-react";
import toast from "react-hot-toast";
import type { Message } from "../../types/chat";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);

  // Copy to clipboard
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text.");
      console.error("Copy failed:", err);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Auto-scroll to bottom
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-grow p-4 md:p-6 overflow-y-auto">
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 max-w-lg ${
              message.sender === "user"
                ? "self-end flex-row-reverse"
                : "self-start"
            }`}
            onMouseEnter={() => setHoveredMessageId(message.id)}
            onMouseLeave={() => setHoveredMessageId(null)}
          >
            {/* Avatar */}
            {message.sender === "user" ? (
              <img
                src="../public/jaspreet.jpg"
                className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center"
              />
            ) : (
              <img
                src="../public/gemini_logo.svg"
                alt="chat-bot logo"
                className="w-8 h-8"
              />
            )}

            <div className="flex flex-col">
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Uploaded"
                    className="mb-2 rounded-md max-w-full h-auto"
                  />
                )}
                <p>{message.content}</p>
              </div>

              {/* Footer: timestamp + clipboard */}
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {formatTimestamp(message.timestamp)}
                </span>

                {message.sender !== "user" && (
                  <button
                    onClick={() => handleCopy(message.content)}
                    className={`text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-opacity duration-200 ${
                      hoveredMessageId === message.id ? "opacity-100" : "opacity-0"
                    }`}
                    aria-label="Copy message to clipboard"
                  >
                    <Clipboard size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default MessageList;

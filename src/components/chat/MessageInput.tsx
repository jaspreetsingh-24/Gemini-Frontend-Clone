import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ImageUpload from "../ui/ImageUpload";



interface MessageInputProps {
  onSendMessage: (message: string,image:string|undefined) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
}) => {
  const [text, setText] = useState("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      onSendMessage(text,imageSrc);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-end gap-2 sm:gap-3">
        {/* Image upload button */}
        <div className="flex-shrink-0">
          <ImageUpload  onImageUpload={setImageSrc}/>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-grow p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 min-h-[40px] max-h-48"
          rows={1}
          disabled={isLoading}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={isLoading || !text.trim()}
          className="flex-shrink-0 p-2 sm:p-3 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;

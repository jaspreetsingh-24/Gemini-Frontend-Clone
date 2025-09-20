// chat/Chatroom.tsx
import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { useChatStore } from "../../store/chatStore";

const Chatroom: React.FC = () => {
  const { rooms, currentRoom, sendMessage, isTyping } = useChatStore();

  const activeRoom = rooms.find((r) => r.id === currentRoom);

  const handleSendMessage = (text: string,image:string|undefined) => {
    if (activeRoom) {
      sendMessage(activeRoom.id, text,image);
    }
  };

  if (!activeRoom) {
    return (
      <div className="flex flex-col h-full items-center justify-center ">
        <h2 className="text-2xl">Welcome to Gemini Clone</h2>
        <p className="text-gray-500">Select a chat room or create a new one to start messaging.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-blue-900">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold">{activeRoom.title}</h2>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto">
        <MessageList messages={activeRoom.messages} />
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input */}
      <MessageInput onSendMessage={handleSendMessage} isLoading={isTyping} />

    </div>
  );
};

export default Chatroom;

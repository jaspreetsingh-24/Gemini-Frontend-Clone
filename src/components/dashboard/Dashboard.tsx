// dashboard/Dashboard.tsx
import React, { useState } from "react";
import ChatRoomList from "./ChatRoomList";
import Chatroom from "../chat/ChatRoom";
import { Menu, X } from "lucide-react";

const Dashboard: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden sm:flex">
        <ChatRoomList />
      </div>

      {/* Drawer for mobile */}
      <div
        className={`fixed inset-0 z-50 transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 sm:hidden`}
      >
        <div className="w-64 h-full bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Close button */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Gemini Chats
            </h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-gray-600 dark:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>
          {/* ChatRoomList */}
          <ChatRoomList />
        </div>

        {/* Overlay */}
       
      </div>

      {/* Main chat area */}
      <div className="flex-1 relative">
        <div className="sm:hidden absolute top-4 left-4 z-40">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 bg-white dark:bg-gray-900 rounded shadow-md"
          >
            <Menu size={24} />
          </button>
        </div>
        <Chatroom />
      </div>
    </div>
  );
};

export default Dashboard;

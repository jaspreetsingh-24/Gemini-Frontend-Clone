import React, { useState, useEffect, useRef } from "react";
import CreateRoomModal from "./CreateRoomModal";
import { useChatStore } from "../../store/chatStore";
import CustomButton from "../ui/CustomButton";
import ThemeToggle from "../ui/ThemeToggle";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/authstore";

const ChatRoomList: React.FC = () => {
  const { rooms, currentRoom, setCurrentRoom, createRoom, deleteRoom } =
    useChatStore();

  const logout = useAuthStore((state) => state.logout);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRooms, setFilteredRooms] = useState(rooms);

const debounceTimeout = useRef<number | null>(null);

useEffect(() => {
  if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

  debounceTimeout.current = window.setTimeout(() => {
    setFilteredRooms(
      rooms.filter((room) =>
        room.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, 300);

  return () => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
  };
}, [searchTerm, rooms]);  

  const handleCreateRoom = (name: string) => {
    createRoom(name);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full sm:w-72 h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Chats
        </h2>
        <CustomButton
          label="New Chat"
          onClick={() => setIsModalOpen(true)}
          className="w-full"
        />
      </div>

      {/* Search Bar */}
      <div className="sticky top-20 z-10 p-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search chatrooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      {/* Room List */}
      <nav className="flex-grow overflow-y-auto p-2">
        <ul className="space-y-2">
          {filteredRooms.map((room) => (
            <li key={room.id} className="flex items-center justify-between">
              <button
                onClick={() => setCurrentRoom(room.id)}
                className={`flex-1 text-left px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
                  currentRoom === room.id
                    ? "bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {room.title}
              </button>
              <button
                onClick={() => {
                  toast.success(`Chat Room '${room.title}' Deleted`);
                  deleteRoom(room.id);
                }}
                className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 text-lg font-bold"
              >
                ✕
              </button>
            </li>
          ))}
          {filteredRooms.length === 0 && (
            <li className="text-gray-500 dark:text-gray-400 text-center mt-2">
              No chatrooms found.
            </li>
          )}
        </ul>
      </nav>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
        <ThemeToggle />
        <CustomButton
          label="Logout"
          onClick={() => {
logout()
            return toast.success("Logged out!");
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        />
      </div>

      {/* Modal */}
      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateRoom}
      />
    </div>
  );
};

export default ChatRoomList;

// dashboard/CreateRoomModal.tsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CustomButton from "../ui/CustomButton";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [roomName, setRoomName] = useState("");

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setRoomName("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (roomName.trim()) {
      onCreate(roomName.trim());
      toast.success("New chat created!");
      setRoomName("");
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Create New Chat Room
        </h2>

        <div className="flex flex-col gap-4">
          {/* Input field */}
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />

          {/* Action buttons */}
          <div className="flex justify-end gap-3">
            <CustomButton
              label="Cancel"
              onClick={onClose}
            />
            <CustomButton
              label="Create"
              disabled={!roomName.trim()}
              onClick={handleCreate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;

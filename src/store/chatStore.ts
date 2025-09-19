import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatRoom, Message, ChatState } from "../types/chat";

interface ChatStore extends ChatState {
  setCurrentRoom: (roomId: string | null) => void;
  createRoom: (title: string) => string;
  deleteRoom: (roomId: string) => void;
  sendMessage: (roomId: string, content: string, image?: string) => void;
  setTyping: (typing: boolean) => void;
  getPredefinedResponse: (message: string) => string | null;
}



const PREDEFINED_RESPONSES: Record<string, string> = {
  'hello': "Hi, How can I help you today?",
  'hi': "Hello! How are you doing?",
  "what is your name": "I'm Gemini, your support assistant",
  "who are you": "I`m your friendly chatbot assistant, here to help you.",
  'bye': "Goodbye, Take care and have a great day!",
};

const RANDOM_RESPONSES = [
  "Hmm, I`m not sure I understood that. Could you rephrase?",
  "That`s interesting! Can you tell me more?",
  "I don`t have an answer for that, but I`m here to help however I can.",
  "Could you clarify what you mean?",
  "I didn`t quite catch that — can you try asking in another way?",
];

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      rooms: [],
      currentRoom: null,
      isTyping: false,
      searchQuery: "",

      setCurrentRoom: (roomId) => set({ currentRoom: roomId }),

      createRoom: (title) => {
        const newRoom: ChatRoom = {
          id: Math.random().toString(36),
          title: title || `Chat ${Date.now()}`,
          lastActivity: new Date(),
          messages: [],
        };

        set((state) => ({
          rooms: [newRoom, ...state.rooms],
          currentRoom: newRoom.id,
        }));

        return newRoom.id;
      },

      deleteRoom: (roomId) => {
        set((state) => ({
          rooms: state.rooms.filter((room) => room.id !== roomId),
          currentRoom:
            state.currentRoom === roomId ? null : state.currentRoom,
        }));
      },

      sendMessage: async (roomId, content, image) => {
        const userMessage: Message = {
          id: Math.random().toString(36),
          content,
          sender: "user",
          timestamp: new Date().toISOString(),
          image,
        };

        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId
              ? {
                ...room,
                messages: [...room.messages, userMessage],
                lastMessage: content,
                lastActivity: new Date(),
              }
              : room
          ),
        }));

        set({ isTyping: true });

        setTimeout(() => {
          const predefined = get().getPredefinedResponse(content.trim().toLowerCase());

          const aiResponseText =
            predefined ||
            RANDOM_RESPONSES[
            Math.floor(Math.random() * RANDOM_RESPONSES.length)
            ];

          const aiResponse: Message = {
            id: Math.random().toString(36),
            content: aiResponseText,
            sender: "ai",
            timestamp: new Date().toISOString(),
          };

          set((state) => ({
            rooms: state.rooms.map((room) =>
              room.id === roomId
                ? {
                  ...room,
                  messages: [...room.messages, aiResponse],
                  lastMessage: aiResponse.content,
                  lastActivity: new Date(),
                }
                : room
            ),
            isTyping: false,
          }));
        }, 1000 + Math.random() * 2000); // 1–3 sec delay
      },

      setTyping: (typing) => set({ isTyping: typing }),



      getPredefinedResponse: (message) => {
        return PREDEFINED_RESPONSES[message] || null;
      },
    }),
    { name: "chat-storage" }
  )
);

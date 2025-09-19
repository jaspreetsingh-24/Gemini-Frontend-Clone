export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string; 
  image?: string;
}

export interface ChatRoom {
  id: string;
  title: string;
  lastMessage?: string;
  lastActivity: Date;
  messages: Message[];
}

export interface ChatState {
  rooms: ChatRoom[];
  currentRoom: string | null;
  isTyping: boolean;
  searchQuery: string;
}
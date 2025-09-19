// chat/TypingIndicator.tsx
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="px-6 py-2 flex items-center gap-2">
        <p>Gemini is typing</p>
      <div className="flex items-centre gap-1.5 p-3 ">
        <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
        <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
        <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
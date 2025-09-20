import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";

interface ImageUploadProps {
  value: string | null;                     
  onChange: (fileSrc: string | null) => void; 
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        onChange(src);
        setMenuOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
    setMenuOpen(false);
  };

  return (
    <div className="relative inline-block">
      {menuOpen && (
        <div className="absolute mt-2 bottom-full right-auto sm:w-48 w-40 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-600 
          rounded shadow-lg z-50 transform -translate-x-1/4 sm:-translate-x-0"
        >
          <button
            onClick={handleUploadClick}
            className="w-full text-left px-3 sm:px-4 py-2 
              hover:bg-gray-100 dark:hover:bg-gray-700 
              flex items-center gap-2 
              text-gray-800 dark:text-gray-200"
          >
            <Plus size={20} /> Upload Image
          </button>
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 p-1 
          border border-gray-300 dark:border-gray-600 
          rounded flex items-center justify-center 
          bg-gray-100 dark:bg-gray-700 
          hover:bg-gray-200 dark:hover:bg-gray-600 
          overflow-hidden"
      >
        {value ? (
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <Plus size={24} className="text-gray-700 dark:text-gray-200" />
        )}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;

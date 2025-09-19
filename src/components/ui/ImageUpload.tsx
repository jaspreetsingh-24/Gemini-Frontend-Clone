import { Plus } from "lucide-react";
import React, { useState, useRef } from "react";

interface ImageUploadProps {
  onImageUpload: (fileSrc: string) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        let src = event.target?.result as string;
        setSelectedImage(src);
        onImageUpload?.(src);

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
        <div className="absolute mt-2 bottom-full right-auto sm:w-48 w-40 bg-white border rounded shadow-lg z-50 transform -translate-x-1/4 sm:-translate-x-0">
          <button
            onClick={handleUploadClick}
            className="w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
          >
            <Plus size={20} /> Upload Image
          </button>
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 p-1 border rounded flex items-center justify-center bg-gray-100 hover:bg-gray-200 overflow-hidden"
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Uploaded"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <Plus size={24} />
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

// components/CustomButton.tsx
import React from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`
         mt-4 px-4 py-2 
        bg-blue-200 dark:bg-blue-600 
        text-black dark:text-white 
        rounded-lg transition-colors 
        hover:bg-blue-300 dark:hover:bg-blue-700 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default CustomButton;

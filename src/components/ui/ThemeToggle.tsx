import { useUiStore } from "../../store/uiStore";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useUiStore();
  let isDark = theme === "dark"
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{isDark ? "Dark" : "Light"}</span>
      <button
        onClick={toggleTheme}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none
          ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
            ${isDark ? "translate-x-6" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;

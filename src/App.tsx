import { Toaster } from "react-hot-toast";
import "./App.css";
import { useAuthStore } from "./store/authstore";
import { LoginForm } from "./components/auth/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";
import { useUiStore } from "./store/uiStore";
import { useEffect } from "react";

function App() {
  const {  user } = useAuthStore();
  const { darkMode } = useUiStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const renderContent = () => {
    
    if (user?.isAuthenticated) {
      return <Dashboard />;
    }

    return <LoginForm />;
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "dark:bg-gray-800 dark:text-white",
        }}
      />
      <div className="App w-screen  min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 flex flex-col relative">
        {renderContent()}
      </div>
    </>
  );
}

export default App;

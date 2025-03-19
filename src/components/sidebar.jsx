import { useState } from "react";
import {
  FileText,
  Save,
  Image,
  Users,
  Command,
  Search,
  HelpCircle,
  Trash2,
  Star,
  Github,
  UserPlus,
  MessageSquare,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative ${
        isOpen ? "w-80" : "w-24"
      } h-screen bg-gray-100 dark:bg-gray-900 p-4 shadow-lg transition-all duration-300`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-[-12px] bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-1 rounded-full shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <ul className="mt-10 space-y-4">
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <FileText size={20} />
          {isOpen && <span>Open</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <Save size={20} />
          {isOpen && <span>Save to...</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <Image size={20} />
          {isOpen && <span>Export Image</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <Users size={20} />
          {isOpen && <span>Live Collaboration</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <Command size={20} />
          {isOpen && <span>Command Palette</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <Search size={20} />
          {isOpen && <span>Find on Canvas</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <HelpCircle size={20} />
          {isOpen && <span>Help</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-red-500">
          <Trash2 size={20} />
          {isOpen && <span>Reset Canvas</span>}
        </li>
        <li className="border-t border-gray-300 dark:border-gray-700 pt-4"></li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-yellow-500">
          <Star size={20} />
          {isOpen && <span>Excalidraw+</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-black">
          <Github size={20} />
          {isOpen && <span>GitHub</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <UserPlus size={20} />
          {isOpen && <span>Follow Us</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-purple-500">
          <MessageSquare size={20} />
          {isOpen && <span>Discord Chat</span>}
        </li>
        <li className="border-t border-gray-300 dark:border-gray-700 pt-4"></li>
        <li className="flex items-center space-x-3 text-blue-500 cursor-pointer hover:text-blue-700">
          {isOpen && <span>Sign Up</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer">
          <Sun size={20} />
          {isOpen && <span>Theme</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

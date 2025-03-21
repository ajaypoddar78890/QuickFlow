import { useState } from "react";
import html2canvas from "html2canvas"; // Import html2canvas for capturing screenshots
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

const Sidebar = ({ flowRef }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to capture and save the React Flow component as an image
  const handleExportImage = async () => {
    if (!flowRef || !flowRef.current) {
      console.error("React Flow container not found.");
      return;
    }
    try {
      const canvas = await html2canvas(flowRef.current, {
        backgroundColor: "#ffffff", // White background for the image
        useCORS: true,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "reactflow-screenshot.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting image:", error);
    }
  };

  return (
    <div
      className={`relative h-full ${
        isOpen ? "w-8-48" : "w-18"
      } h-screen bg-gray-100 dark:bg-gray-900 p-4 shadow-lg transition-all duration-300`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-[-12px] bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-1 rounded-full shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        {isOpen ? <ChevronLeft size={30} /> : <ChevronRight size={30} />}
      </button>

      <h2 className="text-2xl text-white font-bold ">QuickFlow</h2>

      <ul className="mt-10 space-y-4">
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <FileText size={30} />
          {isOpen && <span>Open</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <Save size={30} />
          {isOpen && <span>Save to...</span>}
        </li>
        {/* Export Image list item with onClick to trigger screenshot */}
        <li
          onClick={handleExportImage}
          className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500"
        >
          <Image size={30} />
          {isOpen && <span>Export Image</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <Users size={30} />
          {isOpen && <span>Live Collaboration</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <Command size={30} />
          {isOpen && <span>Command Palette</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <Search size={30} />
          {isOpen && <span>Find on Canvas</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <HelpCircle size={30} />
          {isOpen && <span>Help</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-red-500">
          <Trash2 size={30} />
          {isOpen && <span>Reset Canvas</span>}
        </li>
        <li className="border-t border-gray-300 dark:border-gray-700 pt-4"></li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-yellow-500">
          <Star size={30} />
          {isOpen && <span>QuickFlow</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-black">
          <Github size={30} />
          {isOpen && <span>GitHub</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <UserPlus size={30} />
          {isOpen && <span>Follow Us</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-purple-500">
          <MessageSquare size={30} />
          {isOpen && <span>Discord Chat</span>}
        </li>
        <li className="border-t border-gray-300 dark:border-gray-700 pt-4"></li>
        <li className="flex items-center space-x-3 text-blue-500 cursor-pointer hover:text-blue-700">
          {isOpen && <span>Sign Up</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer">
          <Sun size={30} />
          {isOpen && <span>Theme</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

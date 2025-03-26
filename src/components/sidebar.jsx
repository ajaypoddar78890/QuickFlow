import { toast } from "sonner";
import { useState, useRef } from "react";
import domtoimage from "dom-to-image";
import { useReactFlow } from "@xyflow/react";
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

  //fit in convas
  // Access the flow instance using the hook
  const { fitView } = useReactFlow();

  // Call fitView() when clicking the button
  const handleFindOnCanvas = () => {
    fitView();
  };

  const handleResetCanvas = () => {
    localStorage.removeItem("fields"); // Remove 'fields' data
    localStorage.removeItem("reactFlowData"); // Remove 'reactFlowData'

    toast.success("Canvas reset successfully!", { position: "top-center" }); // Show success toast
    window.location.reload();
  };

  //file open
  const fileInputRef = useRef(null);

  // Trigger file selection dialog
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle the file selection
  const handleImportFile = (event) => {
    if (!event || !event.target.files || event.target.files.length === 0) {
      toast.error("No file selected!", { position: "top-center" });
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        localStorage.setItem("fields", JSON.stringify(importedData.fields));
        localStorage.setItem(
          "reactFlowData",
          JSON.stringify(importedData.reactFlowData)
        );
        toast.success("Data imported successfully!", {
          position: "top-center",
        });

        // Reload the page after a short delay
        setTimeout(() => window.location.reload(), 500);
      } catch (error) {
        toast.error("Invalid file format!", { position: "top-center" });
        console.error("Error parsing file:", error);
      }
    };

    reader.readAsText(file);
  };

  const handleSaveToFile = () => {
    const data = {
      fields: JSON.parse(localStorage.getItem("fields")) || [],
      reactFlowData: JSON.parse(localStorage.getItem("reactFlowData")) || [],
    };

    const jsonData = JSON.stringify(data, null, 2); // Format JSON
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "canvas-data.json"; // File name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("File saved successfully!", { position: "top-center" });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to capture and save the React Flow component as an image

  const handleExportImage = () => {
    if (!flowRef?.current) {
      console.error("React Flow container not found.");
      return;
    }
    const flowContainer = flowRef.current.closest(".react-flow");

    // Get the container size
    const width = flowContainer.clientWidth * 3;
    const height = flowContainer.clientHeight * 3;

    domtoimage
      .toPng(flowContainer, {
        width: width,
        height: height,
        quality: 1, // Maximum quality
        style: {
          transform: "scale(3)", // Scale to improve resolution
          transformOrigin: "top left",
          width: flowContainer.clientWidth + "px",
          height: flowContainer.clientHeight + "px",
        },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "reactflow-export.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error exporting image:", error);
      });
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

      <ul className="mt-6 space-y-2">
        <li
          onClick={triggerFileInput}
          className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500"
        >
          <FileText size={30} />
          {isOpen && <span>Open</span>}
        </li>
        <li
          onClick={handleSaveToFile}
          className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500"
        >
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
        <li
          onClick={() => {
            toast.warning(
              "This feature is not available in the demo version.",
              { position: "top-center" }
            );
          }}
          className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500"
        >
          <Users size={30} />
          {isOpen && <span>Live Collaboration</span>}
        </li>
        <li
          onClick={() => {
            toast.warning(
              "This feature is not available in the demo version.",
              { position: "top-center" }
            );
          }}
          className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500"
        >
          <Command size={30} />
          {isOpen && <span>Command Palette</span>}
        </li>
        <li
          onClick={handleFindOnCanvas}
          className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500"
        >
          <Search size={30} />
          {isOpen && <span>Find on Canvas</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-500">
          <HelpCircle size={30} />
          {isOpen && <span>Help</span>}
        </li>
        <li
          onClick={handleResetCanvas}
          className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-red-500"
        >
          <Trash2 size={30} />
          {isOpen && <span>Reset Canvas</span>}
        </li>
        <li className="border-t border-gray-300 dark:border-gray-700 pt-4"></li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-yellow-500">
          <Star size={30} />
          {isOpen && <span>QuickFlow</span>}
        </li>
        <li className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 cursor-pointer hover:text-white">
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
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImportFile}
      />
    </div>
  );
};

export default Sidebar;

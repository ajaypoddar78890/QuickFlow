import React, { useState } from "react";
import ReactFlowComponent from "./reactFlow";
import { Menu, X } from "lucide-react"; // Icons for toggle button

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex w-[20rem]">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
          isOpen ? "w-[20rem]" : "w-48"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 left-4 text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar Content */}
        <div className={`p-5  mt-10 ${isOpen ? "block" : "hidden"}`}>
          <h2 className="text-lg font-bold mb-4">Sidebar</h2>
          <ul>
            <li className="mb-3">
              <a href="#" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="hover:text-gray-400">
                About
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="hover:text-gray-400">
                Services
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <h1 className="text-2xl font-bold">PlayGround</h1>
        <ReactFlowComponent />
      </div>
    </div>
  );
};

export default Sidebar;

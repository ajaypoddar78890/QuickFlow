import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for toggle button

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
          isOpen ? "w-[15vw]" : "w-0"
        } overflow-hidden`}
      >
        {/* Sidebar Content */}
        <div className="p-5 mt-10">
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

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 bg-gray-800 p-2 rounded text-white z-50"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default Sidebar;

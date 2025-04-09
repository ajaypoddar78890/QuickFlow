import React, { useState, useRef, useMemo } from "react";
import { Handle, Position } from "@xyflow/react";
import { FaPlus, FaTimes, FaDotCircle } from "react-icons/fa";

import CustomNodeForm from "./CustomNodeForm";

const CustomNode = ({ id, data = {}, selected }) => {
  const nodeRef = useRef(null);
  const titleRef = useRef(null);

  const [title, setTitle] = useState(data.title || "Node Title");
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const handlePlusClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedType(null);
  };

  // Color classes
  const colorClasses = [
    "bg-pink-300",
    "bg-purple-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-blue-300",
  ];

  // Generate a consistent index based on node id
  const getColorIndex = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % colorClasses.length;
  };

  const colorClass = useMemo(() => {
    return colorClasses[getColorIndex(id || "")];
  }, [id]);

  return (
    <div
      ref={nodeRef}
      className={`w-full shadow-lg rounded border-gray-400 bg-white relative font-sans`}
    >
      {/* Header with consistent background color */}
      <div
        className={`relative ${colorClass} pt-2 flex items-center justify-center font-semibold text-sm text-gray-800`}
      >
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-center font-semibold outline-none bg-transparent resize-none text-sm text-gray-800"
        />
        <FaPlus
          className="text-blue-500 cursor-pointer text-base absolute right-2 top-2"
          onClick={handlePlusClick}
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="text-sm text-gray-600 border border-gray-300 bg-gray-50 px-4 py-2">
          {data.label || "No Event"}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute z-50 bg-white text-black rounded-lg shadow-xl p-6 w-[800px] min-h-[400px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Select Type</h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <select
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 text-white cursor-pointer"
          >
            <option value="">Select Type</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="videoCall">Video Call</option>
          </select>

          {selectedType && (
            <CustomNodeForm type={selectedType} onClose={closeModal} />
          )}
        </div>
      )}

      {/* Right Handle (custom icon + connectable) */}
      <div className="absolute top-1/2 right-[-12px] transform -translate-y-1/2 w-6 h-6">
        {/* Invisible Handle */}
        <Handle
          id="right"
          type="source"
          position={Position.Right}
          isConnectable
          className="absolute inset-0 w-full h-full bg-transparent z-0"
        />

        {/* Icon on top */}
        <div
          className="absolute inset-0 flex items-center justify-center text-blue-600 cursor-pointer text-lg z-10"
          onClick={() => console.log("Right handle icon clicked!")}
        >
          <FaDotCircle />
        </div>
      </div>

      {/* Bottom Handle */}
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        isConnectable
        className="w-4 h-2 bg-teal-500 rounded-none"
      />

      {/* Left Handle */}
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        isConnectable
        className="w-1 h-4 bg-red-500 rounded-none"
      />
    </div>
  );
};

export default CustomNode;

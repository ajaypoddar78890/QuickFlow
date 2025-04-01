import React, { useState, useRef } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { FaPlus, FaTimes } from "react-icons/fa";
import CustomNodeForm from "./CustomNodeForm";

const CustomNode = ({ id, data = {}, selected }) => {
  const nodeRef = useRef(null);
  const titleRef = useRef(null);

  const [title, setTitle] = useState(data.title || "Node Title");
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 20, y: 40 });

  const handlePlusClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedType(null);
  };

  return (
    <div
      ref={nodeRef}
      className={`bg-gray-800 text-white border w-full ${
        selected ? "border-blue-500 shadow-lg" : "border-gray-700"
      } rounded-md flex flex-col relative p-3`}
    >
      {selected && (
        <NodeResizer
          minWidth={150}
          minHeight={100}
          maxWidth={400}
          maxHeight={300}
          isVisible={selected}
        />
      )}

      {/* Title Bar */}
      <div className="flex justify-between items-start mb-2">
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-sm font-semibold outline-none cursor-text w-full text-center border-none resize-none bg-transparent text-white"
        />
        <FaPlus
          className="text-blue-500 cursor-pointer text-lg mt-2"
          onClick={handlePlusClick}
        />
      </div>

      {/* Absolutely Positioned Modal */}
      {showModal && (
        <div
          className="absolute z-50 bg-white text-black rounded-lg shadow-xl p-6 w-[500px] min-h-[400px]"
          style={{
            left: `${modalPosition.x}px`,
            top: `${modalPosition.y}px`,
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Select Type</h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <FaTimes className="text-xl" />{" "}
              {/* Replace "×" with FaTimes icon */}
            </button>
          </div>

          <select
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white cursor-pointer"
          >
            <option value="">Select Type</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="videoCall">Video Call</option>
          </select>

          {selectedType && (
            <CustomNodeForm type={selectedType} onClose={closeModal} />
          )}

          {!selectedType && (
            <div className="flex justify-end mt-4">
              {/* <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button> */}
            </div>
          )}
        </div>
      )}

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable
        className="w-4 h-2 bg-teal-500 rounded-none"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable
        className="w-1 h-4 bg-red-600 rounded-none"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable
        className="w-4 h-2 bg-teal-500 rounded-none"
      />
      <Handle
        type="source"
        position={Position.Left}
        isConnectable
        className="w-1 h-4 bg-red-500 rounded-none"
      />
    </div>
  );
};

export default CustomNode;

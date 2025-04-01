import React, { useState, useRef } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import { FaPlus } from "react-icons/fa";
import CustomNodeForm from "./CustomNodeForm";

const CustomNode = ({ id, data = {}, selected }) => {
  const nodeRef = useRef(null);
  const titleRef = useRef(null);

  const [title, setTitle] = useState(data.title || "Node Title");
  const [width, setWidth] = useState(data.width || 300); // Node's smaller width
  const [height, setHeight] = useState(data.height || 100);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

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
      className={`bg-gray-800 text-white border ${
        selected ? "border-blue-500 shadow-lg" : "border-gray-700"
      } rounded-md flex flex-col relative p-3`}
      style={{ width: `${width}px`, height: `${height}px` }} // Smaller node width
    >
      {selected && (
        <NodeResizer
          minWidth={150}
          minHeight={100}
          maxWidth={400}
          maxHeight={300}
          isVisible={selected}
          onResizeEnd={(event, params) => {
            setWidth(params.width);
            setHeight(params.height);
          }}
        />
      )}

      {/* Title Bar */}
      <div className="flex justify-between items-start mb-2">
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-sm font-semibold outline-none cursor-text w-3/4 text-center border-none resize-none bg-transparent text-white"
        />
        <FaPlus
          className="text-blue-500 cursor-pointer text-lg mt-2"
          onClick={handlePlusClick}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white text-black rounded-lg shadow-xl p-6 w-[850px]">
            {" "}
            {/* Fixed modal width */}
            <h3 className="text-lg font-semibold mb-4">Select Type</h3>
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
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            )}
          </div>
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

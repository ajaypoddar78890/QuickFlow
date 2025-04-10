import React, { useState, useRef, useMemo } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { FaPlus, FaTimes, FaDotCircle } from "react-icons/fa";
import CustomNodeForm from "./CustomNodeForm";

const CustomNode = ({ id, data = {}, addNewNode }) => {
  const nodeRef = useRef(null);
  const titleRef = useRef(null);

  const [title, setTitle] = useState(data.title || "Node Title");
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const { addNodes, addEdges, getNode } = useReactFlow();

  const handlePlusClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedType(null);
  };

  const handleQuickSelect = (type) => {
    setSelectedType(type);
    setShowQuickMenu(false);
    setShowModal(false);

    const newNodeId = `${Date.now()}`;

    // Get position of parent node
    const parentNode = getNode(id);
    const newPosition = parentNode
      ? {
          x: parentNode.position.x + 250,
          y: parentNode.position.y,
        }
      : { x: 0, y: 0 };

    const label = `${type.charAt(0).toUpperCase() + type.slice(1)} Node`;

    // Add the new node
    addNodes({
      id: newNodeId,
      type: "customNode",
      position: newPosition,
      data: {
        label,
        title: label,
        type,
        addNewNode,
      },
    });

    console.log("✅ New node added:", newNodeId);

    // Add edge from current node to new node
    addEdges({
      id: `e-${id}-${newNodeId}`,
      source: id,
      target: newNodeId,
      type: "custom",
    });

    console.log(`🔗 Edge created from ${id} → ${newNodeId}`);
  };

  const colorClasses = [
    "bg-pink-300",
    "bg-purple-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-blue-300",
  ];

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
      className={`w-full shadow-lg rounded-lg border-gray-400 bg-white relative font-sans`}
    >
      {/* Header */}
      <div
        className={`relative ${colorClass} pt-2 flex items-center justify-center font-semibold text-sm text-gray-800 rounded-t-lg`}
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
            value={selectedType || ""}
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

      {/* Right Handle + Quick Menu */}
      <div className="absolute top-1/2 right-[-12px] transform -translate-y-1/2 w-6 h-6 z-10 pointer-events-none">
        <Handle
          id="right"
          type="source"
          position={Position.Right}
          isConnectable={true}
          className="absolute inset-0 w-full h-full bg-transparent"
        />

        <div
          className="absolute inset-0 flex items-center justify-center text-blue-600 cursor-pointer text-lg pointer-events-auto"
          onMouseEnter={() => setShowQuickMenu(true)}
          onMouseLeave={() => setShowQuickMenu(false)}
        >
          <FaDotCircle />

          {showQuickMenu && (
            <div
              className="absolute -top-20 right-6 bg-white border shadow-md rounded-md p-2 space-y-1 z-50 text-xs text-black w-28"
              onMouseEnter={() => setShowQuickMenu(true)}
              onMouseLeave={() => setShowQuickMenu(false)}
            >
              <div
                className="hover:bg-gray-100 px-2 py-1 cursor-pointer rounded"
                onClick={() => handleQuickSelect("image")}
              >
                📷 Image
              </div>
              <div
                className="hover:bg-gray-100 px-2 py-1 cursor-pointer rounded"
                onClick={() => handleQuickSelect("video")}
              >
                🎥 Video
              </div>
              <div
                className="hover:bg-gray-100 px-2 py-1 cursor-pointer rounded"
                onClick={() => handleQuickSelect("videoCall")}
              >
                📞 Video Call
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom & Left Handles */}
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        isConnectable
        className="w-4 h-2 bg-teal-500 rounded-none"
      />
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

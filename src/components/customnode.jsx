import React, { useState, useEffect } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "@xyflow/react";
import CustomForm from "./CustomForm"; // Import your custom form component

const CustomNode = ({ id, data, selected }) => {
  const { setNodes } = useReactFlow();
  const [label, setLabel] = useState(data.label);
  const [width, setWidth] = useState(data.width || 150);
  const [height, setHeight] = useState(data.height || 80);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name || "",
    phone: data.phone || "",
  });

  // Update node data with label, size, and formData changes
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...node.data, label, width, height, ...formData },
            }
          : node
      )
    );
  }, [label, width, height, formData, id, setNodes]);

  // Modal control functions
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Optional: Handle form changes if needed
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Optional: Form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div
      style={{
        width,
        height,
        border: selected ? "2px solid #007bff" : "1px solid #ccc",
        background: "#fff",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: selected ? "0 0 10px rgba(0, 123, 255, 0.5)" : "none",
        position: "relative",
      }}
    >
      {/* Node Resizer: Only visible when the node is selected */}
      {selected && (
        <NodeResizer
          minWidth={100}
          minHeight={50}
          maxWidth={300}
          maxHeight={200}
          isVisible={selected}
          onResizeEnd={(event, params) => {
            setWidth(params.width);
            setHeight(params.height);
          }}
        />
      )}

      {/* Editable Label */}
      <textarea
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          textAlign: "center",
          fontSize: `${Math.max(12, width / 10)}px`,
          outline: "none",
          background: "transparent",
          overflow: "hidden",
          whiteSpace: "normal",
          wordWrap: "break-word",
          resize: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      {/* + Button to open the modal form */}
      <button
        onClick={openModal}
        style={{ position: "absolute", top: 5, right: 5, cursor: "pointer" }}
      >
        +
      </button>

      {/* Render the CustomForm component when modal is open */}
      {isModalOpen && (
        <CustomForm
          formData={formData}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
          closeModal={closeModal}
        />
      )}

      {/* Connection Handles */}
      <Handle type="target" position={Position.Top} isConnectable={true} />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={true}
      />
    </div>
  );
};

export default CustomNode;

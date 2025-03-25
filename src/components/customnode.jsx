import React, { useState, useEffect, useRef } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "@xyflow/react";
import DynamicFieldsManager from "./CustomForm";

const CustomNode = ({ id, data = {}, selected }) => {
  const { setNodes } = useReactFlow();
  const nodeRef = useRef(null);

  const [label, setLabel] = useState(data.label || "Node");
  const [width, setWidth] = useState(data.width || 150);
  const [height, setHeight] = useState(data.height || 80);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(
    data?.formData || { name: "", phone: "" }
  );
  const [dynamicFields, setDynamicFields] = useState(data?.dynamicFields || []);

  useEffect(() => {
    const savedFields = localStorage.getItem("allFields");
    try {
      const parsedFields = savedFields ? JSON.parse(savedFields) : {};
      setDynamicFields(parsedFields[id] || []);
    } catch (error) {
      console.error("Error parsing allFields from localStorage:", error);
      setDynamicFields([]);
    }
  }, [id]);

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          const updatedNode = {
            ...node,
            data: {
              ...node.data,
              label,
              width,
              height,
              formData,
              dynamicFields,
            },
          };
          try {
            const storedFields =
              JSON.parse(localStorage.getItem("allFields")) || {};
            storedFields[id] = dynamicFields;
            localStorage.setItem("allFields", JSON.stringify(storedFields));
          } catch (e) {
            console.error("Error setting allFields to localStorage", e);
          }
          return JSON.stringify(node.data) === JSON.stringify(updatedNode.data)
            ? node
            : updatedNode;
        }
        return node;
      })
    );
  }, [label, width, height, formData, dynamicFields, id, setNodes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isModalOpen &&
        nodeRef.current &&
        !nodeRef.current.contains(event.target)
      ) {
        closeModal();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      ref={nodeRef}
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
        padding: "5px",
      }}
    >
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

      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => setLabel(e.target.innerText)}
        style={{
          width: "100%",
          minHeight: "20px",
          textAlign: "center",
          fontSize: `${Math.max(12, width / 10)}px`,
          outline: "none",
          background: "transparent",
        }}
      >
        {label}
      </div>

      <button
        onClick={openModal}
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          cursor: "pointer",
          background: "#007bff",
          color: "#fff",
          border: "none",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        +
      </button>

      {isModalOpen && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 10,
            borderRadius: "5px",
            maxWidth: "650px",
            overflow: "hidden",
          }}
        >
          <DynamicFieldsManager
            nodeId={id}
            handleChange={handleChange}
            closeModal={closeModal}
          />
        </div>
      )}

      <Handle type="target" position={Position.Top} isConnectable />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable
      />
    </div>
  );
};

export default CustomNode;

import React, { useState, useEffect, useRef } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "@xyflow/react";
import DynamicFieldsManager from "./CustomForm";

const CustomNode = ({ id, data = {}, selected }) => {
  const { setNodes } = useReactFlow();
  const nodeRef = useRef(null);
  const titleRef = useRef(null);

  const [title, setTitle] = useState(data.title || "Node Title");
  const [width, setWidth] = useState(data.width || 150);
  const [height, setHeight] = useState(data.height || 80);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(data?.formData || {});
  const [dynamicFields, setDynamicFields] = useState(data?.dynamicFields || []);

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { title, width, height, formData, dynamicFields } }
          : node
      )
    );
  }, [title, width, height, formData, dynamicFields, id, setNodes]);

  useEffect(() => {
    if (selected && titleRef.current) {
      titleRef.current.focus();
    }
  }, [selected]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

      <textarea
        ref={titleRef}
        value={title}
        onChange={handleTitleChange}
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "center",
          outline: "none",
          cursor: "text",
          width: "100%",
          padding: "5px",
          border: "none",
          resize: "none",
          background: "transparent",
        }}
      />

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
            handleChange={() => {}}
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
      <Handle type="target" position={Position.Left} isConnectable />
    </div>
  );
};

export default CustomNode;

import React, { useState, useEffect } from "react";
import { Handle, Position, NodeResizer, useReactFlow } from "@xyflow/react";

const CustomNode = ({ id, data, selected }) => {
  const { setNodes } = useReactFlow();
  const [label, setLabel] = useState(data.label);
  const [width, setWidth] = useState(data.width || 150);
  const [height, setHeight] = useState(data.height || 80);

  // Sync size with ReactFlow state
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label, width, height } }
          : node
      )
    );
  }, [label, width, height, id, setNodes]);

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
      {/* Node Resizer: Only visible when node is selected */}
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
          width: "100%", // Full width of node
          height: "100%", // Adjust height dynamically
          border: "none",
          textAlign: "center",
          fontSize: `${Math.max(12, width / 10)}px`, // Dynamic font size
          outline: "none",
          background: "transparent",
          overflow: "hidden",
          whiteSpace: "normal", // Allow text wrapping
          wordWrap: "break-word", // Prevent overflow
          resize: "none", // Disable manual resizing
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

    {/* Connection Handles */}
<Handle type="target" position={Position.Top} isConnectable={true} />
<Handle type="source" position={Position.Right} id="right" isConnectable={true} />
<Handle type="source" position={Position.Bottom} id="bottom" isConnectable={true} />

    </div>
  );
};

export default CustomNode;

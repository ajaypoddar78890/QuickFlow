import React from "react";
import { getBezierPath, EdgeLabelRenderer } from "@xyflow/react";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  setEdges, // ✅ Receive setEdges from props
}) => {
  // Generate a smooth Bezier path
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Function to remove the edge
  const removeEdge = () => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <>
      {/* Bezier Edge */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={style}
      />

      {/* Cross Button in the Middle of the Line */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%)`,
            left: labelX,
            top: labelY,
            zIndex: 10,
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "2px 4px",
            cursor: "pointer",
            fontSize: "12px",
            background: "red", // ✅ Improved visibility
          }}
          onClick={removeEdge} // ✅ Edge deletion works now
        >
          ❌
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;

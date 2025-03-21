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
  setEdges, // received via props
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const removeEdge = () => {
    setEdges((eds) => {
      console.log("Before:", eds);
      const updatedEdges = eds.filter((edge) => edge.id !== id);
      console.log("After:", updatedEdges);
      return updatedEdges;
    });
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%)`,
            left: labelX,
            top: labelY,
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "4px 6px",
            cursor: "pointer",
            fontSize: "12px",
            
            pointerEvents: "auto", // Ensuring clickability
          }}
          onClick={removeEdge}
        >
          ❌
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;

import React from "react";
import { getSmoothStepPath, EdgeLabelRenderer, BaseEdge } from "@xyflow/react";
import { MdDelete } from "react-icons/md";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  setEdges,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const removeEdge = () => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <>
      {/* Marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="15"
          refX="10"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="#0859FF" />
        </marker>
      </defs>

      {/* Edge path with arrow */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{
          stroke: "#0859FF",
          strokeWidth: 2,
          fill: "none", // make sure it's 'none' or it might fill the curve
          ...style,  
        }}
        markerEnd="url(#arrowhead)"
      />

      {/* Delete button */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%)`,
            marginRight: "-12px",
            left: labelX,
            top: labelY,
            cursor: "pointer",
            fontSize: "16px",
            color: "red",
            pointerEvents: "auto",
          }}
          onClick={removeEdge}
        >
          <MdDelete />
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;

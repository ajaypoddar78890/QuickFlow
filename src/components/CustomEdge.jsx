import React from "react";
import { getSmoothStepPath, EdgeLabelRenderer } from "@xyflow/react";
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

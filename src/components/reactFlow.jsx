import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import CustomNode from "./customnode"; // Import custom node
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  customNode: CustomNode,
};

const initialNodes = [
  {
    id: "1",
    type: "customNode",
    position: { x: 250, y: 150 },
    data: { label: "Start Node" },
  },
];

const ReactFlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeId, setNodeId] = useState(2);

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      if (!sourceNode) return;

      // If the target node exists, simply connect them without creating a new node
      if (targetNode) {
        const newEdge = {
          id: `e${params.source}-${params.target}`,
          source: params.source,
          sourceHandle: params.sourceHandle,
          target: params.target,
          targetHandle: params.targetHandle,
          animated: true,
          style: { stroke: "#007bff", strokeWidth: 2 },
        };

        setEdges((eds) => addEdge(newEdge, eds));
        return;
      }

      // Otherwise, create a new node and connect it
      const newNodeId = `${nodeId}`;

      let newPosition = {
        x: sourceNode.position.x,
        y: sourceNode.position.y + 120,
      };

      if (params.sourceHandle === "right") {
        newPosition = {
          x: sourceNode.position.x + 150,
          y: sourceNode.position.y,
        };
      }

      const newNode = {
        id: newNodeId,
        type: "customNode",
        position: newPosition,
        data: { label: `Node ${newNodeId}` },
      };

      setNodes((nds) => [...nds, newNode]);

      const newEdge = {
        id: `e${params.source}-${newNodeId}`,
        source: params.source,
        sourceHandle: params.sourceHandle,
        target: newNodeId,
        animated: true,
        style: { stroke: "#007bff", strokeWidth: 2 },
      };

      setEdges((eds) => addEdge(newEdge, eds));
      setNodeId((prev) => prev + 1);
    },
    [nodes, setNodes, setEdges, nodeId]
  );

  // Function to add a new node when button is clicked
  const addNewNode = () => {
    const newNodeId = `${nodeId}`;

    const newNode = {
      id: newNodeId,
      type: "customNode",
      position: { x: Math.random() * 600, y: Math.random() * 400 }, // Randomized position
      data: { label: `Node ${newNodeId}` },
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeId((prev) => prev + 1);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Button to Add New Node */}
      <button
        onClick={addNewNode}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Add Node
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes} // Register custom node
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid={true} // Enables grid snapping
        snapGrid={[20, 20]} // Grid size
        connectionLineType="smoothstep" // Makes connections smooth
      >
        <MiniMap />
        <Controls />
        <Background gap={20} variant="dots" /> {/* Adds grid background */}
      </ReactFlow>
    </div>
  );
};

export default ReactFlowComponent;

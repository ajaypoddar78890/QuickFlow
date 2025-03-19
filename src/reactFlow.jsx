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
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "default",
    position: { x: 250, y: 150 },
    data: { label: "Start Node" },
  },
];

const ReactFlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeId, setNodeId] = useState(2); // Unique ID counter for new nodes

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      if (!sourceNode) return;

      const newNodeId = `${nodeId}`;

      // Determine new node position based on the handle used
      let newPosition = {
        x: sourceNode.position.x,
        y: sourceNode.position.y + 120, // Default: Bottom
      };

      if (params.sourceHandle === "right") {
        newPosition = {
          x: sourceNode.position.x + 150, // Place it to the right
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

      // Ensure correct handle mapping
      const newEdge = {
        id: `e${params.source}-${newNodeId}`,
        source: params.source,
        sourceHandle: params.sourceHandle, // Ensure it's mapped correctly
        target: newNodeId,
        animated: true,
        style: { stroke: "#007bff", strokeWidth: 2 },
      };

      setEdges((eds) => addEdge(newEdge, eds));
      setNodeId((prev) => prev + 1);
    },
    [nodes, setNodes, setEdges, nodeId]
  );

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect} // Triggers when an edge is dropped
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowComponent;

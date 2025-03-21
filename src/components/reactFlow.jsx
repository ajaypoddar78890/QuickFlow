import React, { useCallback, useState, useMemo, useEffect } from "react";
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
import CustomEdge from "./CustomEdge";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  customNode: CustomNode,
};

// Function to get saved data from localStorage
const getSavedData = () => {
  const savedData = localStorage.getItem("reactFlowData");
  return savedData ? JSON.parse(savedData) : null;
};

const ReactFlowComponent = () => {
  // Load saved data if available, otherwise set default nodes and edges
  const savedData = getSavedData();
  const [nodes, setNodes, onNodesChange] = useNodesState(
    savedData?.nodes || [
      {
        id: "1",
        type: "customNode",
        position: { x: 250, y: 150 },
        data: { label: "Start Node" },
      },
    ]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    savedData?.edges || []
  );
  const [nodeId, setNodeId] = useState(savedData?.nodeId || 2);

  // ✅ Move edgeTypes inside the component
  const edgeTypes = useMemo(
    () => ({
      custom: (edgeProps) => <CustomEdge {...edgeProps} setEdges={setEdges} />,
    }),
    [setEdges]
  );

  // 🔴 Save data to localStorage whenever nodes, edges, or nodeId change
  useEffect(() => {
    const dataToSave = JSON.stringify({ nodes, edges, nodeId });
    localStorage.setItem("reactFlowData", dataToSave);
  }, [nodes, edges, nodeId]);

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      if (!sourceNode) return;

      if (targetNode) {
        const newEdge = {
          id: `e${params.source}-${params.target}`,
          source: params.source,
          sourceHandle: params.sourceHandle,
          target: params.target,
          targetHandle: params.targetHandle,
          animated: true,
          style: { stroke: "#007bff", strokeWidth: 2 },
          type: "custom",
        };
        setEdges((eds) => addEdge(newEdge, eds));
        return;
      }

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
        data: { label: `Node ${newNodeId}` }, // Form data will be saved here
      };

      setNodes((nds) => [...nds, newNode]);

      const newEdge = {
        id: `e${params.source}-${newNodeId}`,
        source: params.source,
        sourceHandle: params.sourceHandle,
        target: newNodeId,
        animated: true,
        style: { stroke: "#007bff", strokeWidth: 2 },
        type: "custom",
      };

      setEdges((eds) => addEdge(newEdge, eds));
      setNodeId((prev) => prev + 1);
    },
    [nodes, setNodes, setEdges, nodeId]
  );

  const addNewNode = () => {
    const newNodeId = `${nodeId}`;
    const newNode = {
      id: newNodeId,
      type: "customNode",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: `Node ${newNodeId}` }, // Form data is stored in `data`
    };

    setNodes((nds) => [...nds, newNode]);
    setNodeId((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden pl-20">
      <div className="w-[80vw] h-[90vh] border border-gray-300 rounded-lg shadow-lg relative flex flex-col">
        {/* Centered Toolbar */}
        <div className="w-full h-16 bg-gray-400 flex items-center justify-start rounded-t-lg">
          <button
            onClick={addNewNode}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition-all"
          >
            Add Node
          </button>
        </div>

        {/* ReactFlow Canvas */}
        <div className="flex-grow">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            snapToGrid={true}
            snapGrid={[20, 20]}
            connectionLineType="smoothstep"
            className="w-full h-full"
          >
            <MiniMap />
            <Controls />
            <Background gap={20} variant="dots" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};  

export default ReactFlowComponent;

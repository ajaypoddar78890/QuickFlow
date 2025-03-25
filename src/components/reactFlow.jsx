import React, { useCallback, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import CustomNode from "./customnode";
import CustomEdge from "./CustomEdge";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  customNode: CustomNode,
};

const getSavedData = () => {
  const savedData = localStorage.getItem("reactFlowData");
  if (!savedData) return null;
  return JSON.parse(savedData);
};

const ReactFlowComponent = () => {
  const savedData = getSavedData();
  const [nodes, setNodes, onNodesChange] = useNodesState(
    savedData?.nodes?.length > 0
      ? savedData.nodes
      : [
          {
            id: uuidv4(),
            type: "customNode",
            position: { x: 250, y: 150 },
            data: { label: "Start Node" },
          },
        ]
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    savedData?.edges || []
  );

  const edgeTypes = useMemo(
    () => ({
      custom: (edgeProps) => <CustomEdge {...edgeProps} setEdges={setEdges} />,
    }),
    [setEdges]
  );

  useEffect(() => {
    const dataToSave = JSON.stringify({ nodes, edges });
    localStorage.setItem("reactFlowData", dataToSave);
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      if (!sourceNode) return;

      if (targetNode) {
        const newEdge = {
          id: uuidv4(),
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

      const newNodeId = uuidv4();
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
        data: {
          label: "Node",
          details: `Details for ${newNodeId}`,
          formData: { name: "", phone: "" }, // ✅ Added formData
        },
      };

      setNodes((nds) => [...nds, newNode]);

      const newEdge = {
        id: uuidv4(),
        source: params.source,
        sourceHandle: params.sourceHandle,
        target: newNodeId,
        animated: true,
        style: { stroke: "#007bff", strokeWidth: 2 },
        type: "custom",
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [nodes, setNodes, setEdges]
  );

  const addNewNode = () => {
    const newNodeId = uuidv4();
    console.log("New Node UUID:", newNodeId); // Log each new UUID

    const newNode = {
      id: newNodeId,
      type: "customNode",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: {
        label: "Node",
        details: `Details for ${newNodeId}`,
        formData: { name: "", phone: "" }, // ✅ Added formData
      },
    };

    setNodes((nds) => [...nds, newNode]);

    localStorage.setItem(
      "reactFlowData",
      JSON.stringify({ nodes: [...nodes, newNode], edges })
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden pl-20">
      <div className="w-[80vw] h-[90vh] border border-gray-300 rounded-lg shadow-lg relative flex flex-col">
        <div className="w-full h-16 bg-gray-400 flex items-center justify-start rounded-t-lg">
          <button
            onClick={addNewNode}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition-all"
          >
            Add Node
          </button>
        </div>

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

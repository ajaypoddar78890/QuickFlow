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
  useReactFlow,
  MarkerType,
} from "@xyflow/react";
import CustomNode from "./customnode";
import CustomEdge from "./CustomEdge";
import "@xyflow/react/dist/style.css";
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";

// ✅ nodeTypes updated to pass addNewNode to CustomNode
const getSavedData = () => {
  const savedData = localStorage.getItem("reactFlowData");
  return savedData ? JSON.parse(savedData) : null;
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

  const { setViewport, getZoom } = useReactFlow();

  const addNewNode = useCallback(() => {
    const newNodeId = uuidv4();

    const lastNode = nodes[nodes.length - 1];
    const defaultPosition = { x: 100, y: 100 };

    const newPosition = lastNode
      ? { x: lastNode.position.x + 200, y: lastNode.position.y + 100 }
      : defaultPosition;

    const newNode = {
      id: newNodeId,
      type: "customNode",
      position: newPosition,
      data: {
        label: "Node",
        details: `Details for ${newNodeId}`,
        formData: { name: "", phone: "" },
      },
    };

    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    localStorage.setItem(
      "reactFlowData",
      JSON.stringify({ nodes: updatedNodes, edges })
    );
  }, [nodes, edges, setNodes]);

  // ✅ nodeTypes setup with prop passing
  const nodeTypes = useMemo(
    () => ({
      customNode: (nodeProps) => (
        <CustomNode {...nodeProps} addNewNode={addNewNode} />
      ),
    }),
    [addNewNode]
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
          animated: false,
          style: { stroke: "8a8a87", strokeWidth: 2 },
          type: "custom",
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };

        setEdges((eds) => addEdge(newEdge, eds));

        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === params.source
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    connectedTo: [
                      ...(node.data.connectedTo || []),
                      params.target,
                    ],
                  },
                }
              : node.id === params.target
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    connectedTo: [
                      ...(node.data.connectedTo || []),
                      params.source,
                    ],
                  },
                }
              : node
          )
        );

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
          formData: { name: "", phone: "" },
          connectedTo: [params.source],
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
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [nodes, setNodes, setEdges]
  );

  const handleZoom = (zoomType) => {
    const currentZoom = getZoom();
    let newZoom = zoomType === "in" ? currentZoom * 1.2 : currentZoom / 1.2;
    newZoom = Math.max(0.5, Math.min(2.5, newZoom));
    setViewport({ x: 0, y: 0, zoom: newZoom }, { duration: 300 });
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden pl-20 z-10">
      <div className="w-[80vw] h-[90vh] border border-gray-300 rounded-lg shadow-lg relative flex flex-col">
        <div className="w-full h-16 bg-gray-400 flex items-center justify-between px-4 rounded-t-lg">
          <button
            onClick={addNewNode}
            className="bg-black text-white px-4 py-2 rounded-md shadow-lg"
          >
            Add Node
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => handleZoom("in")}
              className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg hover:bg-gray-900 transition-all flex items-center gap-2"
            >
              <FaSearchPlus /> Zoom In
            </button>
            <button
              onClick={() => handleZoom("out")}
              className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg hover:bg-gray-900 transition-all flex items-center gap-2"
            >
              <FaSearchMinus /> Zoom Out
            </button>
          </div>
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
            className="w-full h-full bg-green-400"
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

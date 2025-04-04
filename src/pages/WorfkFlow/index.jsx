import React, { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  useEdgesState,
  useNodesState,
  Panel,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { Popover, IconButton, Slider, TextField } from "@mui/material";
import {
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Description,
} from "@mui/icons-material";
import { CircleNode } from "../../components/CircleNode";
import { RectNode } from "../../components/RectNode";
import { useNavigate } from "react-router";
import CustomButton from "../../components/CustomButton";

const nodeTypes = {
  circle: CircleNode,
  rect: RectNode,
};

const WorkFlowInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: "1", type: "circle", data: { label: "Start", color: "#8BA446", onAdd: handleOpen }, position: { x: 250, y: 50 } },
    { id: "2", type: "circle", data: { label: "End", color: "#E94E41", onAdd: handleOpen }, position: { x: 250, y: 400 } },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    { id: "e1-2", source: "1", target: "2", animated: true },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentParent, setCurrentParent] = useState(null);
  const [idCounter, setIdCounter] = useState(3);
  const { zoomIn, zoomOut, setViewport, getZoom } = useReactFlow();
  const [zoomLevel, setZoomLevel] = useState(getZoom());
  const [history, setHistory] = useState({
    past: [],
    present: { nodes, edges },
    future: [],
  });
  const navigate = useNavigate();

  // History management functions
  const saveToHistory = useCallback(() => {
    setHistory((prev) => ({
      past: [...prev.past, prev.present],
      present: { nodes, edges },
      future: [],
    }));
  }, [nodes, edges]);

  const undo = useCallback(() => {
    if (history.past.length === 0) return;

    const newPresent = history.past[history.past.length - 1];
    setHistory((prev) => ({
      past: prev.past.slice(0, -1),
      present: newPresent,
      future: [prev.present, ...prev.future],
    }));

    setNodes(newPresent.nodes);
    setEdges(newPresent.edges);
  }, [history, setNodes, setEdges]);

  const redo = useCallback(() => {
    if (history.future.length === 0) return;

    const newPresent = history.future[0];
    setHistory((prev) => ({
      past: [...prev.past, prev.present],
      present: newPresent,
      future: prev.future.slice(1),
    }));

    setNodes(newPresent.nodes);
    setEdges(newPresent.edges);
  }, [history, setNodes, setEdges]);

  // Zoom control function for the slider
  const handleZoomChange = (_, newValue) => {
    setZoomLevel(newValue);
    setViewport((prev) => ({
      ...prev,
      zoom: newValue,
    }));
  };

  // Sync zoom level with React Flow's internal state
  const handleZoomInteraction = useCallback(() => {
    const currentZoom = getZoom();
    setZoomLevel(currentZoom);
  }, [getZoom]);

  function handleOpen(event, parentId) {
    setAnchorEl(event.currentTarget);
    setCurrentParent(parentId);
  }

  function handleClose() {
    setAnchorEl(null);
    setCurrentParent(null);
  }

  function handleDeleteNode(nodeId) {
    saveToHistory();
    const nodeToDelete = nodes.find((n) => n.id === nodeId);
    if (!nodeToDelete) return;

    const incomingEdge = edges.find((e) => e.target === nodeId);
    const outgoingEdge = edges.find((e) => e.source === nodeId);

    if (incomingEdge && outgoingEdge) {
      const newEdgeId = `e${incomingEdge.source}-${outgoingEdge.target}`;
      setNodes(nodes.filter((n) => n.id !== nodeId));
      setEdges((edges) => [
        ...edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
        { id: newEdgeId, source: incomingEdge.source, target: outgoingEdge.target, animated: true },
      ]);
    }
  }

  function handleAdd(type) {
    if (!currentParent) return;
    saveToHistory();

    const newNodeId = `${idCounter}`;
    setIdCounter(idCounter + 1);

    const parentNode = nodes.find((node) => node.id === currentParent);
    const endNode = nodes.find((node) => node.id === "2");

    const currentEdgeFromParent = edges.find((edge) => edge.source === currentParent);
    const targetNodeId = currentEdgeFromParent ? currentEdgeFromParent.target : null;

    let insertPosition;
    if (targetNodeId === "2") {
      const yPos = (parentNode.position.y + endNode.position.y) / 2;
      insertPosition = { x: 250, y: yPos };

      const updatedNodes = nodes.map((node) => {
        if (node.id === "2") {
          return { ...node, position: { x: 250, y: endNode.position.y + 100 } };
        }
        return node;
      });

      const newNode = {
        id: newNodeId,
        type: "rect",
        data: { label: type, onAdd: handleOpen, onDelete: handleDeleteNode },
        position: insertPosition,
      };

      setNodes([...updatedNodes, newNode]);
      setEdges((eds) => [
        ...eds.filter((edge) => edge.source !== currentParent || edge.target !== "2"),
        { id: `e${currentParent}-${newNodeId}`, source: currentParent, target: newNodeId, animated: true },
        { id: `e${newNodeId}-2`, source: newNodeId, target: "2", animated: true },
      ]);
    } else if (targetNodeId) {
      const targetNode = nodes.find((node) => node.id === targetNodeId);
      const yPos = (parentNode.position.y + targetNode.position.y) / 2;
      insertPosition = { x: 250, y: yPos };

      const nodesToShift = nodes.filter((node) => node.position.y >= insertPosition.y && node.id !== currentParent);
      const updatedNodes = nodes.map((node) => {
        if (nodesToShift.find((n) => n.id === node.id)) {
          return { ...node, position: { x: node.position.x, y: node.position.y + 100 } };
        }
        return node;
      });

      const newNode = {
        id: newNodeId,
        type: "rect",
        data: { label: type, onAdd: handleOpen, onDelete: handleDeleteNode },
        position: insertPosition,
      };

      setNodes([...updatedNodes, newNode]);
      setEdges((eds) => [
        ...eds.filter((edge) => edge.source !== currentParent),
        { id: `e${currentParent}-${newNodeId}`, source: currentParent, target: newNodeId, animated: true },
        { id: `e${newNodeId}-${targetNodeId}`, source: newNodeId, target: targetNodeId, animated: true },
      ]);
    } else {
      insertPosition = { x: 250, y: parentNode.position.y + 100 };
      const updatedNodes = nodes.map((node) => {
        if (node.id === "2") {
          return { ...node, position: { x: 250, y: endNode.position.y + 100 } };
        }
        return node;
      });

      const newNode = {
        id: newNodeId,
        type: "rect",
        data: { label: type, onAdd: handleOpen, onDelete: handleDeleteNode },
        position: insertPosition,
      };

      setNodes([...updatedNodes, newNode]);
      setEdges((eds) => [
        ...eds,
        { id: `e${currentParent}-${newNodeId}`, source: currentParent, target: newNodeId, animated: true },
        { id: `e${newNodeId}-2`, source: newNodeId, target: "2", animated: true },
      ]);
    }

    handleClose();
  }

  const handleSave = () => {};

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#F7F3E7" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        style={{ background: "#F7F3E7", zIndex: "0" }}
        onZoom={handleZoomInteraction} // Sync zoom level on user interaction
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            zIndex: 10,
            borderRadius: "5px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            margin: "20px",
          }}
        >
          <CustomButton
            onClick={() => navigate(-1)}
            children="< - Go Back"
            sx={{ border: "none", color: "#000", textDecoration: "underline", fontWeight: "bold" }}
          />
          <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            defaultValue="Untitled"
            size="small"
            variant="filled"
            sx={{
              "& .MuiInputBase-root": { border: "none" },
              "& .MuiFilledInput-root": {
                backgroundColor: "transparent",
                "&:before, &:after": { display: "none" },
              },
            }}
          />
          <IconButton style={{ marginLeft: 8, color: "#FBDC00" }} onClick={handleSave}>
            <Description />
          </IconButton>
        </div>

        <Background color="#000" gap={16} />

        <Panel position="bottom-left" style={{ margin: 100 }}>
          <div style={{ backgroundColor: "white", borderRadius: "4px", padding: "5px", display: "flex" }}>
            <IconButton onClick={undo} disabled={history.past.length === 0}>
              <Undo />
            </IconButton>
            <IconButton onClick={redo} disabled={history.future.length === 0}>
              <Redo />
            </IconButton>
          </div>
        </Panel>

        <Panel position="bottom-right" style={{ marginBottom: 100 }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              width: "250px",
            }}
          >
            <IconButton size="small" onClick={() => zoomOut({ duration: 200 })}>
              <ZoomOut />
            </IconButton>
            <Slider
              min={0.1}
              max={2}
              step={0.1}
              value={zoomLevel}
              onChange={handleZoomChange}
              aria-labelledby="zoom-slider"
              style={{ margin: "0 10px", flexGrow: 1 }}
            />
            <IconButton size="small" onClick={() => zoomIn({ duration: 200 })}>
              <ZoomIn />
            </IconButton>
          </div>
        </Panel>
      </ReactFlow>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ margin: "20px" }}
      >
        <div style={{ padding: 10, display: "flex", gap: 10 }}>
          <CustomButton onClick={() => handleAdd("API Call")} children="API" sx={{ color: "#000", fontWeight: "bold" }} />
          <CustomButton onClick={() => handleAdd("Text Box")} children="Text Box" sx={{ color: "#000", fontWeight: "bold" }} />
          <CustomButton onClick={() => handleAdd("Email")} children="Email" sx={{ color: "#000", fontWeight: "bold" }} />
        </div>
      </Popover>
    </div>
  );
};

const WorkFlow = () => (
  <ReactFlowProvider>
    <WorkFlowInner />
  </ReactFlowProvider>
);

export default WorkFlow;
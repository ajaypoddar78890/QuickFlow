import { useRef } from "react";
import { Toaster } from "sonner";
import "./App.css";

import ReactFlow from "./components/reactFlow";
import Sidebar from "./components/sidebar";

function App() {
  const flowRef = useRef(null);
  return (
    <div className="flex h-screen">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1D8E30",
            color: "#FFFFFF",  
            fontSize: "18px",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      />
      <Sidebar flowRef={flowRef} />
      <div ref={flowRef} className="react-flow w-full h-screen ">
        <ReactFlow />
      </div>
    </div>
  );
}

export default App;

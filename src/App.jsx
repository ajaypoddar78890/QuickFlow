import { useRef } from "react";
import "./App.css";

import ReactFlow from "./components/reactFlow";
import Sidebar from "./components/sidebar";

function App() {
  const flowRef = useRef(null);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div ref={flowRef} className="w-full h-screen bg-white">
        <ReactFlow />
      </div>
    </div>
  );
}

export default App;

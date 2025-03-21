import { useRef } from "react";
import "./App.css";

import ReactFlow from "./components/reactFlow";
import Sidebar from "./components/sidebar";

function App() {
  const flowRef = useRef(null);
  return (
    <div className="flex h-screen">
      <Sidebar flowRef={flowRef} />
      <div ref={flowRef} className="react-flow w-full h-screen ">
        <ReactFlow />
      </div>
    </div>
  );
}

export default App;

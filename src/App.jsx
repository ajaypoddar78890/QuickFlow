import "./App.css";
import ReactFlow from "./components/reactFlow";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <ReactFlow />
      </div>
    </div>
  );
}

export default App;

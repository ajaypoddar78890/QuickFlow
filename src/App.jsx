import "./App.css";
import ReactFlow from "./components/reactFlow";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className=" ">
        <ReactFlow />
      </div>
    </div>
  );
}

export default App;

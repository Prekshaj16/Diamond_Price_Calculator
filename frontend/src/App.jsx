import { useState } from "react";
import DiamondTable from "./components/DiamondTable";
import PriceCalculator from "./components/PriceCalculator";
import HistoryTable from "./components/HistoryTable";

function App() {
  const [history, setHistory] = useState([]); // shared history
  const [activeTab, setActiveTab] = useState("calculator");

  return (
    <div>
      <h1>Diamond Price Calculator</h1>

      {/* 🔹 Tabs */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("calculator")}>Calculator</button>
        <button onClick={() => setActiveTab("history")}>History</button>
        <button onClick={() => setActiveTab("list")}>Diamond List</button>
      </div>

      {/* 🔹 Conditional Rendering */}
      {activeTab === "calculator" && <PriceCalculator history={history} setHistory={setHistory} />}
      {activeTab === "history" && <HistoryTable history={history} setHistory={setHistory} />}
      {activeTab === "list" && <DiamondTable />}
    </div>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import List from "./List";
import AddFees from "./AddFees";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Fees Management Application</h2>
      </div>
      <Routes>
        <Route path="/" element={<AddFees />} />
        <Route path="/list" element={<List />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

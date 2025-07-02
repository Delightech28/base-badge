import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar"; // <- new
import "./index.css"; // <- for background styling
import { useTokenBalance } from "./hooks/useTokenBalance";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { hasBalance } = useTokenBalance();

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <Router>
      <div className="background-circles">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={hasBalance ? <Dashboard /> : <Welcome />} />
        <Route path="/profile" element={<Dashboard initialTab="profile" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

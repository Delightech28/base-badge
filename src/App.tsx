import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import "./index.css";
import { useTokenBalance } from "./hooks/useTokenBalance";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useConnect } from "wagmi";

function App() {
  const { hasBalance } = useTokenBalance();
  const { connect, connectors } = useConnect();

  const handleConnect = () => {
    connect({ connector: connectors[0] });
  };

  useEffect(() => {
    const initializeMiniApp = async () => {
      await sdk.actions.ready();
    };
    initializeMiniApp();
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
        <Route path="/" element={hasBalance ? <Dashboard /> : <Welcome onConnect={handleConnect} />} />
        <Route path="/profile" element={<Dashboard initialTab="profile" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

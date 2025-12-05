import { useEffect } from "react";
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
    let cancelled = false;

    const callReady = async () => {
      try {
        // Dynamically import the SDK so we don't fail if the host injects it later
        const mod = await import("@farcaster/miniapp-sdk");
        const sdk = (mod as any).sdk;

        if (sdk && sdk.actions && typeof sdk.actions.ready === "function") {
          await sdk.actions.ready();
          return;
        }

        // Fallback: poll for sdk availability for a short period
        const start = Date.now();
        while (!cancelled && Date.now() - start < 5000) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 200));
          if ((mod as any).sdk && (mod as any).sdk.actions && typeof (mod as any).sdk.actions.ready === "function") {
            await (mod as any).sdk.actions.ready();
            return;
          }
        }
      } catch (err) {
        // ignore - host may not provide the SDK in non-miniapp contexts
      }
    };

    callReady();

    return () => {
      cancelled = true;
    };
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

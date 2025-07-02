import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar"; // <- new
import "./index.css"; // <- for background styling
import { useTokenBalance } from "./hooks/useTokenBalance";
import Dashboard from "./components/Dashboard";

function App() {
  const { hasBalance } = useTokenBalance();

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <>
      <div className="background-circles">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
      <Navbar />
      {hasBalance ? (
        <Dashboard />
      ) : (
        <Welcome />
      )}
    </>
  );
}

export default App;

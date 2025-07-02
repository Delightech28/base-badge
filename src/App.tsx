import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar"; // <- new
import "./index.css"; // <- for background styling
import { useTokenBalance } from "./hooks/useTokenBalance";

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
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10 text-white">
          <h2 className="text-2xl font-semibold mb-4">You already hold $BLOOM!</h2>
          <p className="text-lg">You're eligible for the Founder NFT. Stay tuned!</p>
        </div>
      ) : (
        <Welcome />
      )}
    </>
  );
}

export default App;

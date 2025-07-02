import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar"; // <- new
import "./index.css"; // <- for background styling
import { useAccount } from "wagmi";
import { useTokenBalance } from "./hooks/useTokenBalance";

function App() {
  const { hasBalance } = useTokenBalance();
  const [showConnectPrompt, setShowConnectPrompt] = useState(false);
  const { address } = useAccount();
  const [navStack, setNavStack] = useState<string[]>(["welcome"]);

  // Navigation helpers
  const goTo = (page: string) => setNavStack((stack) => [...stack, page]);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Automatically show correct section after connecting
  useEffect(() => {
    if (address && showConnectPrompt) {
      setShowConnectPrompt(false);
      if (hasBalance) {
        goTo("swap");
      } else {
        goTo("buy");
      }
    }
  }, [address, hasBalance, showConnectPrompt]);

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
        <Welcome onConnect={() => setShowConnectPrompt(true)} />
      )}
    </>
  );
}

export default App;

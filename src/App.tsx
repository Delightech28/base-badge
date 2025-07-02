import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar"; // <- new
import "./index.css"; // <- for background styling
import SwapToBloom from "./components/SwapToBloom";
import ConnectWallet from "./components/ConnectWallet";
import { useAccount } from "wagmi";
import { useTokenBalance } from "./hooks/useTokenBalance";

function App() {
  const { hasBalance } = useTokenBalance();
  const [showConnectPrompt, setShowConnectPrompt] = useState(false);
  const { address } = useAccount();
  const [navStack, setNavStack] = useState<string[]>(["welcome"]);

  // Navigation helpers
  const goTo = (page: string) => setNavStack((stack) => [...stack, page]);
  const goBack = () => setNavStack((stack) => (stack.length > 1 ? stack.slice(0, -1) : stack));
  const currentPage = navStack[navStack.length - 1];

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
      {showConnectPrompt && !address && currentPage === "connect" ? (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10 text-white">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto text-center">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-600">Connect your wallet</h2>
              <button className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300" onClick={goBack} aria-label="Back">→</button>
            </div>
            <ConnectWallet />
          </div>
        </div>
      ) : currentPage === "swap" ? (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10 text-white">
          <SwapToBloom onBack={goBack} />
        </div>
      ) : currentPage === "buy" ? (
        hasBalance ? (
          <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10 text-white">
            <SwapToBloom onBack={goBack} />
          </div>
        ) : (
          <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10 text-white">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Buy $BLOOM to get started
            </h2>
            <button
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              onClick={() => {
                if (!address) {
                  setShowConnectPrompt(true);
                  goTo("connect");
                } else {
                  goTo("swap");
                }
              }}
            >
              Buy $BLOOM
            </button>
          </div>
        )
      ) : (
        <Welcome onProceed={() => { hasBalance ? goTo("swap") : goTo("buy"); }} />
      )}
    </>
  );
}

export default App;

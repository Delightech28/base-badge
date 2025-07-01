import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar"; // <- new
import "./index.css"; // <- for background styling
import SwapToBloom from "./components/SwapToBloom";
import ConnectWallet from "./components/ConnectWallet";
import { useAccount } from "wagmi";

function App() {
  const [started, setStarted] = useState(false);
  // const { hasBalance } = useTokenBalance();
  const hasBalance = false; // TEMP: force buy section for all users
  const [showSwap, setShowSwap] = useState(false);
  const [showConnectPrompt, setShowConnectPrompt] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Automatically show swap after connecting if user does not have $BLOOM
  useEffect(() => {
    if (address && showConnectPrompt) {
      setShowConnectPrompt(false);
      if (!hasBalance) {
        setShowSwap(true);
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
      {showConnectPrompt && !address ? (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10 text-white">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Connect your wallet</h2>
            <ConnectWallet />
            <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300" onClick={() => setShowConnectPrompt(false)}>Cancel</button>
          </div>
        </div>
      ) : showSwap ? (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10 text-white">
          <SwapToBloom onBack={() => setShowSwap(false)} />
        </div>
      ) : started ? (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10 text-white">
          {hasBalance ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">You already hold $BLOOM!</h2>
              <p className="text-lg">You're eligible for the Founder NFT. Stay tuned!</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                Buy $BLOOM to get started
              </h2>
              <button
                className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                onClick={() => {
                  if (!address) {
                    setShowConnectPrompt(true);
                  } else {
                    setShowSwap(true);
                  }
                }}
              >
                Buy $BLOOM
              </button>
            </>
          )}
        </div>
      ) : (
        <Welcome onProceed={() => setStarted(true)} />
      )}
    </>
  );
}

export default App;

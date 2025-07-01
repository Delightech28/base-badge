import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar"; // <- new
import "./index.css"; // <- for background styling
import { useTokenBalance } from "./hooks/useTokenBalance";
import { FaRocket } from "react-icons/fa";

function App() {
  const [started, setStarted] = useState(false);
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
      {started ? (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative z-10 text-white">
  {hasBalance ? (
    <>
      <h2 className="text-2xl font-semibold mb-4">You already hold $BLOOM!</h2>
      <p className="text-lg">You're eligible for the Founder NFT. Stay tuned!</p>
    </>
  ) : (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
  Buy $BLOOM to get started <FaRocket />
</h2>
      <a
        href="https://app.uniswap.org/swap?chain=base&outputCurrency=0x14d1461e2a88929d9ac36c152bd54f58cb8095fe"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Buy $BLOOM
      </a>
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

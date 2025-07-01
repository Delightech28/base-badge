import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

import Header from "./components/Header";
import ConnectWallet from "./components/ConnectWallet";
import BuyToken from "./components/BuyToken";
import { useAccount } from "wagmi";

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-[#f5f0ec] text-gray-800 flex items-center justify-center">
      <div className="w-full max-w-sm p-6 rounded-2xl bg-white shadow-md">
        <Header />
        <ConnectWallet />
        {isConnected && <BuyToken />}
      </div>
    </div>
  );
}

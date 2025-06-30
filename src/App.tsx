import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";
import { useAccount, useConnect } from "wagmi";

export default function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0ec] text-gray-800 flex items-center justify-center">
      <div className="w-full max-w-sm p-6 rounded-2xl bg-white shadow-md">
        <Header />
        <ConnectMenu />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="text-center mb-6">
      <img
        src="/icon.png"
        alt="App Icon"
        className="w-16 h-16 mx-auto mb-2 rounded-full"
      />
      <h1 className="text-xl font-semibold">BaseBadge</h1>
      <p className="text-sm text-gray-500">Earn & Rise with $BADGE</p>
    </div>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <div className="text-center">
        <p className="text-sm mb-4 text-gray-600">
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </p>
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Buy Token (soon)
        </button>
        <p className="text-xs mt-2 text-gray-400">Founder NFT access coming soon</p>
      </div>
    );
  }

  return (
    <button
      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      onClick={() => connect({ connector: connectors[0] })}
    >
      Connect Wallet
    </button>
  );
}

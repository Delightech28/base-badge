import { useAccount, useConnect } from "wagmi";

export default function ConnectWallet() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <div className="text-center">
        {address && (
          <p className="text-sm mb-4 text-gray-600">
            Connected: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        )}
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

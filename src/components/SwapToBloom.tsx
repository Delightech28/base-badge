import { useState } from "react";
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { erc20Abi } from "viem";

// Uniswap V3 Router address on Base mainnet
const UNISWAP_V3_ROUTER = "0x327Df1E6de05895d2ab08513aaDD9313Fe505d86";
// BLOOM token address
const BLOOM_TOKEN = "0x14d1461e2a88929d9ac36c152bd54f58cb8095fe";
// BASE native token address for Uniswap (WETH on Base)
const BASE_TOKEN = "0x4200000000000000000000000000000000000006";
// USDC contract address on Base
const USDC_TOKEN = "0xd9aaEC86b65d86f6a7b5b1b0c42ffa531710b6ca";
const USDC_DECIMALS = 6;

// Minimal ABI for Uniswap V3 exactInputSingle
const uniswapV3RouterAbi = [
  {
    "inputs": [
      {
        "components": [
          { "internalType": "address", "name": "tokenIn", "type": "address" },
          { "internalType": "address", "name": "tokenOut", "type": "address" },
          { "internalType": "uint24", "name": "fee", "type": "uint24" },
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "uint256", "name": "deadline", "type": "uint256" },
          { "internalType": "uint256", "name": "amountIn", "type": "uint256" },
          { "internalType": "uint256", "name": "amountOutMinimum", "type": "uint256" },
          { "internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160" }
        ],
        "internalType": "struct ISwapRouter.ExactInputSingleParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "exactInputSingle",
    "outputs": [
      { "internalType": "uint256", "name": "amountOut", "type": "uint256" }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
];

export default function SwapToBloom({ onBack }: { onBack?: () => void }) {
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  // Get BASE balance
  const { data: baseBalance, isLoading: loadingBalance } = useBalance({
    address,
    chainId: 8453, // Base mainnet
    token: undefined, // native token
  });

  // Get USDC balance
  const { data: usdcRaw, isLoading: loadingUsdc } = useReadContract({
    address: USDC_TOKEN,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });
  const usdcBalance = usdcRaw ? (Number(usdcRaw) / 10 ** USDC_DECIMALS).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0";

  // Prepare contract write
  const { isPending, writeContract } = useWriteContract();

  // Wait for transaction receipt
  const { isLoading: txLoading, isSuccess: txSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleSwap = async () => {
    setError(null);
    try {
      const value = amount ? BigInt(Math.floor(Number(amount) * 1e18)) : 0n;
      const params = {
        tokenIn: BASE_TOKEN,
        tokenOut: BLOOM_TOKEN,
        fee: 500, // 0.05% pool fee
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 10, // 10 min from now
        amountIn: value,
        amountOutMinimum: 0n, // WARNING: set slippage in production
        sqrtPriceLimitX96: 0n,
      };
      const result: unknown = await writeContract({
        address: UNISWAP_V3_ROUTER,
        abi: uniswapV3RouterAbi,
        functionName: "exactInputSingle",
        args: [params],
        value,
      });
      if (typeof result === 'string' && result.startsWith('0x')) {
        setTxHash(result as `0x${string}`);
      } else {
        setError("Transaction did not return a valid string hash.");
      }
    } catch (err: any) {
      setError(err?.shortMessage || err?.message || "Transaction failed");
    }
  };

  const notEnoughBase =
    baseBalance && amount && Number(amount) > Number(baseBalance.formatted);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto mt-8 text-center">
      {onBack && (
        <button
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 float-left"
          onClick={onBack}
          aria-label="Back"
        >
          ←
        </button>
      )}
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Swap BASE for $BLOOM</h2>
      <div className="mb-2 text-gray-700">
        Your BASE balance: {loadingBalance ? "..." : baseBalance?.formatted || 0}
      </div>
      {address && (
        <div className="mb-2 text-gray-700">
          Your USDC balance: {loadingUsdc ? "..." : usdcBalance}
        </div>
      )}
      <input
        type="number"
        min="0"
        step="0.0001"
        placeholder="Amount of BASE to swap"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="border rounded px-4 py-2 mb-4 w-full text-black"
      />
      <button
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        onClick={handleSwap}
        disabled={
          !address ||
          !amount ||
          Number(amount) <= 0 ||
          notEnoughBase ||
          isPending ||
          txLoading
        }
      >
        {isPending || txLoading ? "Swapping..." : "Swap"}
      </button>
      {notEnoughBase && (
        <div className="text-red-500 mt-2">Not enough BASE balance.</div>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {txSuccess && txHash && (
        <div className="text-green-600 mt-2">
          Swap successful! <a href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="underline">View on BaseScan</a>
        </div>
      )}
    </div>
  );
} 
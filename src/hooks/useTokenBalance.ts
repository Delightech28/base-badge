import { useEffect, useState } from "react";
import { erc20Abi } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { formatUnits } from "viem";

const TOKEN_ADDRESS = "0x14d1461e2a88929d9ac36c152bd54f58cb8095fe"; // $BLOOM
const TOKEN_DECIMALS = 18;

export function useTokenBalance() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [balance, setBalance] = useState<null | string>(null);

  useEffect(() => {
    if (!address) return;

    const fetchBalance = async () => {
      try {
        const result = await publicClient.readContract({
          address: TOKEN_ADDRESS,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        });

        const formatted = formatUnits(result as bigint, TOKEN_DECIMALS);
        setBalance(formatted);
      } catch (err) {
        console.error("Failed to fetch token balance", err);
      }
    };

    fetchBalance();
  }, [address, publicClient]);

  return { balance, hasBalance: Number(balance) > 0 };
}

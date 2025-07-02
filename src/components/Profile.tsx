import { useAccount } from "wagmi";
import { useTokenBalance } from "../hooks/useTokenBalance";

const baseBlue = "#001f3f";

export default function Profile({ hasFounderNFT, founderMintDate, onBuyMore }: {
  hasFounderNFT: boolean;
  founderMintDate?: string;
  onBuyMore: () => void;
}) {
  const { address } = useAccount();
  const { balance } = useTokenBalance();
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "-";

  return (
    <div style={{ minHeight: "100vh", background: baseBlue, color: "white", padding: "2rem" }}>
      {/* User Info Section */}
      <div style={{ background: "white", color: baseBlue, borderRadius: 18, padding: 24, marginBottom: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Wallet</div>
        <div style={{ fontFamily: "monospace", fontSize: 16, marginBottom: 12 }}>{shortAddress}</div>
        <span style={{
          display: "inline-block",
          background: hasFounderNFT ? "#ffd700" : "#e0e7ef",
          color: hasFounderNFT ? baseBlue : baseBlue,
          borderRadius: 12,
          padding: "4px 16px",
          fontWeight: 600,
          fontSize: 15
        }}>
          {hasFounderNFT ? "👑 Founder" : "🌱 Member"}
        </span>
      </div>

      {/* NFTs/Badges Section */}
      <div style={{ background: "white", color: baseBlue, borderRadius: 18, padding: 24, marginBottom: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>NFTs & Badges</div>
        {hasFounderNFT ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="/founder-nft.png" alt="Founder Badge NFT" style={{ width: 80, height: 80, borderRadius: 16, marginBottom: 10, background: "#e0e7ef" }} />
            <div style={{ fontWeight: 600, fontSize: 16 }}>Founder Badge NFT</div>
            <div style={{ fontSize: 14, color: "#888", marginTop: 2 }}>Minted {founderMintDate || "recently"}</div>
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#e0e7ef",
            borderRadius: 16,
            padding: 24,
            minHeight: 120,
            marginTop: 8
          }}>
            <span style={{ fontSize: 48, color: baseBlue, opacity: 0.15, marginBottom: 8 }}>🎖</span>
            <div style={{ color: baseBlue, opacity: 0.7, fontSize: 16 }}>No NFT yet</div>
          </div>
        )}
      </div>

      {/* Token Holdings Section */}
      <div style={{ background: "white", color: baseBlue, borderRadius: 18, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>$BADGE Balance</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{Number(balance).toLocaleString(undefined, { maximumFractionDigits: 4 })}</div>
        <button
          style={{
            background: baseBlue,
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "10px 28px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          onClick={onBuyMore}
        >
          Buy More
        </button>
      </div>
    </div>
  );
} 
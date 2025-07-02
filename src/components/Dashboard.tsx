import { useAccount } from "wagmi";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useState } from "react";
import BottomNav from "./BottomNav";

// Base dark blue
const baseBlue = "#001f3f";

export default function Dashboard() {
  const { address } = useAccount();
  const { balance } = useTokenBalance();
  // Mock eligibility: early buyers or balance >= 1000
  const isFounderEligible = Number(balance) >= 1000;
  // Mock claim status
  const [claimed, setClaimed] = useState(false);
  // Bottom nav state
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: baseBlue,
        color: "white",
        padding: "2rem",
        transition: "background 0.5s"
      }}
    >
      <div
        style={{
          background: "white",
          color: baseBlue,
          borderRadius: 24,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "2.5rem 2rem 2rem 2rem",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          margin: "0 auto",
          transition: "box-shadow 0.3s"
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
          You're a $BADGE holder 🎉
        </h1>
        <div style={{ marginBottom: 18, fontSize: 16 }}>
          <span style={{ fontWeight: 500 }}>Wallet:</span>
          <br />
          <span style={{ fontFamily: "monospace", fontSize: 15 }}>{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "-"}</span>
        </div>
        <div style={{ marginBottom: 24, fontSize: 16 }}>
          <span style={{ fontWeight: 500 }}>$BADGE Balance:</span> {Number(balance).toLocaleString(undefined, { maximumFractionDigits: 4 })}
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}>Founder NFT</div>
          {isFounderEligible ? (
            claimed ? (
              <div style={{ color: "#2ecc40", fontWeight: 600 }}>Already Claimed</div>
            ) : (
              <button
                style={{
                  background: baseBlue,
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onClick={() => setClaimed(true)}
              >
                Mint Founder Badge
              </button>
            )
          ) : (
            <div style={{ color: "#888", fontWeight: 500 }}>
              Not eligible (hold at least 1,000 $BADGE to qualify)
            </div>
          )}
        </div>
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
} 
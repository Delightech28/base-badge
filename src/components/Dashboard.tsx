import { useAccount } from "wagmi";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useState } from "react";

// Base dark blue
const baseBlue = "#001f3f";

export default function Dashboard() {
  const { address } = useAccount();
  const { balance } = useTokenBalance();
  // Mock eligibility: early buyers or balance >= 1000
  const isFounderEligible = Number(balance) >= 1000;
  // Mock claim status
  const [claimed, setClaimed] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        background: baseBlue,
        color: "white",
        overflowY: "auto",
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
        <div style={{ marginTop: 32, textAlign: "left" }}>
          <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>Example Tasks (coming soon):</div>
          <ul style={{ paddingLeft: 20, color: baseBlue, opacity: 0.85, fontSize: 15 }}>
            <li>Complete an onchain quest</li>
            <li>Refer a friend to Base Badge</li>
            <li>Vote in a DAO proposal</li>
            <li>Mint a special NFT</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 
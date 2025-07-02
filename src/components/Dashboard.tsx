import { useAccount } from "wagmi";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useState, useEffect } from "react";
import BottomNav from "./BottomNav";
import Profile from "./Profile";

// Base dark blue
const baseBlue = "#001f3f";

// Mock: List of first 100 addresses (in a real app, fetch from backend or contract)
const founderAddresses: string[] = [
  // Add up to 100 addresses here for demo/testing
  // e.g. "0x123...", "0x456..."
];

export default function Dashboard() {
  const { address } = useAccount();
  const { balance } = useTokenBalance();
  const [claimed, setClaimed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Add address to founderAddresses if not present and list < 100 (mock logic)
  useEffect(() => {
    if (address && founderAddresses.length < 100 && !founderAddresses.includes(address)) {
      founderAddresses.push(address);
    }
  }, [address]);

  const isFounder = address ? founderAddresses.includes(address) : false;
  const founderFull = founderAddresses.length >= 100;

  // Handler for Buy More button in Profile
  const handleBuyMore = () => {
    // Implement navigation to buy page or show a message
    alert("Redirect to buy $BADGE page (not implemented)");
  };

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
      {activeTab === "profile" ? (
        <Profile hasFounderNFT={claimed} onBuyMore={handleBuyMore} />
      ) : (
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
            {isFounder ? (
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
            ) : founderFull ? (
              <div style={{ color: "#888", fontWeight: 500 }}>
                Founder Badge is no longer available.
              </div>
            ) : (
              <div style={{ color: "#888", fontWeight: 500 }}>
                Connect your wallet to see if you qualify.
              </div>
            )}
          </div>
        </div>
      )}
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
} 
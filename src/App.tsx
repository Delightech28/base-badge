import { useEffect } from "react";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import "./index.css";
import { useTokenBalance } from "./hooks/useTokenBalance";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useConnect } from "wagmi";

function App() {
  const { hasBalance } = useTokenBalance();
  const { connect, connectors } = useConnect();

  const handleConnect = () => {
    connect({ connector: connectors[0] });
  };

  useEffect(() => {
    let cancelled = false;

    const findSdkOnGlobal = () => {
      const g = globalThis as any;
      const candidates = [
        g.sdk,
        g.farcaster,
        g.farcasterSdk,
        g.frameSdk,
        g.farcasterFrame,
        g.__FARCASTER_SDK__,
      ];
      for (const c of candidates) {
        if (c && c.actions && typeof c.actions.ready === "function") return c;
      }
      return null;
    };

    const callReady = async () => {
      console.debug("[miniapp] attempting to initialize SDK at", new Date().toISOString());
      try {
        // Dynamically import the SDK module (may provide a proxy or the real SDK)
        const mod = await import("@farcaster/miniapp-sdk");
        const importedSdk = (mod as any).sdk;
        console.debug("[miniapp] imported sdk from module:", !!importedSdk);

        if (importedSdk && importedSdk.actions && typeof importedSdk.actions.ready === "function") {
          console.debug("[miniapp] calling ready() on imported sdk");
          await importedSdk.actions.ready();
          console.debug("[miniapp] ready() resolved (imported)");
          return;
        }

        // Poll for SDK injection from host (common in preview embeds)
        const start = Date.now();
        while (!cancelled && Date.now() - start < 10000) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 250));
          const globalSdk = findSdkOnGlobal();
          if (globalSdk) {
            console.debug("[miniapp] found SDK on globalThis, calling ready()");
            await globalSdk.actions.ready();
            console.debug("[miniapp] ready() resolved (global)");
            return;
          }
        }

        console.warn("[miniapp] sdk.actions.ready() was not available after polling");
      } catch (err) {
        console.error("[miniapp] error while initializing SDK:", err);
      }
    };

    callReady();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Router>
      <div className="background-circles">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={hasBalance ? <Dashboard /> : <Welcome onConnect={handleConnect} />} />
        <Route path="/profile" element={<Dashboard initialTab="profile" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

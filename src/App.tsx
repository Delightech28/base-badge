// src/App.tsx
import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";
import Welcome from "./components/Welcome";

function App() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <>
      {started ? (
        <div className="p-4">Token logic coming here...</div>
      ) : (
        <Welcome onProceed={() => setStarted(true)} />
      )}
    </>
  );
}

export default App;

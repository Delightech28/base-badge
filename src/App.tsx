import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar"; // <- new
import "./index.css"; // <- for background styling

function App() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <>
      <div className="background-circles">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
      <Navbar />
      {started ? (
        <div className="p-4 text-white relative z-10">Token logic coming here...</div>
      ) : (
        <Welcome onProceed={() => setStarted(true)} />
      )}
    </>
  );
}

export default App;

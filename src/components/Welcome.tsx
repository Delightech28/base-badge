// src/components/Welcome.tsx
import { motion } from "framer-motion";
import { FaRocket, FaStar, FaUserShield, FaWallet } from "react-icons/fa";

export default function Welcome({ onProceed }: { onProceed: () => void }) {
  return (
    <div className="min-h-screen bg-white/80 text-blue-600 flex flex-col justify-center items-center p-6 text-center relative z-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-4 flex items-center gap-2"
      >
        <FaUserShield className="text-blue-600 text-3xl" />
        Welcome to Base Badge
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg max-w-md"
      >
        Earn by buying <span className="font-semibold">$BADGE</span> and completing onchain tasks.
        Early buyers get the exclusive Founder NFT.
      </motion.p>

      <div className="flex gap-6 mt-6 text-2xl text-blue-500">
        <FaRocket title="Buy Token" />
        <FaStar title="Earn Rewards" />
        <FaUserShield title="Founder Badge" />
      </div>

      <motion.button
        onClick={() => onProceed()}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all cursor-pointer flex items-center gap-2 justify-center"
        whileTap={{ scale: 0.95 }}
      >
        <FaWallet className="text-lg" /> Connect Wallet
      </motion.button>
    </div>
  );
}



// src/components/Welcome.tsx
import { motion } from "framer-motion";

export default function Welcome({ onProceed }: { onProceed: () => void }) {
  return (
    <div className="min-h-screen bg-white text-blue-600 flex flex-col justify-center items-center p-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-4"
      >
        Welcome to Base Badge 🏅
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg max-w-md"
      >
        Earn by buying <span className="font-semibold">$BADGE</span> and completing onchain tasks.
        Early buyers get the exclusive Founder NFT 🔥
      </motion.p>
      <motion.button
        onClick={onProceed}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
        whileTap={{ scale: 0.95 }}
      >
        Let’s Go 🚀
      </motion.button>
    </div>
  );
}

// src/components/common/LoadingScreen.tsx
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#FFFBE6] flex items-center justify-center">
      <div className="text-center">
        {/* Logo Container */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 0, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-4"
        >
          <img 
            src="/logo1.png" 
            alt="Tadweer" 
            className="w-20 h-20 mx-auto"
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[#5F7053] font-medium"
        >
          <div className="flex items-center justify-center gap-2">
            <span>Loading</span>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex"
            >
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
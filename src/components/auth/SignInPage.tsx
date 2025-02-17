// src/components/auth/SignInPage.tsx
import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Recycle, Leaf, Droplet, TrendingUp } from 'lucide-react';

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-[#FFFBE6] flex">
      {/* Left Side - Sign In Form */}
      <div className="flex flex-col items-center justify-center w-full p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-8 lg:hidden"
          >
            <div className="relative">
              <img src="/logo1.png" alt="Tadweer" className="w-20 h-20" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-[#5F7053] tracking-wide">
                TADWEER
              </span>
              <div className="flex items-center gap-1 text-xs text-[#5F7053]/60">
                <Recycle className="w-3 h-3" />
                <span>Recycle for future</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "bg-white/80 backdrop-blur-sm shadow-xl p-8 rounded-2xl border border-white/20",
                  headerTitle: "text-2xl font-bold text-[#5F7053] text-center",
                  headerSubtitle: "text-[#5F7053]/70 text-center",
                  formButtonPrimary: "bg-[#5F7053] hover:bg-[#5F7053]/90 text-white transition-all duration-200 shadow-lg shadow-[#5F7053]/20",
                  formFieldLabel: "text-[#5F7053] font-medium",
                  formFieldInput: "border-[#5F7053]/20 focus:border-[#5F7053] focus:ring-[#5F7053] rounded-xl bg-white",
                  footerActionLink: "text-[#5F7053] hover:text-[#5F7053]/80 font-medium",
                  dividerLine: "bg-[#5F7053]/10",
                  dividerText: "text-[#5F7053]/60 bg-white px-2",
                  socialButtonsBlockButton: "border-[#5F7053]/20 hover:bg-[#5F7053]/5 rounded-xl",
                  socialButtonsBlockButtonText: "text-[#5F7053] font-medium",
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                  socialButtonsVariant: "blockButton",
                },
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#5F7053] to-[#3D4734] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Animated Background Elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 25}%`,
              opacity: 0.1
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {i % 3 === 0 ? <Leaf className="w-12 h-12 text-white" /> :
             i % 3 === 1 ? <Droplet className="w-12 h-12 text-white" /> :
             <Recycle className="w-12 h-12 text-white" />}
          </motion.div>
        ))}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 text-center"
        >
          {/* Logo with enhanced contrast */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 shadow-lg bg-white/90 rounded-2xl">
              <img 
                src="/logo1.png" 
                alt="Tadweer" 
                className="w-20 h-20"
              />
            </div>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-white">
            Transform Waste into Wealth
          </h2>
          <p className="max-w-md mx-auto mb-12 text-lg text-white/90">
            Join Tadweer's eco-friendly initiative to recycle used oil and earn rewards while contributing to a sustainable future.
          </p>

          {/* Enhanced Stats */}
          <div className="flex justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="w-5 h-5 text-white/80" />
                <h3 className="text-3xl font-bold text-white">100K+</h3>
              </div>
              <p className="text-white/80">Liters Recycled</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-white/80" />
                <h3 className="text-3xl font-bold text-white">25K+</h3>
              </div>
              <p className="text-white/80">CO<sub>2</sub> Saved</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_transparent_0%,_rgba(255,255,255,0.03)_100%)]" />
        <motion.div 
          className="absolute bottom-0 right-0 rounded-full w-96 h-96 bg-gradient-to-r from-white/10 to-transparent"
          style={{ filter: 'blur(40px)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

export default SignInPage;
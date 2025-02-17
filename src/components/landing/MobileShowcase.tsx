import { motion } from 'framer-motion';
import { 
  Leaf, 
  Bell,
  CalendarPlus,
  ChevronRight,
  Gift,
  TrendingUp,
  Download,
  AppleIcon,
  Smartphone
} from 'lucide-react';

const MobileShowcase = () => {
  // Keep existing decorative elements...

  return (
    <div className="relative">
      {/* Existing decorative elements... */}

      {/* Mobile Frame */}
      <div className="relative w-[300px] mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[1/2] bg-black rounded-[3rem] p-3 shadow-2xl"
        >
          {/* Screen Content */}
          <div className="relative bg-white w-full h-full rounded-[2.5rem] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 z-10 w-1/2 transform -translate-x-1/2 bg-black left-1/2 h-7 rounded-b-3xl" />
            
            {/* Status Bar */}
            <div className="bg-white h-7 flex items-center justify-between px-6 text-xs text-[#5F7053]">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span>4G</span>
                <span>100%</span>
              </div>
            </div>

            {/* App Content */}
            <div className="p-4">
              {/* App Header */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-6"
              >
                <div className="flex items-center gap-2">
                  <img src="/logo1.png" alt="Tadweer" className="w-16 h-16" />
                  <span className="text-[#5F7053] font-medium">Tadweer</span>
                </div>
                <div className="relative">
                  <Bell className="w-6 h-6 text-[#5F7053]" />
                  <span className="absolute w-2 h-2 bg-red-500 rounded-full -top-1 -right-1" />
                </div>
              </motion.div>

              {/* Welcome Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#5F7053] to-[#A9B388] text-white p-4 rounded-2xl mb-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 rounded-full bg-white/10" />
                <h3 className="mb-2 font-medium">Welcome Back, Ahmed!</h3>
                <p className="mb-3 text-sm opacity-90">You've recycled 12L this month</p>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+25% from last month</span>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-3 mb-4"
              >
                <button className="bg-[#FFFBE6] p-4 rounded-xl flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#5F7053]/10 flex items-center justify-center">
                    <CalendarPlus className="w-5 h-5 text-[#5F7053]" />
                  </div>
                  <span className="text-sm text-[#5F7053]">Schedule</span>
                </button>
                <button className="bg-[#FFFBE6] p-4 rounded-xl flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#5F7053]/10 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-[#5F7053]" />
                  </div>
                  <span className="text-sm text-[#5F7053]">Rewards</span>
                </button>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0}}
                  className="bg-[#FFFBE6] p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Gift className="w-5 h-5 text-[#C6822A]" />
                    <span className="text-xs text-[#5F7053]/70">This Month</span>
                  </div>
                  <p className="text-xl font-semibold text-[#C6822A]">150</p>
                  <p className="text-sm text-[#5F7053]">Points Earned</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0}}
                  className="bg-[#FFFBE6] p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Leaf className="w-5 h-5 text-[#5F7053]" />
                    <span className="text-xs text-[#5F7053]/70">Total Impact</span>
                  </div>
                  <p className="text-xl font-semibold text-[#5F7053]">25kg</p>
                  <p className="text-sm text-[#5F7053]">CO₂ Saved</p>
                </motion.div>
              </div>

              {/* Action Button */}
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#5F7053] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <CalendarPlus className="w-5 h-5" />
                Schedule Collection
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Download App Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute w-full transform -translate-x-1/2 -bottom-32 left-1/2"
      >
        <div className="flex flex-col items-center p-4 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Download className="w-5 h-5 text-[#5F7053]" />
            <span className="text-[#5F7053] font-medium">Get the App</span>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded-xl"
            >
              <AppleIcon className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs opacity-70">Download on the</div>
                <div className="text-sm font-medium">App Store</div>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-white bg-black rounded-xl"
            >
              <Smartphone className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs opacity-70">GET IT ON</div>
                <div className="text-sm font-medium">Google Play</div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileShowcase;
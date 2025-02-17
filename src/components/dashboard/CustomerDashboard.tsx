import { useUser } from '@clerk/clerk-react';
import { 
  Home, 
  CalendarPlus, 
  Package, 
  Trophy,
  History,
  Gift,
  Settings,
  Droplet,
  ChevronRight,
  Recycle,
  Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { UserButton } from '@clerk/clerk-react';
import RequestCollection from './customer/RequestCollection';

const CustomerDashboard = () => {
  const { user } = useUser();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const sidebarLinks = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: CalendarPlus, label: 'Schedule Collection', path: '/dashboard/schedule' },
    { icon: Package, label: 'Buy Containers', path: '/dashboard/containers' },
    { icon: Trophy, label: 'Leaderboard', path: '/dashboard/leaderboard' },
    { icon: History, label: 'Collection History', path: '/dashboard/history' },
    { icon: Gift, label: 'Rewards', path: '/dashboard/rewards' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBE6]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed z-50 p-2 bg-white rounded-lg shadow-md md:hidden top-4 right-4"
      >
        <Menu className="w-6 h-6 text-[#5F7053]" />
      </button>
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transform transition-transform duration-300 md:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Enhanced Logo Section */}
        <div className="h-24 flex items-center justify-start px-6 bg-white border-b border-[#5F7053]/10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <img src="/logo1.png" alt="Tadweer" className="w-12 h-12" />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFCE31] rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col">
              <motion.span 
                className="text-2xl font-bold text-[#5F7053] tracking-widest"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                TADWEER
              </motion.span>
              <motion.div 
                className="flex items-center gap-1 text-xs text-[#5F7053]/60"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Recycle className="w-3 h-3" />
                <span>Recycle for future</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Links */}
        <div className="h-full overflow-y-auto bg-white">
          <nav className="p-4 space-y-2">
            {sidebarLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${location.pathname === link.path 
                      ? 'bg-[#5F7053] text-white shadow-lg shadow-[#5F7053]/20' 
                      : 'text-[#5F7053]/70 hover:bg-[#5F7053]/10 hover:text-[#5F7053]'
                    }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#5F7053]/10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#5F7053]/5 hover:bg-[#5F7053]/10 transition-colors duration-200"
          >
            <UserButton 
              appearance={{
                elements: {
                  userButtonTrigger: "w-10 h-10",
                  userButtonAvatarBox: "w-10 h-10 rounded-xl",
                  userButtonPopoverCard: "rounded-xl shadow-lg",
                }
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#5F7053] truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-[#5F7053]/60">
                Manage Account
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#5F7053]/60" />
          </motion.div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 ">
        <div className="p-8 mx-auto max-w-7xl">
          {/* Welcome Section with decorative elements */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 mb-8 overflow-hidden bg-white shadow-md rounded-2xl"
          >
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-[#5F7053]">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-[#5F7053]/70 mt-1">
                Here's your recycling journey overview
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5F7053]/5 rounded-full -mr-32 -mt-32 backdrop-blur-3xl" />
            <div className="absolute bottom-0 right-20 w-32 h-32 bg-[#FFCE31]/10 rounded-full -mb-16 backdrop-blur-3xl" />
          </motion.div>

          {/* Stats Cards Grid with enhanced styling */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Points Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 transition-shadow duration-200 bg-white shadow-md rounded-2xl hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#5F7053]/70 font-medium">Total Points</p>
                  <h2 className="text-4xl font-bold text-[#5F7053] mt-2">1,250</h2>
                  <div className="flex items-center gap-2 mt-3 text-sm text-[#5F7053]/70">
                    <Trophy className="w-4 h-4" />
                    Rank #5 this month
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5F7053]/10 to-[#5F7053]/20 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-[#5F7053]" />
                </div>
              </div>
            </motion.div>

            {/* Total Recycled Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 transition-shadow duration-200 bg-white shadow-md rounded-2xl hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#5F7053]/70 font-medium">Total Recycled</p>
                  <h2 className="text-4xl font-bold text-[#5F7053] mt-2">75L</h2>
                  <div className="flex items-center gap-2 mt-3 text-sm text-[#5F7053]/70">
                    <History className="w-4 h-4" />
                    Last collection: 3 days ago
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5F7053]/10 to-[#5F7053]/20 flex items-center justify-center">
                  <Droplet className="w-8 h-8 text-[#5F7053]" />
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 transition-shadow duration-200 bg-white shadow-md rounded-2xl hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-[#5F7053] mb-4">Quick Actions</h3>
              <button 
                onClick={() => setIsCollectionModalOpen(true)}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-[#5F7053] to-[#6B7B5F] text-white font-medium flex items-center justify-between group hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <CalendarPlus className="w-5 h-5" />
                  Schedule Collection
                </div>
                <ChevronRight className="w-5 h-5 transition-transform duration-200 transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Add the modal */}
            <RequestCollection 
              isOpen={isCollectionModalOpen}
              onClose={() => setIsCollectionModalOpen(false)}
            />
          </div>

          {/* Recent Activity with enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white shadow-md rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-[#5F7053] mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#5F7053]/5 to-[#5F7053]/10 hover:from-[#5F7053]/10 hover:to-[#5F7053]/15 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-white shadow-md rounded-xl">
                      <Droplet className="w-6 h-6 text-[#5F7053]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#5F7053]">Collection Completed</p>
                      <p className="text-sm text-[#5F7053]/70">15L of oil collected</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5F7053]/70">2 days ago</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
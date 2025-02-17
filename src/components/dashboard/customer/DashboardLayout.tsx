// src/components/dashboard/customer/DashboardLayout.tsx
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { 
  Home, 
  CalendarPlus, 
  Package, 
  Trophy,
  History,
  Gift,
  Settings,
  ChevronRight,
  User,
  Recycle,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useUser();
  const location = useLocation();

  const sidebarLinks = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: '/dashboard'
    },
    { 
      icon: CalendarPlus, 
      label: 'Schedule Collection', 
      path: '/dashboard/schedule'
    },
    { 
      icon: Package, 
      label: 'Buy Containers', 
      path: '/dashboard/containers'
    },
    { 
      icon: Trophy, 
      label: 'Leaderboard', 
      path: '/dashboard/leaderboard'
    },
    { 
      icon: History, 
      label: 'Collection History', 
      path: '/dashboard/history'
    },
    { 
      icon: Gift, 
      label: 'Rewards', 
      path: '/dashboard/rewards'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/dashboard/settings'
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBE6] flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-20 w-64 h-screen bg-white">
        {/* Logo Section */}
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
            className="flex items-center gap-3 p-3 rounded-xl bg-[#5F7053]/5 hover:bg-[#5F7053]/10 transition-colors cursor-pointer"
          >
            <div className="relative">
              <img 
                src={user?.imageUrl} 
                alt={user?.firstName || ''}
                className="object-cover w-10 h-10 rounded-xl"
              />
              <div className="absolute w-3 h-3 bg-green-500 border-2 border-white rounded-full -top-1 -right-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#5F7053] truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-[#5F7053]/60 flex items-center gap-1">
                <User className="w-3 h-3" />
                Manage Account
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#5F7053]/60" />
          </motion.div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 ml-65">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
// src/components/landing/Header.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Recycle } from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getFullName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    return user?.username;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <nav className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img src="/logo1.png" alt="Tadweer" className="w-32 h-32" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#5F7053] tracking-wide">
                TADWEER
              </span>
              <div className="flex items-center gap-1 text-xs text-[#5F7053]/60">
                <Recycle className="w-3 h-3" />
                <span>Recycle for future</span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-8 md:flex">
            <div className="flex items-center gap-6">
              {isLoaded && (
                <>
                  {isSignedIn ? (
                    <div className="flex items-center gap-4">
                      <span className="text-[#5F7053] font-medium">
                        {getFullName()}
                      </span>
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10 rounded-full"
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate('/sign-in')}
                      className="bg-[#5F7053] text-white px-6 py-2 rounded-full
                               hover:bg-[#5F7053]/90 transition-colors"
                    >
                      Sign In
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#5F7053] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 md:hidden"
          >
            <div className="py-4 space-y-4">
              {isLoaded && (
                <div className="px-4 py-2">
                  {isSignedIn ? (
                    <div className="flex items-center gap-3">
                      <span className="text-[#5F7053] font-medium">
                        {getFullName()}
                      </span>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate('/sign-in')}
                      className="bg-[#5F7053] text-white px-6 py-2 rounded-full
                               hover:bg-[#5F7053]/90 transition-colors w-full"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
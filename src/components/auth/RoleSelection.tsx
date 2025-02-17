import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { User, Building2, ArrowRight } from 'lucide-react';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleRoleSelect = async (role: 'customer' | 'company') => {
    try {
      setIsLoading(true);
      setSelectedRole(role);

      await user?.update({
        unsafeMetadata: {
          role: role,
        },
      });

      // Instead of window.location.href, use navigate
      if (role === 'customer') {
        navigate('/dashboard');
      } else {
        navigate('/company-dashboard');
      }

    } catch (error) {
      console.error('Error setting role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBE6] pt-20">
      <div className="max-w-4xl px-4 py-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-bold text-[#5F7053] mb-4">
            Choose Your Account Type
          </h1>
          <p className="text-[#5F7053]/70 text-lg">
            Select how you'd like to use Tadweer
          </p>
        </motion.div>

        <div className="grid max-w-3xl gap-6 mx-auto md:grid-cols-2">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            disabled={isLoading}
            onClick={() => handleRoleSelect('customer')}
            className={`p-8 rounded-2xl border-2 transition-all duration-200 group hover:shadow-lg
              ${selectedRole === 'customer' 
                ? 'border-[#5F7053] bg-[#5F7053]/5' 
                : 'border-[#5F7053]/20 hover:border-[#5F7053]/40 hover:bg-[#5F7053]/5'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#5F7053]/10 flex items-center justify-center mb-4 group-hover:bg-[#5F7053]/20 transition-all duration-200">
                <User className="w-8 h-8 text-[#5F7053]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5F7053] mb-2">Individual User</h3>
              <p className="text-[#5F7053]/70 mb-4">
                Sell your used oil and earn points
              </p>
              <ArrowRight className="w-5 h-5 text-[#5F7053] opacity-0 group-hover:opacity-100 transition-all duration-200" />
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            disabled={isLoading}
            onClick={() => handleRoleSelect('company')}
            className={`p-8 rounded-2xl border-2 transition-all duration-200 group hover:shadow-lg
              ${selectedRole === 'company' 
                ? 'border-[#5F7053] bg-[#5F7053]/5' 
                : 'border-[#5F7053]/20 hover:border-[#5F7053]/40 hover:bg-[#5F7053]/5'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#5F7053]/10 flex items-center justify-center mb-4 group-hover:bg-[#5F7053]/20 transition-all duration-200">
                <Building2 className="w-8 h-8 text-[#5F7053]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5F7053] mb-2">Company</h3>
              <p className="text-[#5F7053]/70 mb-4">
                Purchase processed oil for your business
              </p>
              <ArrowRight className="w-5 h-5 text-[#5F7053] opacity-0 group-hover:opacity-100 transition-all duration-200" />
            </div>
          </motion.button>
        </div>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center text-[#5F7053]"
          >
            <div className="inline-block w-6 h-6 border-2 border-[#5F7053] border-t-transparent rounded-full animate-spin mr-2" />
            Setting up your account...
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;
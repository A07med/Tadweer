// src/components/dashboard/customer/Rewards.tsx
import { motion } from 'framer-motion';
import { 
  Gift, 
  Package, 
  Trophy,
  ChevronRight,
  Star,
  Clock,
  Lock,
} from 'lucide-react';
import { useState } from 'react';

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: 'container' | 'voucher' | 'special';
  available: boolean;
  expiresAt?: string;
  image?: string;
}

const Rewards = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'container' | 'voucher' | 'special'>('all');
  const userPoints = 1250; // This would come from your user state/context

  const rewards: Reward[] = [
    {
      id: '1',
      name: 'Free 10L Container',
      description: 'Get a free 10L container for your next collection',
      pointsCost: 1000,
      category: 'container',
      available: true,
    },
    {
      id: '2',
      name: '50% Off Next Collection',
      description: 'Get 50% off your next collection service',
      pointsCost: 800,
      category: 'voucher',
      available: true,
      expiresAt: '2024-03-01'
    },
    {
      id: '3',
      name: 'Premium Member Status',
      description: 'Unlock premium benefits for 3 months',
      pointsCost: 2000,
      category: 'special',
      available: true
    },
    // Add more rewards...
  ];

  const categories = [
    { id: 'all', label: 'All Rewards', icon: Gift },
    { id: 'container', label: 'Containers', icon: Package },
    { id: 'voucher', label: 'Vouchers', icon: Trophy },
    { id: 'special', label: 'Special', icon: Star }
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(r => r.category === selectedCategory);

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* Page Header with Points */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#5F7053]">Rewards</h1>
            <p className="text-[#5F7053]/70">Redeem your points for rewards</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#5F7053]/10 rounded-xl">
            <Trophy className="w-5 h-5 text-[#5F7053]" />
            <span className="font-bold text-[#5F7053]">{userPoints} points</span>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`p-4 rounded-xl transition-all duration-200 flex flex-col items-center gap-2
                ${selectedCategory === category.id 
                  ? 'bg-[#5F7053] text-white' 
                  : 'bg-white text-[#5F7053] hover:bg-[#5F7053]/10'
                }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Rewards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden bg-white shadow-sm rounded-2xl"
          >
            {/* Reward Image/Icon */}
            <div className="h-48 bg-[#5F7053]/5 flex items-center justify-center">
              {reward.image ? (
                <img 
                  src={reward.image} 
                  alt={reward.name}
                  className="object-contain w-full h-full p-6"
                />
              ) : (
                <Gift className="w-16 h-16 text-[#5F7053]" />
              )}
            </div>

            {/* Reward Info */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#5F7053] mb-2">
                {reward.name}
              </h3>
              <p className="text-[#5F7053]/70 text-sm mb-4">
                {reward.description}
              </p>

              {/* Cost and Expiry */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#5F7053]" />
                  <span className="font-medium text-[#5F7053]">
                    {reward.pointsCost} points
                  </span>
                </div>
                {reward.expiresAt && (
                  <div className="flex items-center gap-1 text-sm text-[#5F7053]/70">
                    <Clock className="w-4 h-4" />
                    <span>Expires {new Date(reward.expiresAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                disabled={userPoints < reward.pointsCost}
                className={`w-full p-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-between
                  ${userPoints >= reward.pointsCost
                    ? 'bg-[#5F7053] text-white hover:bg-[#5F7053]/90'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <span className="flex items-center gap-2">
                  {userPoints >= reward.pointsCost ? (
                    <>
                      <Gift className="w-5 h-5" />
                      Redeem Reward
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Not Enough Points
                    </>
                  )}
                </span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Points History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 overflow-hidden bg-white shadow-sm rounded-2xl"
      >
        <div className="p-6 border-b border-[#5F7053]/10">
          <h2 className="text-lg font-semibold text-[#5F7053]">Points History</h2>
        </div>
        <div className="divide-y divide-[#5F7053]/10">
          {[
            { action: 'Oil Collection', points: +150, date: '2024-02-01' },
            { action: 'Reward Redemption', points: -1000, date: '2024-01-28' },
            { action: 'Bonus Points', points: +500, date: '2024-01-25' },
          ].map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-[#5F7053]">{entry.action}</p>
                <p className="text-sm text-[#5F7053]/70">
                  {new Date(entry.date).toLocaleDateString()}
                </p>
              </div>
              <span className={`font-medium ${
                entry.points > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {entry.points > 0 ? '+' : ''}{entry.points} points
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Rewards;
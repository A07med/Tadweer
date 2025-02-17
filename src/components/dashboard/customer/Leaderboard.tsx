// src/components/dashboard/customer/Leaderboard.tsx
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, Users } from 'lucide-react';
import { useState } from 'react';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  litersRecycled: number;
  rank: number;
  avatar: string;
}

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('monthly');

  const leaderboardData: LeaderboardEntry[] = [
    { id: '1', name: 'Sara Al-Sayed', points: 2500, litersRecycled: 250, rank: 1, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Fatima Al-Balushi', points: 2200, litersRecycled: 220, rank: 2, avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Mohammed Al-Rawahi', points: 2000, litersRecycled: 200, rank: 3, avatar: 'https://i.pravatar.cc/150?img=3' },
    // Add more entries...
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-6 h-6 text-[#5F7053]" />;
    }
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#5F7053]">Leaderboard</h1>
            <p className="text-[#5F7053]/70">See how you rank among other recyclers</p>
          </div>
          <div className="flex gap-2">
            {(['weekly', 'monthly', 'allTime'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${timeframe === period 
                    ? 'bg-[#5F7053] text-white' 
                    : 'bg-[#5F7053]/10 text-[#5F7053] hover:bg-[#5F7053]/20'
                  }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Top 3 Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 mb-8 md:grid-cols-3"
      >
        {leaderboardData.slice(0, 3).map((entry, _index) => (
          <div 
            key={entry.id}
            className="relative p-6 overflow-hidden bg-white shadow-sm rounded-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5F7053]/5 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={entry.avatar} 
                  alt={entry.name}
                  className="object-cover w-16 h-16 rounded-xl"
                />
                <div>
                  <div className="flex items-center gap-2">
                    {getRankIcon(entry.rank)}
                    <span className="font-bold text-[#5F7053]">#{entry.rank}</span>
                  </div>
                  <h3 className="font-medium text-[#5F7053]">{entry.name}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#5F7053]/70">Points</p>
                  <p className="text-lg font-bold text-[#5F7053]">{entry.points}</p>
                </div>
                <div>
                  <p className="text-sm text-[#5F7053]/70">Liters</p>
                  <p className="text-lg font-bold text-[#5F7053]">{entry.litersRecycled}L</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="overflow-hidden bg-white shadow-sm rounded-2xl"
      >
        <div className="p-6 border-b border-[#5F7053]/10">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#5F7053]" />
            <h2 className="text-lg font-semibold text-[#5F7053]">All Recyclers</h2>
          </div>
        </div>
        <div className="divide-y divide-[#5F7053]/10">
          {leaderboardData.map((entry) => (
            <div 
              key={entry.id}
              className="flex items-center justify-between p-4 hover:bg-[#5F7053]/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 flex justify-center font-medium text-[#5F7053]">
                  {entry.rank}
                </div>
                <img 
                  src={entry.avatar} 
                  alt={entry.name}
                  className="object-cover w-10 h-10 rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-[#5F7053]">{entry.name}</h3>
                  <p className="text-sm text-[#5F7053]/70">{entry.litersRecycled}L recycled</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#5F7053]" />
                <span className="font-medium text-[#5F7053]">{entry.points} points</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
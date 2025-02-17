// src/components/dashboard/customer/CollectionHistory.tsx
import { motion } from 'framer-motion';
import { 
  History, 
  Calendar, 
  MapPin, 
  Droplet,
  ChevronRight,
  Download,
  Filter
} from 'lucide-react';
import { useState } from 'react';

interface Collection {
  id: string;
  date: string;
  location: string;
  volume: number;
  points: number;
  status: 'completed' | 'cancelled' | 'scheduled';
}

const CollectionHistory = () => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled' | 'scheduled'>('all');

  const collections: Collection[] = [
    {
      id: '1',
      date: '2024-02-01',
      location: 'Al Khoud, Muscat',
      volume: 15,
      points: 150,
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-02-05',
      location: 'Ruwi, Muscat',
      volume: 20,
      points: 200,
      status: 'scheduled'
    },
    // Add more collection history...
  ];

  const getStatusColor = (status: Collection['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50';
      case 'cancelled':
        return 'text-red-500 bg-red-50';
      case 'scheduled':
        return 'text-blue-500 bg-blue-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const filteredCollections = filter === 'all' 
    ? collections 
    : collections.filter(c => c.status === filter);

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
            <h1 className="text-2xl font-bold text-[#5F7053]">Collection History</h1>
            <p className="text-[#5F7053]/70">View all your past and upcoming collections</p>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-[#5F7053]/10 text-[#5F7053] rounded-lg hover:bg-[#5F7053]/20 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export History
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-4 mb-6 bg-white shadow-sm rounded-xl"
      >
        <Filter className="w-5 h-5 text-[#5F7053]" />
        <div className="flex gap-2">
          {(['all', 'completed', 'cancelled', 'scheduled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${filter === status 
                  ? 'bg-[#5F7053] text-white' 
                  : 'bg-[#5F7053]/10 text-[#5F7053] hover:bg-[#5F7053]/20'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Collections List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="overflow-hidden bg-white shadow-sm rounded-2xl"
      >
        <div className="divide-y divide-[#5F7053]/10">
          {filteredCollections.map((collection) => (
            <div 
              key={collection.id}
              className="p-4 hover:bg-[#5F7053]/5 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#5F7053]/10 flex items-center justify-center">
                    <History className="w-6 h-6 text-[#5F7053]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(collection.status)}`}>
                        {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                      </span>
                      <span className="text-sm text-[#5F7053]/70">#{collection.id}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#5F7053]/70" />
                        <span className="text-sm text-[#5F7053]">
                          {new Date(collection.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#5F7053]/70" />
                        <span className="text-sm text-[#5F7053]">{collection.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Droplet className="w-4 h-4 text-[#5F7053]" />
                    <span className="font-medium text-[#5F7053]">{collection.volume}L</span>
                  </div>
                  <p className="text-sm text-[#5F7053]/70">{collection.points} points earned</p>
                </div>
              </div>
              <button className="w-full p-3 rounded-lg bg-[#5F7053]/10 hover:bg-[#5F7053]/20 text-[#5F7053] font-medium transition-colors flex items-center justify-between">
                <span>View Details</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CollectionHistory;
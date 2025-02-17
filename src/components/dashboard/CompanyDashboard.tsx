import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Droplet, 
  Calendar,
  Package,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import VolumeChart from './company/components/VolumeChart';
import OrderForm from './company/components/OrderForm';

const CompanyDashboard = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Sample data - replace with real data
  const stats = [
    {
      title: 'Total Volume Collected',
      value: '25,430L',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Active Orders',
      value: '12',
      change: '+2',
      trend: 'up'
    },
    {
      title: 'Average Collection Time',
      value: '2.5 days',
      change: '-0.5 days',
      trend: 'down'
    },
    {
      title: 'Monthly Revenue',
      value: '$15,240',
      change: '+8.3%',
      trend: 'up'
    }
  ];

  const recentOrders = [
    {
      id: '1',
      customerName: 'Al Reef Restaurant',
      volume: '500L',
      status: 'In Progress',
      date: '2024-02-10'
    },
    {
      id: '2',
      customerName: 'Dubai Marina Hotel',
      volume: '1000L',
      status: 'Scheduled',
      date: '2024-02-11'
    },
    {
      id: '3',
      customerName: 'Palm Beach Resort',
      volume: '750L',
      status: 'Completed',
      date: '2024-02-09'
    }
  ];

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
            <p className="mt-1 text-gray-500">Overview of your oil collection operations</p>
          </div>
          <button
            onClick={() => setShowOrderForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#5F7053] text-white rounded-lg hover:bg-[#5F7053]/90 transition-colors"
          >
            <Package className="w-4 h-4" />
            New Order
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white shadow-sm rounded-xl"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <span className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <VolumeChart className="h-full" />
          </div>

          {/* Recent Orders */}
          <div className="p-6 bg-white rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              <button className="text-sm text-[#5F7053] hover:text-[#5F7053]/80 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{order.customerName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">
                        <Droplet className="inline w-4 h-4 mr-1" />
                        {order.volume}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        {order.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm
          isOpen={showOrderForm}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </div>
  );
};

export default CompanyDashboard;
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin,
  Droplet,
  Clock,
  CalendarCheck,
  Search
} from 'lucide-react';
import { useOrders, Order } from '@/context/OrdersContext';

const Orders = () => {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
              <p className="mt-1 text-gray-500">View and manage your collection orders</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-80 rounded-lg border border-gray-200 focus:ring-[#5F7053] focus:border-[#5F7053]"
              />
            </div>

            <div className="flex gap-2">
              {(['all', 'pending', 'scheduled', 'completed', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    statusFilter === status
                      ? 'bg-[#5F7053] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center bg-white rounded-xl">
                <div className="flex justify-center">
                  <Clock className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
                <p className="mt-2 text-gray-500">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'You have not placed any orders yet'}
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-4">
                      {/* Order ID and Status */}
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-medium text-gray-900">{order.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Droplet className="w-5 h-5 text-[#5F7053]" />
                          <div>
                            <p className="text-sm text-gray-500">Volume</p>
                            <p className="font-medium">{order.volume}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <CalendarCheck className="w-5 h-5 text-[#5F7053]" />
                          <div>
                            <p className="text-sm text-gray-500">Collection Date</p>
                            <p className="font-medium">{formatDate(order.collectionDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-[#5F7053]" />
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{order.location.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="flex items-center gap-2">
                      {order.status === 'pending' && (
                        <>
                          <button className="px-4 py-2 text-sm font-medium text-white bg-[#5F7053] rounded-lg hover:bg-[#5F7053]/90">
                            Accept
                          </button>
                          <button className="px-4 py-2 text-sm font-medium text-red-600 rounded-lg bg-red-50 hover:bg-red-100">
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
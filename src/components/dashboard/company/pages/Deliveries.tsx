// src/components/dashboard/company/pages/Deliveries.tsx
import { useState } from 'react';
import { 
  Truck, 
  Calendar,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  CircleDot,
  Circle,
  User,
  AlertCircle,
  Phone
} from 'lucide-react';
import DeliveryMap from '../components/DeliveryMap';

interface Delivery {
  id: string;
  orderId: string;
  status: 'scheduled' | 'in_transit' | 'delivered' | 'delayed';
  scheduledDate: string;
  estimatedArrival: string;
  location: string;
  volume: number;
  driver: {
    name: string;
    phone: string;
    vehicleNo: string;
  };
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
}


const Deliveries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);

  // Mock data - replace with actual API data
  const deliveries: Delivery[] = [
    {
      id: 'DEL-001',
      orderId: 'ORD-001',
      status: 'in_transit',
      scheduledDate: '2024-02-15',
      estimatedArrival: '2024-02-15T14:30:00',
      location: 'Main Facility, Muscat',
      volume: 500,
      driver: {
        name: 'Ahmed Al-Balushi',
        phone: '+968 1234 5678',
        vehicleNo: 'MCT 1234'
      },
      currentLocation: {
        lat: 23.5880,
        lng: 58.3829,
        address: 'Al Khoud, Muscat'
      }
    },
    // Add more deliveries...
  ];

  const getStatusColor = (status: Delivery['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in_transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Delivery['status']) => {
    switch (status) {
      case 'scheduled':
        return Circle;
      case 'in_transit':
        return CircleDot;
      case 'delivered':
        return CheckCircle2;
      case 'delayed':
        return AlertCircle;
      default:
        return Circle;
    }
  };

  return (
    <div className="w-full p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#5F7053]">Deliveries</h1>
            <p className="text-[#5F7053]/70">Track and manage your oil deliveries</p>
          </div>
          <button 
            className="px-4 py-2 bg-[#5F7053] text-white rounded-xl 
                     hover:bg-[#5F7053]/90 transition-colors flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            View Schedule
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid gap-4 mb-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5F7053]/40" />
              <input
                type="text"
                placeholder="Search by delivery ID or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-[#5F7053]/20 focus:border-[#5F7053] outline-none"
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-[#5F7053]/20 focus:border-[#5F7053] outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
        </div>

        {/* Deliveries List & Details */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Deliveries List */}
          <div className="overflow-hidden bg-white shadow-md lg:col-span-2 rounded-2xl">
            <div className="p-4 border-b border-[#5F7053]/10">
              <h3 className="font-semibold text-[#5F7053]">Active Deliveries</h3>
            </div>
            <div className="divide-y divide-[#5F7053]/10">
              {deliveries.map((delivery) => {
                const StatusIcon = getStatusIcon(delivery.status);
                return (
                  <button
                    key={delivery.id}
                    onClick={() => setSelectedDelivery(delivery)}
                    className={`w-full p-4 text-left hover:bg-[#5F7053]/5 transition-colors
                      ${selectedDelivery?.id === delivery.id ? 'bg-[#5F7053]/5' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 ${delivery.status === 'in_transit' ? 'animate-pulse' : ''}`}>
                        <StatusIcon className={`w-5 h-5 ${
                          getStatusColor(delivery.status).includes('text')
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-[#5F7053]">{delivery.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                            {delivery.status.replace('_', ' ').charAt(0).toUpperCase() + delivery.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#5F7053]/70">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{delivery.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#5F7053]/70 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>ETA: {new Date(delivery.estimatedArrival).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-white shadow-md lg:col-span-3 rounded-2xl">
            {selectedDelivery ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#5F7053]">Delivery Details</h3>
                    <p className="text-[#5F7053]/70">Order #{selectedDelivery.orderId}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDelivery.status)}`}>
                    {selectedDelivery.status.replace('_', ' ').charAt(0).toUpperCase() + selectedDelivery.status.slice(1)}
                  </span>
                </div>

                <div className="grid gap-6 mb-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#5F7053]">Scheduled Date</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-[#5F7053]/70" />
                        <span className="text-[#5F7053]">
                          {new Date(selectedDelivery.scheduledDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#5F7053]">Delivery Location</label>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-[#5F7053]/70" />
                        <span className="text-[#5F7053]">{selectedDelivery.location}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#5F7053]">Volume</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Truck className="w-4 h-4 text-[#5F7053]/70" />
                        <span className="text-[#5F7053]">{selectedDelivery.volume}L</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#5F7053]">Driver Information</label>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4 text-[#5F7053]/70" />
                        <span className="text-[#5F7053]">{selectedDelivery.driver.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4 text-[#5F7053]/70" />
                        <span className="text-[#5F7053]">{selectedDelivery.driver.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Truck className="w-4 h-4 text-[#5F7053]/70" />
                        <span className="text-[#5F7053]">{selectedDelivery.driver.vehicleNo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map would go here */}
                {selectedDelivery && (
                  <DeliveryMap
                    currentLocation={selectedDelivery.currentLocation}
                    destination={selectedDelivery.location}
                    isInTransit={selectedDelivery.status === 'in_transit'}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Truck className="w-12 h-12 text-[#5F7053]/20 mx-auto mb-4" />
                  <p className="text-[#5F7053]/70">Select a delivery to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
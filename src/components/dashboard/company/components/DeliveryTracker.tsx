import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Truck, Package, MapPin } from 'lucide-react';

interface DeliveryStatus {
  id: string;
  status: 'processing' | 'confirmed' | 'in_transit' | 'delivered';
  orderNumber: string;
  volume: string;
  location: string;
  eta?: string;
  updatedAt: string;
}

interface DeliveryTrackerProps {
  delivery: DeliveryStatus;
  className?: string;
}

const DeliveryTracker = ({ delivery, className = '' }: DeliveryTrackerProps) => {
  const steps = [
    {
      id: 'processing',
      title: 'Order Processing',
      icon: Package,
      description: 'Order has been received and is being processed',
    },
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      icon: CheckCircle2,
      description: 'Order has been confirmed and scheduled',
    },
    {
      id: 'in_transit',
      title: 'In Transit',
      icon: Truck,
      description: 'Order is on its way to the delivery location',
    },
    {
      id: 'delivered',
      title: 'Delivered',
      icon: MapPin,
      description: 'Order has been successfully delivered',
    },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === delivery.status);

  return (
    <div className={`bg-white rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Delivery Status</h3>
          <p className="text-sm text-gray-500">Order #{delivery.orderNumber}</p>
        </div>
        {delivery.eta && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>ETA: {delivery.eta}</span>
          </div>
        )}
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-0 bottom-0 w-px bg-gray-200 left-6">
          <div
            className="absolute top-0 left-0 w-full bg-[#5F7053] transition-all duration-500"
            style={{
              height: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-4"
              >
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-[#5F7053]' : 'bg-gray-200'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h4 className={`font-medium ${isCompleted ? 'text-[#5F7053]' : 'text-gray-400'}`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-500">{step.description}</p>
                  {isCurrent && (
                    <div className="mt-2 text-sm text-[#5F7053]">
                      {delivery.volume} • {delivery.location}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 mt-6 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-500">
            Last updated: {delivery.updatedAt}
          </div>
          <button className="text-[#5F7053] hover:text-[#5F7053]/80 font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracker;
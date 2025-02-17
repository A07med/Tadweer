import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplet, 
  Calendar, 
  ChevronRight, 
  CheckCircle2,
  X,
  CalendarCheck,
  MapPin,
  Receipt
} from 'lucide-react';
import MapPicker from './MapPicker';
import { useOrders } from '@/context/OrdersContext';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface FormData {
  volume: string;
  collectionDate: string;
  location?: Location;
}

const OrderForm = ({ isOpen, onClose }: OrderFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    volume: '',
    collectionDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const { addOrder } = useOrders();

  const handleLocationSelect = (location: Location | null) => {
    setFormData(prev => ({
      ...prev,
      location: location || undefined
    }));
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return Boolean(formData.volume);
      case 2:
        return Boolean(formData.collectionDate);
      case 3:
        return Boolean(formData.location);
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep() || !formData.location) return;
  
    setIsSubmitting(true);
    try {
      // Add order to context
      addOrder({
        volume: formData.volume,
        collectionDate: formData.collectionDate,
        location: formData.location
      });
  
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSuccess) {
      // Reset form data
      setFormData({
        volume: '',
        collectionDate: '',
      });
      setStep(1);
      setIsSuccess(false);
      setOrderId('');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div 
            className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm" 
            onClick={handleClose}
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl overflow-hidden bg-white shadow-xl rounded-2xl"
          >
            {!isSuccess && (
              <>
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
                  <motion.div 
                    className="h-full bg-[#5F7053]"
                    initial={{ width: '33.33%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute p-1 text-gray-400 transition-colors right-4 top-4 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <>
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">Select Volume</h2>
                          <p className="mt-1 text-sm text-gray-500">Choose the amount of oil to be collected</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {['500L', '1000L', '2000L', '5000L'].map((volume) => (
                            <button
                              key={volume}
                              onClick={() => setFormData({ ...formData, volume })}
                              className={`relative p-6 rounded-xl border-2 transition-all
                                ${formData.volume === volume
                                  ? 'border-[#5F7053] bg-[#5F7053]/5'
                                  : 'border-gray-200 hover:border-[#5F7053]/50'
                                }`}
                            >
                              <Droplet className="w-7 h-7 mx-auto mb-3 text-[#5F7053]" />
                              <span className="block text-lg font-medium text-gray-900">{volume}</span>
                              {formData.volume === volume && (
                                <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-5 h-5 bg-[#5F7053] rounded-full flex items-center justify-center"
                              >
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Collection Date</h2>
                        <p className="mt-1 text-sm text-gray-500">When should we collect the oil?</p>
                      </div>

                      <div className="relative">
                        <Calendar className="absolute text-gray-400 left-3 top-3" />
                        <input
                          type="date"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-[#5F7053] focus:border-[#5F7053]"
                          value={formData.collectionDate}
                          onChange={(e) => setFormData({ ...formData, collectionDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Collection Location</h2>
                        <p className="mt-1 text-sm text-gray-500">Select the pickup location on the map</p>
                      </div>

                      <MapPicker
                        onLocationSelect={handleLocationSelect}
                        initialLocation={formData.location}
                      />
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <div className="mb-6">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  
                  <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                    Order Placed Successfully!
                  </h2>

                  <div className="max-w-sm mx-auto mb-8">
                    <div className="p-6 space-y-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Receipt className="w-5 h-5 text-[#5F7053]" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="font-medium">{orderId}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Droplet className="w-5 h-5 text-[#5F7053]" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Volume</p>
                          <p className="font-medium">{formData.volume}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <CalendarCheck className="w-5 h-5 text-[#5F7053]" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Collection Date</p>
                          <p className="font-medium">{formData.collectionDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#5F7053]" />
                        <div className="text-left">
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{formData.location?.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="px-6 py-2 text-white bg-[#5F7053] rounded-lg hover:bg-[#5F7053]/90 transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="flex justify-between p-6 border-t border-gray-100 bg-gray-50">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              <button
                onClick={step === 3 ? handleSubmit : handleNext}
                disabled={isSubmitting || !validateStep()}
                className={`${step === 1 ? 'ml-auto' : ''} flex items-center gap-2 px-6 py-2 text-sm 
                  font-medium text-white bg-[#5F7053] rounded-lg hover:bg-[#5F7053]/90 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {step === 3 ? 'Place Order' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
};

export default OrderForm;
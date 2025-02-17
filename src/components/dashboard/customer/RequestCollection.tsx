// src/components/dashboard/customer/RequestCollection.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Droplet, 
  Clock, 
  X,
  ChevronRight,
  CheckCircle,
  Calendar,
  Phone,
  AlertCircle
} from 'lucide-react';

interface RequestCollectionProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  containerSize?: string;
  quantity?: string;
  date?: string;
  time?: string;
  location?: string;
  phone?: string;
}

interface FormData {
  containerSize: string;
  quantity: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  phone: string;
  locationDetails: {
    lat?: number;
    lng?: number;
    fullAddress?: string;
  };
}

const initialFormData: FormData = {
  containerSize: '',
  quantity: '',
  date: '',
  time: '',
  location: '',
  notes: '',
  phone: '',
  locationDetails: {}
};

const RequestCollection = ({ isOpen, onClose }: RequestCollectionProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData(initialFormData);
      setErrors({});
    }
  }, [isOpen]);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!formData.containerSize) {
        newErrors.containerSize = 'Please select a container size';
      }
      if (!formData.quantity) {
        newErrors.quantity = 'Please enter the quantity';
      } else if (parseFloat(formData.quantity) <= 0) {
        newErrors.quantity = 'Quantity must be greater than 0';
      }
      if (!formData.phone) {
        newErrors.phone = 'Please enter your phone number';
      } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (currentStep === 2) {
      const today = new Date();
      const selectedDate = new Date(formData.date);
      
      if (!formData.date) {
        newErrors.date = 'Please select a date';
      } else if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
      
      if (!formData.time) {
        newErrors.time = 'Please select a time slot';
      }
      
      if (!formData.location) {
        newErrors.location = 'Please enter your location';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success - replace with actual API call
      console.log('Submitting request:', formData);
      
      setStep(3);
    } catch (error) {
      console.error('Error submitting request:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const renderError = (error?: string) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-1 mt-1 text-sm text-red-500">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl m-4 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#5F7053]/10 transition-colors"
            >
              <X className="w-5 h-5 text-[#5F7053]" />
            </button>

            {/* Content */}
            <div className="p-6">
              {/* Progress Steps */}
              {step < 3 && (
                <div className="flex items-center justify-center mb-6">
                  {[1, 2].map((stepNum) => (
                    <div key={stepNum} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${step >= stepNum 
                          ? 'bg-[#5F7053] text-white' 
                          : 'bg-[#5F7053]/10 text-[#5F7053]'}`}
                      >
                        {stepNum}
                      </div>
                      {stepNum < 2 && (
                        <div className={`w-20 h-1 mx-2 
                          ${step > stepNum ? 'bg-[#5F7053]' : 'bg-[#5F7053]/10'}`} 
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Step 1: Basic Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#5F7053] text-center">
                    Schedule Oil Collection
                  </h2>
                  
                  {/* Container Size */}
                  <div>
                    <label className="block text-sm font-medium text-[#5F7053] mb-2">
                      Container Size
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['5L', '10L', '20L'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setFormData({ ...formData, containerSize: size })}
                          className={`p-4 rounded-xl border-2 transition-all
                            ${formData.containerSize === size 
                              ? 'border-[#5F7053] bg-[#5F7053]/5' 
                              : 'border-[#5F7053]/20 hover:border-[#5F7053]/40'}`}
                        >
                          <Droplet className="w-5 h-5 text-[#5F7053] mx-auto mb-2" />
                          <span className="block text-center text-[#5F7053] font-medium">
                            {size}
                          </span>
                        </button>
                      ))}
                    </div>
                    {renderError(errors.containerSize)}
                  </div>
                  
                  {/* Oil Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-[#5F7053] mb-2">
                      Quantity of Oil
                    </label>
                    <input
                      type="number"
                      placeholder="Enter quantity in liters"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full p-3 rounded-xl border-2 border-[#5F7053]/20 focus:border-[#5F7053] outline-none"
                    />
                    {renderError(errors.quantity)}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-[#5F7053] mb-2">
                      Contact Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5F7053]/40" />
                      <input
                        type="tel"
                        placeholder="+968 XXXX XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 pl-12 rounded-xl border-2 border-[#5F7053]/20 focus:border-[#5F7053] outline-none"
                      />
                    </div>
                    {renderError(errors.phone)}
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full p-4 bg-[#5F7053] text-white rounded-xl 
                             hover:bg-[#5F7053]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Step 2: Collection Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#5F7053] text-center mb-6">
                    Collection Details
                  </h2>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-sm font-medium text-[#5F7053] mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-3 rounded-xl border-2 border-[#5F7053]/20 focus:border-[#5F7053] outline-none"
                    />
                    {renderError(errors.date)}
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-sm font-medium text-[#5F7053] mb-2">
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Morning', 'Afternoon', 'Evening'].map((time) => (
                        <button
                          key={time}
                          onClick={() => setFormData({ ...formData, time })}
                          className={`p-4 rounded-xl border-2 transition-all
                            ${formData.time === time 
                              ? 'border-[#5F7053] bg-[#5F7053]/5' 
                              : 'border-[#5F7053]/20 hover:border-[#5F7053]/40'}`}
                        >
                          <Clock className="w-5 h-5 text-[#5F7053] mx-auto mb-2" />
                          <span className="block text-sm text-center text-[#5F7053]">
                            {time}
                            <br />
                            <span className="text-xs text-[#5F7053]/70">
                              {time === 'Morning' ? '9AM - 12PM' : 
                               time === 'Afternoon' ? '12PM - 4PM' : '4PM - 7PM'}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                    {renderError(errors.time)}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-[#5F7053] mb-2">
                      Collection Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your address"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-3 rounded-xl border-2 border-[#5F7053]/20 focus:border-[#5F7053] outline-none"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#5F7053]/10 rounded-lg hover:bg-[#5F7053]/20 transition-colors">
                        <MapPin className="w-5 h-5 text-[#5F7053]" />
                      </button>
                    </div>
                    {renderError(errors.location)}
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium text-[#5F7053] mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      placeholder="Any special instructions..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full p-3 rounded-xl border-2 border-[#5F7053]/20 focus:border-[#5F7053] outline-none resize-none h-24"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 p-4 border-2 border-[#5F7053] text-[#5F7053] rounded-xl hover:bg-[#5F7053]/5 transition-colors"
                      disabled={isLoading}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex-1 p-4 bg-[#5F7053] text-white rounded-xl hover:bg-[#5F7053]/90 transition-colors flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin" />
                      ) : (
                        <>
                          Submit Request
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full"
                  >
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold text-[#5F7053] mb-2">
                      Collection Scheduled!
                    </h2>
                    <p className="text-[#5F7053]/70 mb-6">
                      We'll send you a confirmation message shortly.
                    </p>
                    <div className="bg-[#5F7053]/5 rounded-xl p-4 max-w-sm mx-auto mb-6">
                      <div className="flex items-center gap-2 text-[#5F7053] mb-3">
                        <div className="flex items-center gap-2">
                          <Droplet className="w-4 h-4" />
                          <span>{formData.quantity}L ({formData.containerSize} container)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[#5F7053] mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(formData.date).toLocaleDateString()} - {formData.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#5F7053] mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{formData.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#5F7053]">
                        <Phone className="w-4 h-4" />
                        <span>{formData.phone}</span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={onClose}
                        className="px-6 py-2 border-2 border-[#5F7053] text-[#5F7053] rounded-lg hover:bg-[#5F7053]/5 transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          setStep(1);
                          setFormData(initialFormData);
                        }}
                        className="px-6 py-2 bg-[#5F7053] text-white rounded-lg hover:bg-[#5F7053]/90 transition-colors"
                      >
                        Schedule Another
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestCollection;
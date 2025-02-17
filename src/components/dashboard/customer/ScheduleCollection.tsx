import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin,
  CalendarDays,
  ChevronRight,
  Info,
  Droplet
} from 'lucide-react';

const ScheduleCollection = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-[#5F7053]">Schedule Collection</h1>
        <p className="text-[#5F7053]/70">Book a time for us to collect your used oil</p>
      </motion.div>

      {/* Booking Process */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 bg-white shadow-sm rounded-2xl"
          >
            {/* Progress Steps */}
            <div className="flex items-center mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= num ? 'bg-[#5F7053] text-white' : 'bg-[#5F7053]/10 text-[#5F7053]'
                  }`}>
                    {num}
                  </div>
                  {num < 3 && (
                    <div className={`w-24 h-1 mx-2 ${
                      step > num ? 'bg-[#5F7053]' : 'bg-[#5F7053]/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Date & Time */}
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[#5F7053] font-medium mb-2">
                    Select Date
                  </label>
                  <div className="flex gap-4">
                    {['Tomorrow', 'In 2 days', 'Custom'].map((option) => (
                      <button
                        key={option}
                        className="flex-1 p-4 rounded-xl border-2 border-[#5F7053]/10 hover:border-[#5F7053] hover:bg-[#5F7053]/5 transition-colors"
                      >
                        <CalendarDays className="w-6 h-6 text-[#5F7053] mb-2" />
                        <div className="text-[#5F7053] font-medium">{option}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#5F7053] font-medium mb-2">
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Morning', 'Afternoon', 'Evening'].map((time) => (
                      <button
                        key={time}
                        className="p-4 rounded-xl border-2 border-[#5F7053]/10 hover:border-[#5F7053] hover:bg-[#5F7053]/5 transition-colors"
                      >
                        <div className="text-[#5F7053] font-medium">{time}</div>
                        <div className="text-[#5F7053]/70 text-sm">
                          {time === 'Morning' ? '9AM - 12PM' : 
                           time === 'Afternoon' ? '12PM - 4PM' : '4PM - 7PM'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full p-4 mt-6 bg-[#5F7053] text-white rounded-xl hover:bg-[#5F7053]/90 transition-colors flex items-center justify-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Location Details */}
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[#5F7053] font-medium mb-2">
                    Location
                  </label>
                  <div className="flex gap-4">
                    <button className="flex-1 p-4 rounded-xl border-2 border-[#5F7053]/10 hover:border-[#5F7053] hover:bg-[#5F7053]/5 transition-colors">
                      <MapPin className="w-6 h-6 text-[#5F7053] mb-2" />
                      <div className="text-[#5F7053] font-medium">Use Current Location</div>
                    </button>
                    <button className="flex-1 p-4 rounded-xl border-2 border-[#5F7053]/10 hover:border-[#5F7053] hover:bg-[#5F7053]/5 transition-colors">
                      <MapPin className="w-6 h-6 text-[#5F7053] mb-2" />
                      <div className="text-[#5F7053] font-medium">Enter Address</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#5F7053] font-medium mb-2">
                    Additional Details
                  </label>
                  <textarea 
                    className="w-full p-4 rounded-xl border-2 border-[#5F7053]/10 focus:border-[#5F7053] focus:ring-1 focus:ring-[#5F7053] transition-colors"
                    placeholder="Building name, landmarks, or special instructions..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 p-4 border-2 border-[#5F7053] text-[#5F7053] rounded-xl hover:bg-[#5F7053]/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 p-4 bg-[#5F7053] text-white rounded-xl hover:bg-[#5F7053]/90 transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Collection Details */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[#5F7053] font-medium mb-2">
                    Estimated Volume
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {['5L', '10L', '15L', '20L+'].map((volume) => (
                      <button
                        key={volume}
                        className="p-4 rounded-xl border-2 border-[#5F7053]/10 hover:border-[#5F7053] hover:bg-[#5F7053]/5 transition-colors"
                      >
                        <Droplet className="w-6 h-6 text-[#5F7053] mb-2" />
                        <div className="text-[#5F7053] font-medium">{volume}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#5F7053] font-medium mb-2">
                    Notes
                  </label>
                  <textarea 
                    className="w-full p-4 rounded-xl border-2 border-[#5F7053]/10 focus:border-[#5F7053] focus:ring-1 focus:ring-[#5F7053] transition-colors"
                    placeholder="Any additional information..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 p-4 border-2 border-[#5F7053] text-[#5F7053] rounded-xl hover:bg-[#5F7053]/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => console.log('Submit')}
                    className="flex-1 p-4 bg-[#5F7053] text-white rounded-xl hover:bg-[#5F7053]/90 transition-colors"
                  >
                    Schedule Collection
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Information Section */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white shadow-sm rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-[#5F7053] mb-4">Collection Info</h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#5F7053]/5">
                <div className="flex items-center gap-3 mb-2">
                  <Info className="w-5 h-5 text-[#5F7053]" />
                  <h4 className="font-medium text-[#5F7053]">What to Prepare</h4>
                </div>
                <ul className="text-sm text-[#5F7053]/70 space-y-2 ml-8">
                  <li>Clean containers for oil storage</li>
                  <li>Clear access to collection point</li>
                  <li>Someone available during collection</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#5F7053]/5">
                <div className="flex items-center gap-3 mb-2">
                  <Info className="w-5 h-5 text-[#5F7053]" />
                  <h4 className="font-medium text-[#5F7053]">Points System</h4>
                </div>
                <p className="text-sm text-[#5F7053]/70">
                  Earn 10 points per liter of oil collected. Points can be redeemed for rewards and containers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#5F7053]/5">
                <div className="flex items-center gap-3 mb-2">
                  <Info className="w-5 h-5 text-[#5F7053]" />
                  <h4 className="font-medium text-[#5F7053]">Need Help?</h4>
                </div>
                <p className="text-sm text-[#5F7053]/70">
                  Contact our support team at support@tadweer.com or call us at +968 1234 5678
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCollection;
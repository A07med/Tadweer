import { motion } from 'framer-motion';
import { Phone, Truck, Factory, Gift } from 'lucide-react';

const IntegratedHowItWorks = () => {
  const steps = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Schedule Pickup",
      description: "Use our app to schedule a convenient pickup",
      color: "bg-[#5F7053]",
      number: "1"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Collection",
      description: "Our eco-friendly trucks arrive at your location",
      color: "bg-[#C6822A]",
      number: "2"
    },
    {
      icon: <Factory className="w-6 h-6" />,
      title: "Processing",
      description: "We transform your oil into renewable energy",
      color: "bg-[#A9B388]",
      number: "3"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Earn Rewards",
      description: "Get points and track your impact",
      color: "bg-[#FFCE31]",
      number: "4"
    }
  ];

  return (
    <section className="py-24 bg-[#FFFBE6]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-[#5F7053] mb-4">
            How It Works
          </h2>
          <p className="text-[#5F7053]/70">
            Turn your used cooking oil into rewards with our simple process
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Connecting Line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-[#5F7053]/20 
                       hidden md:block">
            <motion.div
              className="h-full bg-[#5F7053]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative flex flex-col items-center"
              >
                {/* Step Number */}
                <motion.div
                  className="absolute -top-4 bg-[#5F7053] text-white w-6 h-6 
                           rounded-full flex items-center justify-center text-sm font-medium"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {step.number}
                </motion.div>

                {/* Icon Circle */}
                <motion.div
                  className={`${step.color} w-20 h-20 rounded-full flex items-center 
                           justify-center text-white shadow-lg mb-4 relative`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Decorative dots */}
                  <div className="absolute -right-1 -top-1 w-3 h-3 bg-[#FFCE31] rounded-full opacity-50" />
                  <div className="absolute -left-1 -bottom-1 w-2 h-2 bg-[#5F7053] rounded-full opacity-30" />
                  
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2,
                    }}
                  >
                    {step.icon}
                  </motion.div>
                </motion.div>

                {/* Text Content */}
                <h3 className="text-[#5F7053] font-semibold mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-[#5F7053]/70 text-sm text-center">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-[#FFCE31] text-[#5F7053] px-8 py-3 rounded-full 
                     font-medium shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Recycling Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegratedHowItWorks;
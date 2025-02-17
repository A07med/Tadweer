import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: '🌱',
      title: 'Sustainable Future',
      description: 'Converting used oil into renewable energy',
      color: '#5F7053'
    },
    {
      icon: '💰',
      title: 'Earn Rewards',
      description: 'Get points for every liter recycled',
      color: '#C6822A'
    },
    {
      icon: '🌍',
      title: 'Environmental Impact',
      description: 'Track your contribution to sustainability',
      color: '#FFCE31'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background patterns */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/leaf-pattern.svg')`,
          backgroundSize: '50px',
          opacity: 0.1
        }} />
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#5F7053] mb-4">
            Why Choose Tadweer?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us in creating a sustainable future while earning rewards for your contribution
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl 
                         transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-4xl mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: feature.color }}>
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
              
              {/* Animated decoration */}
              <motion.div
                className="absolute bottom-0 right-0 w-20 h-20 opacity-10"
                style={{ color: feature.color }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Decorative SVG pattern */}
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
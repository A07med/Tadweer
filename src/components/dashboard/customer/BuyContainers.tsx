import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Package, 
  Plus, 
  Minus,
  Truck,
  Shield
} from 'lucide-react';
import { useState } from 'react';

interface ContainerType {
  id: string;
  name: string;
  capacity: string;
  price: number;
  image: string;
  features: string[];
  popular?: boolean;
  inStock: boolean;
  description: string;
}

const BuyContainers = () => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const containers: ContainerType[] = [
    {
      id: '1',
      name: 'Standard Oil Container',
      capacity: '5L',
      price: 5,
      image: '/used-container.png', // Make sure to adjust the path to your images
      description: 'Perfect for household use, this 5L container is designed for easy handling and secure storage.',
      features: [
        'Durable plastic material',
        'Easy-pour spout',
        'Secure lid',
        'Compact size'
      ],
      inStock: true
    },
    {
      id: '2',
      name: 'Premium Container',
      capacity: '10L',
      price: 8,
      image: '/used-container.png',
      description: 'Our most popular choice for regular recyclers, featuring enhanced durability and convenience.',
      features: [
        'Heavy-duty material',
        'Wide mouth opening',
        'Handle for easy carrying',
        'Measurement markings'
      ],
      popular: true,
      inStock: true
    },
    {
      id: '3',
      name: 'Professional Container',
      capacity: '20L',
      price: 15,
      image: '/used-container.png',
      description: 'Industrial-grade container perfect for businesses and high-volume recyclers.',
      features: [
        'Industrial grade plastic',
        'Double handles',
        'Extra wide opening',
        'Professional grade',
        'Heavy-duty construction'
      ],
      inStock: true
    }
  ];

  const updateQuantity = (containerId: string, action: 'increase' | 'decrease') => {
    setCartItems(prev => {
      const currentQty = prev[containerId] || 0;
      const newQty = action === 'increase' ? currentQty + 1 : Math.max(0, currentQty - 1);
      
      if (newQty === 0) {
        const { [containerId]: _, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [containerId]: newQty
      };
    });
  };

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cartItems).reduce((total, [id, quantity]) => {
    const container = containers.find(c => c.id === id);
    return total + (container?.price || 0) * quantity;
  }, 0);

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#5F7053]">Oil Containers Store</h1>
          <p className="text-[#5F7053]/70">High-quality containers for your recycling needs</p>
        </div>

        {/* Cart Summary Button */}
        {totalItems > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-3 px-4 py-2 bg-[#5F7053] text-white rounded-xl hover:bg-[#5F7053]/90 transition-all"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-white text-[#5F7053] rounded-full text-xs font-bold">
                {totalItems}
              </span>
            </div>
            <span>${totalPrice.toFixed(2)}</span>
          </motion.button>
        )}
      </motion.div>

      {/* Store Benefits */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-white shadow-sm rounded-xl"
        >
          <div className="w-10 h-10 rounded-lg bg-[#5F7053]/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-[#5F7053]" />
          </div>
          <div>
            <h3 className="font-medium text-[#5F7053]">Free Delivery</h3>
            <p className="text-sm text-[#5F7053]/70">On orders above $20</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 p-4 bg-white shadow-sm rounded-xl"
        >
          <div className="w-10 h-10 rounded-lg bg-[#5F7053]/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-[#5F7053]" />
          </div>
          <div>
            <h3 className="font-medium text-[#5F7053]">Quality Products</h3>
            <p className="text-sm text-[#5F7053]/70">Certified containers</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 p-4 bg-white shadow-sm rounded-xl"
        >
          <div className="w-10 h-10 rounded-lg bg-[#5F7053]/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#5F7053]" />
          </div>
          <div>
            <h3 className="font-medium text-[#5F7053]">Secure Purchase</h3>
            <p className="text-sm text-[#5F7053]/70">100% money back</p>
          </div>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {containers.map((container, index) => (
          <motion.div
            key={container.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-2xl group hover:shadow-lg"
          >
            {container.popular && (
              <div className="bg-[#5F7053] text-white text-sm text-center py-1 px-4">
                Most Popular Choice
              </div>
            )}
            
            {/* Product Image */}
            <div className="relative p-8 flex items-center justify-center bg-[#F8F9FA]">
              <img 
                src={container.image} 
                alt={container.name}
                className="object-contain h-48 transition-transform duration-300 transform group-hover:scale-105"
              />
              {container.popular && (
                <div className="absolute top-4 right-4 bg-[#FFCE31] text-[#5F7053] text-xs font-bold px-3 py-1 rounded-full">
                  BEST SELLER
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#5F7053]">
                  {container.name}
                </h3>
                <p className="text-sm text-[#5F7053]/70 mt-1">
                  {container.description}
                </p>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#5F7053]">
                    ${container.price}
                  </span>
                  <span className="text-[#5F7053]/70">
                    / {container.capacity}
                  </span>
                </div>
                {container.inStock ? (
                  <span className="text-sm text-green-500">In Stock</span>
                ) : (
                  <span className="text-sm text-red-500">Out of Stock</span>
                )}
              </div>

              {cartItems[container.id] ? (
                <div className="flex items-center justify-between bg-[#5F7053]/10 p-2 rounded-xl">
                  <button
                    onClick={() => updateQuantity(container.id, 'decrease')}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-[#5F7053]/5 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-[#5F7053]" />
                  </button>
                  <span className="font-medium text-[#5F7053]">
                    {cartItems[container.id]}
                  </span>
                  <button
                    onClick={() => updateQuantity(container.id, 'increase')}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-[#5F7053]/5 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#5F7053]" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => updateQuantity(container.id, 'increase')}
                  className="w-full p-3 rounded-xl bg-[#5F7053] text-white hover:bg-[#5F7053]/90 transition-colors flex items-center justify-center gap-2"
                  disabled={!container.inStock}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BuyContainers;
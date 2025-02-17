// src/context/OrdersContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const STORAGE_KEY = 'tadweer_orders';

export interface Order {
  id: string;
  volume: string;
  collectionDate: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  notes?: string;
  customerNotes?: string;
  estimatedTime?: string;
  assignedDriver?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status'], notes?: string) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  deleteOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  clearOrders: () => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem(STORAGE_KEY);
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Error loading orders from localStorage:', error);
      return [];
    }
  });

  // Save to localStorage whenever orders change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }, [orders]);

  const addOrder = (newOrder: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const order: Order = {
      ...newOrder,
      id: `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], notes?: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              status,
              notes: notes ? `${order.notes ? order.notes + '\n' : ''}${notes}` : order.notes,
              updatedAt: new Date().toISOString()
            }
          : order
      )
    );
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              ...updates,
              updatedAt: new Date().toISOString()
            }
          : order
      )
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const clearOrders = () => {
    setOrders([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <OrdersContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      updateOrder,
      deleteOrder,
      getOrderById,
      clearOrders
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
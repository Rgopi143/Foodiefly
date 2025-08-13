import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Restaurant, FoodItem, CartItem, Order } from '../types';

interface AppContextType {
  restaurants: Restaurant[];
  foodItems: FoodItem[];
  cart: CartItem[];
  orders: Order[];
  currentUser: any;
  addToCart: (item: FoodItem, restaurant: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status'], deliveryBoyId?: string) => void;
  setRestaurants: (restaurants: Restaurant[]) => void;
  setFoodItems: (items: FoodItem[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser, setCurrentUser] = useState(null);

  const addToCart = (item: FoodItem, restaurant: Restaurant) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.foodItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.foodItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { foodItem: item, quantity: 1, restaurant }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.foodItem.id !== itemId));
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.foodItem.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setOrders(prev => [...prev, newOrder]);
    
    // Simulate real-time notification to delivery partners
    setTimeout(() => {
      // This would typically be handled by a real-time system like Firebase or WebSockets
      console.log('📱 Notification sent to delivery partners:', {
        orderId: newOrder.id,
        restaurantId: newOrder.restaurantId,
        total: newOrder.total,
        location: newOrder.deliveryAddress
      });
    }, 1000);
    
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], deliveryBoyId?: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status, 
            deliveryBoyId: deliveryBoyId || order.deliveryBoyId,
            updatedAt: new Date(),
            estimatedDeliveryTime: status === 'picked-up' ? '15-20 mins' : order.estimatedDeliveryTime
          }
        : order
    ));
  };
  return (
    <AppContext.Provider
      value={{
        restaurants,
        foodItems,
        cart,
        orders,
        currentUser,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        placeOrder,
        updateOrderStatus,
        setRestaurants,
        setFoodItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
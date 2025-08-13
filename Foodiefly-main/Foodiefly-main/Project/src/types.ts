export interface Restaurant {
  id: string;
  name: string;
  image: string;
  category: 'veg' | 'non-veg' | 'both';
  rating: number;
  deliveryTime: string;
  location: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

export interface FoodItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'veg' | 'non-veg' | 'snacks' | 'drinks';
  isAvailable: boolean;
  ingredients: string[];
  createdAt: Date;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  restaurant: Restaurant;
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'picked-up' | 'delivered' | 'cancelled';
  paymentMethod: 'upi' | 'phonepe' | 'paytm' | 'cod';
  deliveryAddress: string;
  customerPhone: string;
  deliveryBoyId?: string;
  estimatedDeliveryTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryBoy {
  id: string;
  name: string;
  phone: string;
  location: { lat: number; lng: number };
  isAvailable: boolean;
  currentOrders: string[];
  rating: number;
}
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, CheckCircle, Navigation, User, Star, Package, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, DeliveryBoy } from '../types';

const DeliveryDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [deliveryBoy] = useState<DeliveryBoy>({
    id: 'db1',
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    location: { lat: 12.9716, lng: 77.5946 },
    isAvailable: true,
    currentOrders: [],
    rating: 4.8,
  });

  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'available' | 'accepted'>('available');
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const available = orders.filter(order => 
      order.status === 'ready' && !order.deliveryBoyId
    );
    const accepted = orders.filter(order => 
      order.deliveryBoyId === deliveryBoy.id && 
      ['picked-up', 'ready'].includes(order.status)
    );
    
    setAvailableOrders(available);
    setAcceptedOrders(accepted);
    
    // Check for new orders and show notifications
    const newOrders = available.filter(order => {
      const orderTime = new Date(order.createdAt).getTime();
      const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
      return orderTime > fiveMinutesAgo;
    });
    
    if (newOrders.length > 0) {
      const newNotifications = newOrders.map(order => 
        `New order #${order.id} available for pickup - ₹${calculateEarnings(order)} earnings`
      );
      setNotifications(prev => [...newNotifications, ...prev].slice(0, 10)); // Keep last 10 notifications
      
      // Show browser notification if permission granted
      if (Notification.permission === 'granted') {
        new Notification('New Delivery Order Available!', {
          body: `Order #${newOrders[0].id} - Earn ₹${calculateEarnings(newOrders[0])}`,
          icon: '/vite.svg'
        });
      }
    }
  }, [orders, deliveryBoy.id]);

  // Request notification permission on component mount
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'picked-up', deliveryBoy.id);
    
    // Add notification for accepted order
    setNotifications(prev => [`You accepted order #${orderId}`, ...prev].slice(0, 10));
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
      <div class="flex items-center">
        <div class="mr-3">✅</div>
        <div>
          <div class="font-semibold">Order Accepted!</div>
          <div class="text-sm">Navigate to restaurant for pickup</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 4000);
  };

  const handleCompleteDelivery = (orderId: string) => {
    updateOrderStatus(orderId, 'delivered');
    
    // Show completion notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
      <div class="flex items-center">
        <div class="mr-3">🎉</div>
        <div>
          <div class="font-semibold">Delivery Completed!</div>
          <div class="text-sm">Payment processed successfully</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 4000);
  };

  const calculateDistance = () => {
    // Mock distance calculation
    return (Math.random() * 5 + 1).toFixed(1);
  };

  const calculateEarnings = (order: Order) => {
    // Delivery fee calculation (typically 10-15% of order value or fixed amount)
    return Math.max(30, Math.floor(order.total * 0.12));
  };

  const formatINR = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{deliveryBoy.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{deliveryBoy.rating}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>{deliveryBoy.phone}</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    deliveryBoy.isAvailable ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span>{deliveryBoy.isAvailable ? 'Available' : 'Busy'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end mb-2">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
                >
                  <Bell className="w-6 h-6" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="p-4 text-gray-500 text-center">No new notifications</div>
                    ) : (
                      <div className="divide-y">
                        {notifications.map((notification, index) => (
                          <div key={index} className="p-3 hover:bg-gray-50">
                            <p className="text-sm text-gray-700">{notification}</p>
                            <p className="text-xs text-gray-500 mt-1">Just now</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="p-3 border-t">
                      <button
                        onClick={() => setNotifications([])}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Clear all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ₹{acceptedOrders.reduce((sum, order) => sum + calculateEarnings(order), 0)}
            </div>
            <div className="text-sm text-gray-600">Today's Earnings</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{acceptedOrders.length}</div>
              <div className="text-sm text-gray-600">Active Orders</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Completed Today</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">18 min</div>
              <div className="text-sm text-gray-600">Avg Delivery Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('available')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'available'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Available Orders ({availableOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('accepted')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'accepted'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          My Orders ({acceptedOrders.length})
        </button>
      </div>

      {/* Available Orders */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          {availableOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {notifications.length > 0 ? 'All Orders Accepted!' : 'No Orders Available'}
              </h3>
              <p className="text-gray-600">
                {notifications.length > 0 
                  ? 'Great job! Check "My Orders" tab for active deliveries' 
                  : 'You will be notified when new orders are available'
                }
              </p>
            </div>
          ) : (
            availableOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Order #{order.id}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{calculateDistance()} km away</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Ready for pickup</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      ₹{formatINR(calculateEarnings(order))}
                    </div>
                    <div className="text-sm text-gray-600">Delivery Fee</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Pickup Location</h4>
                    <p className="text-sm text-gray-600">Restaurant Name</p>
                    <p className="text-sm text-gray-600">MG Road, Bangalore</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                    <div className="flex items-center mt-2">
                      <Phone className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{order.customerPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Order Value: {formatINR(order.total)} • Items: {order.items.length}
                  </div>
                  <button
                    onClick={() => handleAcceptOrder(order.id)}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Accept Order</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Accepted Orders */}
      {activeTab === 'accepted' && (
        <div className="space-y-4">
          {acceptedOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Orders</h3>
              <p className="text-gray-600">Accept orders from the available tab to start delivering</p>
            </div>
          ) : (
            acceptedOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Order #{order.id}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'picked-up' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {order.status === 'picked-up' ? 'In Transit' : 'Ready for Pickup'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      ₹{formatINR(calculateEarnings(order))}
                    </div>
                    <div className="text-sm text-gray-600">Your Earnings</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                    <p className="text-sm text-gray-600 mb-1">Order Value: {formatINR(order.total)}</p>
                    <p className="text-sm text-gray-600 mb-1">Items: {order.items.length}</p>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{order.customerPhone}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                    <div className="flex items-center mt-2">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{calculateDistance()} km away</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <Navigation className="w-4 h-4" />
                    <span>Navigate</span>
                  </button>
                  
                  {order.status === 'picked-up' && (
                    <button
                      onClick={() => handleCompleteDelivery(order.id)}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark as Delivered</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryDashboard;
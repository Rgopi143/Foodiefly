import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface OrderTrackingProps {
  onBack: () => void;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ onBack }) => {
  const { orders } = useApp();
  const [selectedOrder] = useState(orders && orders.length > 0 ? orders[0] : null);

  const statusSteps = [
    { id: 'pending', label: 'Order Placed', icon: CheckCircle },
    { id: 'accepted', label: 'Accepted', icon: CheckCircle },
    { id: 'preparing', label: 'Preparing', icon: Clock },
    { id: 'ready', label: 'Ready for Pickup', icon: CheckCircle },
    { id: 'picked-up', label: 'Picked Up', icon: MapPin },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const currentStepIndex = selectedOrder
    ? statusSteps.findIndex(step => step.id === selectedOrder.status)
    : -1;

  const deliveryBoy = {
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    rating: 4.8,
    location: 'Near City Mall',
    estimatedTime: '15 mins'
  };

  if (!selectedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
          <p className="text-gray-600">Place your first order to see tracking information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Tracking</h2>
        
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-sm text-gray-600">Order ID: #{selectedOrder.id}</div>
            <div className="text-sm text-gray-600">Total: ₹{selectedOrder.total}</div>
          </div>
          
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.id} className={`flex items-center space-x-4 ${
                  isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className={`flex-1 ${isCurrent ? 'font-semibold' : ''}`}>
                    {step.label}
                    {isCurrent && <span className="ml-2 text-xs text-orange-600">Current</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {selectedOrder.status === 'picked-up' && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">Delivery Partner</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-blue-900">{deliveryBoy.name}</div>
                <div className="text-sm text-blue-700">⭐ {deliveryBoy.rating}</div>
                <div className="text-sm text-blue-700">📍 {deliveryBoy.location}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-900">ETA: {deliveryBoy.estimatedTime}</div>
                <button
                  className="mt-2 flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                  onClick={() => window.open(`tel:${deliveryBoy.phone.replace(/\s+/g, '')}`)}
                  type="button"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Call</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
          <div className="space-y-2">
            {selectedOrder.items.map((item: any) => (
              <div key={item.foodItem.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.foodItem.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-medium">₹{item.foodItem.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Delivery Address</span>
          </div>
          <p className="text-gray-700 ml-7">{selectedOrder.deliveryAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CheckoutProps {
  onBack: () => void;
  onOrderPlaced: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack, onOrderPlaced }) => {
  const { cart, placeOrder } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'cod'>('cod');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  
  const total = cart.reduce((sum, item) => sum + (item.foodItem.price * item.quantity), 0);
  const deliveryFee = 30;
  const finalTotal = total + deliveryFee;

  const handlePlaceOrder = () => {
    setPhoneError(null);
    if (!address || !phone) {
      alert('Please fill in all required fields');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;
    }

    const order = {
      customerId: 'user123',
      restaurantId: cart[0]?.restaurant.id || '',
      items: cart,
      total: finalTotal,
      status: 'ready' as const,
      paymentMethod,
      deliveryAddress: address,
      customerPhone: phone,
    };

    placeOrder(order);

    // Send order details to WhatsApp via backend
    fetch('http://localhost:5000/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderDetails: `Order for ${address}, Phone: ${phone}, Total: ₹${finalTotal}`,
        toNumber: '+919381686209'
      })
    });
    
    // Simulate sending notification to delivery boys
    const deliveryNotification = document.createElement('div');
    deliveryNotification.className = 'fixed top-4 left-4 bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
    deliveryNotification.innerHTML = `
      <div class="flex items-center">
        <div class="mr-3">🚚</div>
        <div>
          <div class="font-semibold">Delivery Partner Notified!</div>
          <div class="text-sm">Looking for available delivery partner...</div>
        </div>
      </div>
    `;
    document.body.appendChild(deliveryNotification);
    setTimeout(() => document.body.removeChild(deliveryNotification), 4000);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
      <div class="flex items-center">
        <div class="mr-3">✅</div>
        <div>
          <div class="font-semibold">Order Placed Successfully!</div>
          <div class="text-sm">Restaurant and delivery partner will be notified</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 5000);
    
    onOrderPlaced();
  };

  const paymentOptions = [
    { id: 'cod', name: 'Cash on Delivery', icon: DollarSign, description: 'Pay when delivered' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Cart</span>
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Address *
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your complete address..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={phone}
              maxLength={10}
              pattern="[0-9]*"
              inputMode="numeric"
              onChange={(e) => {
                // Only allow digits
                const value = e.target.value.replace(/[^0-9]/g, '');
                setPhone(value);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your phone number..."
            />
            {phoneError && <div className="text-red-600 text-sm mt-1">{phoneError}</div>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              {paymentOptions.map(option => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setPaymentMethod(option.id as any)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      paymentMethod === option.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">₹{total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Delivery Fee:</span>
              <span className="font-semibold">₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>
          
          <button
            onClick={handlePlaceOrder}
            className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-lg font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
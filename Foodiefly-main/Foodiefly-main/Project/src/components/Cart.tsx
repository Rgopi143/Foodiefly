import React from 'react';
import { Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CartProps {
  onBack: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ onBack, onCheckout }) => {
  const { cart, updateCartItemQuantity, removeFromCart } = useApp();
  
  const total = cart.reduce((sum, item) => sum + (item.foodItem.price * item.quantity), 0);
  const deliveryFee = 30;
  const finalTotal = total + deliveryFee;

  if (cart.length === 0) {
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
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-4">Add some delicious food to get started!</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Start Shopping
          </button>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>
        
        <div className="space-y-4 mb-6">
          {cart.map(item => (
            <div key={item.foodItem.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img
                src={item.foodItem.image}
                alt={item.foodItem.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.foodItem.name}</h3>
                <p className="text-sm text-gray-600">{item.restaurant.name}</p>
                <p className="text-lg font-bold text-gray-900">₹{item.foodItem.price}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateCartItemQuantity(item.foodItem.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => updateCartItemQuantity(item.foodItem.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.foodItem.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
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
          onClick={onCheckout}
          className="w-full mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-lg font-semibold"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
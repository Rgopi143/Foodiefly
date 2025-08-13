import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { FoodItem, Restaurant } from '../types';
import { useApp } from '../context/AppContext';

interface FoodItemCardProps {
  item: FoodItem;
  restaurant: Restaurant;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ item, restaurant }) => {
  const { cart, addToCart, updateCartItemQuantity } = useApp();
  const cartItem = cart.find(cartItem => cartItem.foodItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(item, restaurant);
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-bounce';
    notification.textContent = 'Added to cart! Proceed to checkout';
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex">
        <img
          src={item.image}
          alt={item.name}
          className="w-32 h-32 object-cover flex-shrink-0"
        />
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${
                item.category === 'veg' ? 'bg-green-500' : 'bg-red-500'
              } mr-2`}></div>
              <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {item.ingredients.slice(0, 3).join(', ')}
              {item.ingredients.length > 3 && '...'}
            </div>
            
            {quantity > 0 ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateCartItemQuantity(item.id, quantity - 1)}
                  className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium text-gray-900">{quantity}</span>
                <button
                  onClick={() => updateCartItemQuantity(item.id, quantity + 1)}
                  className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
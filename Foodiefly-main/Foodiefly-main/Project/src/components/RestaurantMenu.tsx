import React, { useState } from 'react';
import { ArrowLeft, Filter } from 'lucide-react';
import FoodItemCard from './FoodItemCard';
import { Restaurant, FoodItem } from '../types';
import { useApp } from '../context/AppContext';

interface RestaurantMenuProps {
  restaurant: Restaurant;
  foodItems: FoodItem[];
  onBack: () => void;
}

const RestaurantMenu: React.FC<RestaurantMenuProps> = ({ restaurant, onBack }) => {
  const { foodItems } = useApp();
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'veg' | 'non-veg' | 'snacks' | 'drinks'>('all');

  const filteredItems = foodItems.filter(item => {
    return item.restaurantId === restaurant.id && 
           (categoryFilter === 'all' || item.category === categoryFilter) &&
           item.isAvailable;
  });

  const categories = ['all', 'veg', 'non-veg', 'snacks', 'drinks'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cover photo banner */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
              <p className="text-gray-600 mt-2">{restaurant.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-500">⭐ {restaurant.rating}</span>
                <span className="text-sm text-gray-500">🚚 {restaurant.deliveryTime}</span>
                <span className="text-sm text-gray-500">📍 {restaurant.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category as 'all' | 'veg' | 'non-veg' | 'snacks' | 'drinks')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoryFilter === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredItems.map(item => (
          <FoodItemCard
            key={item.id}
            item={item}
            restaurant={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
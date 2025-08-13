import React, { useState } from 'react';
import { Plus, Edit, Trash2, UtensilsCrossed, Package, TrendingUp, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Restaurant, FoodItem } from '../types';

const RestaurantPortal: React.FC = () => {
  const { restaurants, foodItems, orders, setRestaurants, setFoodItems, updateOrderStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'orders'>('overview');
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    image: '',
    category: 'both' as 'veg' | 'non-veg' | 'both',
    rating: 4.0,
    deliveryTime: '30-45 mins',
    location: '',
    description: '',
  });

  const [itemForm, setItemForm] = useState({
    restaurantId: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'veg' as 'veg' | 'non-veg' | 'snacks' | 'drinks',
    ingredients: '',
  });

  const handleAddRestaurant = () => {
    const newRestaurant: Restaurant = {
      id: Date.now().toString(),
      ...restaurantForm,
      isActive: true,
      createdAt: new Date(),
    };
    setRestaurants([...restaurants, newRestaurant]);
    setRestaurantForm({
      name: '',
      image: '',
      category: 'both',
      rating: 4.0,
      deliveryTime: '30-45 mins',
      location: '',
      description: '',
    });
    setShowAddRestaurant(false);
  };

  const handleAddItem = () => {
    const newItem: FoodItem = {
      id: Date.now().toString(),
      ...itemForm,
      price: Number(itemForm.price),
      ingredients: itemForm.ingredients.split(',').map(i => i.trim()),
      isAvailable: true,
      createdAt: new Date(),
    };
    setFoodItems([...foodItems, newItem]);
    setItemForm({
      restaurantId: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'veg',
      ingredients: '',
    });
    setShowAddItem(false);
  };

  const deleteRestaurant = (id: string) => {
    setRestaurants(restaurants.filter(r => r.id !== id));
    setFoodItems(foodItems.filter(item => item.restaurantId !== id));
  };

  const deleteItem = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const restaurantOrders = orders.filter(order => 
    restaurants.some(restaurant => restaurant.id === order.restaurantId)
  );

  const todayOrders = restaurantOrders.filter(order => {
    const today = new Date().toDateString();
    return new Date(order.createdAt).toDateString() === today;
  });

  const totalRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-orange-600">🍽️</div>
              <h1 className="text-2xl font-bold text-gray-900">FoodFly - Restaurant Portal</h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Overview
              </button>
              
              <button
                onClick={() => setActiveTab('menu')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'menu' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4 inline mr-1" />
                Menu Management
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Package className="w-4 h-4 inline mr-1" />
                Orders ({restaurantOrders.filter(o => o.status === 'pending').length})
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{todayOrders.length}</div>
                    <div className="text-sm text-gray-600">Today's Orders</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">₹{totalRevenue}</div>
                    <div className="text-sm text-gray-600">Today's Revenue</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <UtensilsCrossed className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{foodItems.length}</div>
                    <div className="text-sm text-gray-600">Menu Items</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">25 min</div>
                    <div className="text-sm text-gray-600">Avg Prep Time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Your Restaurants</h3>
                <button
                  onClick={() => setShowAddRestaurant(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Restaurant</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                  <div key={restaurant.id} className="bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{restaurant.name}</h4>
                      <p className="text-gray-600 text-sm mb-3">{restaurant.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          ⭐ {restaurant.rating} • {restaurant.deliveryTime}
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteRestaurant(restaurant.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Menu Management Tab */}
        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Menu Management</h2>
              <button
                onClick={() => setShowAddItem(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Menu Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {foodItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="flex">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            item.category === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Management</h2>
            
            <div className="space-y-4">
              {restaurantOrders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
                  <p className="text-gray-600">Orders will appear here when customers place them</p>
                </div>
              ) : (
                restaurantOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Order #{order.id}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'preparing' ? 'bg-orange-100 text-orange-800' :
                            order.status === 'ready' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">₹{order.total}</div>
                        <div className="text-sm text-gray-600">{order.items.length} items</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                      <div className="space-y-1">
                        {order.items.map(item => (
                          <div key={item.foodItem.id} className="flex justify-between text-sm">
                            <span>{item.foodItem.name} x{item.quantity}</span>
                            <span>₹{item.foodItem.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Customer: {order.customerPhone} • {order.deliveryAddress}
                      </div>
                      
                      {order.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateOrderStatus(order.id, 'accepted')}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      
                      {order.status === 'accepted' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Start Preparing
                        </button>
                      )}
                      
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Mark Ready
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Restaurant Modal */}
      {showAddRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Restaurant</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Restaurant Name"
                value={restaurantForm.name}
                onChange={(e) => setRestaurantForm({...restaurantForm, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={restaurantForm.image}
                onChange={(e) => setRestaurantForm({...restaurantForm, image: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <textarea
                placeholder="Description"
                value={restaurantForm.description}
                onChange={(e) => setRestaurantForm({...restaurantForm, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
              />
              <input
                type="text"
                placeholder="Location"
                value={restaurantForm.location}
                onChange={(e) => setRestaurantForm({...restaurantForm, location: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <select
                value={restaurantForm.category}
                onChange={(e) => setRestaurantForm({...restaurantForm, category: e.target.value as any})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="both">Both</option>
              </select>
              <div className="flex space-x-4">
                <button
                  onClick={handleAddRestaurant}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Add Restaurant
                </button>
                <button
                  onClick={() => setShowAddRestaurant(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Menu Item</h3>
            <div className="space-y-4">
              <select
                value={itemForm.restaurantId}
                onChange={(e) => setItemForm({...itemForm, restaurantId: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select Restaurant</option>
                {restaurants.map(restaurant => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Item Name"
                value={itemForm.name}
                onChange={(e) => setItemForm({...itemForm, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <textarea
                placeholder="Description"
                value={itemForm.description}
                onChange={(e) => setItemForm({...itemForm, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
              />
              <input
                type="number"
                placeholder="Price"
                value={itemForm.price}
                onChange={(e) => setItemForm({...itemForm, price: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={itemForm.image}
                onChange={(e) => setItemForm({...itemForm, image: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <select
                value={itemForm.category}
                onChange={(e) => setItemForm({...itemForm, category: e.target.value as any})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="snacks">Snacks</option>
                <option value="drinks">Drinks</option>
              </select>
              <input
                type="text"
                placeholder="Ingredients (comma separated)"
                value={itemForm.ingredients}
                onChange={(e) => setItemForm({...itemForm, ingredients: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <div className="flex space-x-4">
                <button
                  onClick={handleAddItem}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Add Item
                </button>
                <button
                  onClick={() => setShowAddItem(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPortal;
/**
 * FoodFly - Multi-Platform Food Delivery System
 * Copyright © 2025 Ranbridge Services Private Limited. All rights reserved.
 * 
 * Developed by Ranbridge Services Private Limited
 * This software is proprietary and confidential.
 */

import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import RestaurantList from './components/RestaurantList';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderTracking from './components/OrderTracking';
import { useApp } from './context/AppContext';
import { Restaurant } from './types';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';

const AppContent: React.FC = () => {
  const { setRestaurants, setFoodItems, currentUser } = useApp();
  const [currentView, setCurrentView] = useState(currentUser ? 'home' : 'auth');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    // Initialize with sample data
    const sampleRestaurants = [
      {
        id: '1',
        name: 'Adhirathi Family Restaurant',
        image: 'https://lh3.googleusercontent.com/p/AF1QipOQnQwQn6QwQn6QwQn6QwQn6QwQn6QwQn6QwQn6=s680-w680-h510', // Updated cover photo
        category: 'both' as const,
        rating: 4.3,
        deliveryTime: '30-45 mins',
        location: 'NH 567, Prathipadu',
        description: 'Multi-cuisine family restaurant with a wide variety of veg and non-veg dishes, biryanis, tandoori, and more.',
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Thirumala Restaurant',
        image: 'https://lh3.googleusercontent.com/p/AF1QipOQnQwQn6QwQn6QwQn6QwQn6QwQn6QwQn6QwQn6=s680-w680-h510', // Updated with provided restaurant photo
        category: 'both' as const,
        rating: 4.2,
        deliveryTime: '30-40 mins',
        location: 'Main Road',
        description: 'Classic South and North Indian, Chinese, and Tandoori food. Family-friendly and pure taste!',
        isActive: true,
        createdAt: new Date(),
      },
    ];

    const sampleFoodItems = [
      // Adhirathi Family Restaurant items (id: '1')
      // Soups
      { id: '1', restaurantId: '1', name: 'Sweet Corn Soup', description: 'Classic sweet corn soup.', price: 79, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Corn', 'Vegetables'], createdAt: new Date() },
      { id: '2', restaurantId: '1', name: 'Chicken Corn Soup', description: 'Chicken and corn soup.', price: 119, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Corn'], createdAt: new Date() },
      // Mandi
      { id: '3', restaurantId: '1', name: 'Adhirathi Spl Mandi Biryani', description: 'Special mandi biryani.', price: 900, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Rice', 'Chicken', 'Spices'], createdAt: new Date() },
      { id: '4', restaurantId: '1', name: 'Mixed Mandi Biryani', description: 'Mixed meat mandi biryani.', price: 1299, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Rice', 'Meat', 'Spices'], createdAt: new Date() },
      // Family Pack Biryani
      { id: '5', restaurantId: '1', name: 'Chicken Family Pack Biryani', description: 'Family pack chicken biryani.', price: 500, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Rice', 'Spices'], createdAt: new Date() },
      // Veg Biryani
      { id: '6', restaurantId: '1', name: 'Veg Biryani', description: 'Vegetable biryani.', price: 150, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Rice', 'Vegetables', 'Spices'], createdAt: new Date() },
      // Non Veg Biryani
      { id: '7', restaurantId: '1', name: 'Chicken Fry Biryani', description: 'Chicken fry biryani.', price: 200, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Rice', 'Spices'], createdAt: new Date() },
      { id: '8', restaurantId: '1', name: 'Mutton Dum Biryani', description: 'Mutton dum biryani.', price: 300, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Mutton', 'Rice', 'Spices'], createdAt: new Date() },
      // Non Veg Starters
      { id: '9', restaurantId: '1', name: 'Chicken Lollipop', description: 'Crispy chicken lollipop.', price: 100, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Spices'], createdAt: new Date() },
      { id: '10', restaurantId: '1', name: 'Chicken 65', description: 'Spicy chicken 65.', price: 150, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Spices'], createdAt: new Date() },
      // Veg Starters
      { id: '11', restaurantId: '1', name: 'Paneer 65', description: 'Paneer 65 starter.', price: 190, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Paneer', 'Spices'], createdAt: new Date() },
      { id: '12', restaurantId: '1', name: 'Gobi Manchurian', description: 'Gobi Manchurian.', price: 180, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Cauliflower', 'Spices'], createdAt: new Date() },
      // Non Veg Gravy
      { id: '13', restaurantId: '1', name: 'Chicken Curry (Boneless)', description: 'Boneless chicken curry.', price: 229, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Spices'], createdAt: new Date() },
      { id: '14', restaurantId: '1', name: 'Mutton Curry', description: 'Mutton curry.', price: 249, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Mutton', 'Spices'], createdAt: new Date() },
      // Veg Gravy
      { id: '15', restaurantId: '1', name: 'Paneer Butter Masala', description: 'Paneer butter masala.', price: 189, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Paneer', 'Butter', 'Spices'], createdAt: new Date() },
      { id: '16', restaurantId: '1', name: 'Dal Fry', description: 'Dal fry.', price: 89, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Dal', 'Spices'], createdAt: new Date() },
      // Rice
      { id: '17', restaurantId: '1', name: 'Chicken Fried Rice', description: 'Chicken fried rice.', price: 189, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Rice', 'Spices'], createdAt: new Date() },
      { id: '18', restaurantId: '1', name: 'Veg Fried Rice', description: 'Veg fried rice.', price: 139, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Rice', 'Vegetables', 'Spices'], createdAt: new Date() },
      // Tandoori
      { id: '19', restaurantId: '1', name: 'Tangedi Kabab', description: 'Tangedi kabab.', price: 300, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Spices'], createdAt: new Date() },
      { id: '20', restaurantId: '1', name: 'Paneer Tikka', description: 'Paneer tikka.', price: 299, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Paneer', 'Spices'], createdAt: new Date() },
      // Indian Bread
      { id: '21', restaurantId: '1', name: 'Butter Naan', description: 'Butter naan.', price: 35, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Flour', 'Butter'], createdAt: new Date() },
      { id: '22', restaurantId: '1', name: 'Roti', description: 'Roti.', price: 20, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Flour'], createdAt: new Date() },
      // Desserts & Drinks
      { id: '23', restaurantId: '1', name: 'Amul Ice Cream', description: 'Amul ice cream.', price: 12, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'drinks' as const, isAvailable: true, ingredients: ['Milk', 'Sugar'], createdAt: new Date() },
      { id: '24', restaurantId: '1', name: 'Lassi', description: 'Lassi.', price: 40, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'drinks' as const, isAvailable: true, ingredients: ['Curd', 'Sugar'], createdAt: new Date() },
      // Thirumala Restaurant items (id: '2')
      // South Indian
      { id: '101', restaurantId: '2', name: 'Idly', description: 'Steamed rice cakes.', price: 30, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Rice', 'Urad Dal'], createdAt: new Date() },
      { id: '102', restaurantId: '2', name: 'Vada', description: 'Crispy fried lentil doughnuts.', price: 30, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Lentils', 'Spices'], createdAt: new Date() },
      { id: '103', restaurantId: '2', name: 'Dosa', description: 'Thin crispy rice crepe.', price: 40, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Rice', 'Urad Dal'], createdAt: new Date() },
      // Rice Items
      { id: '104', restaurantId: '2', name: 'Veg Fried Rice', description: 'Fried rice with vegetables.', price: 80, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Rice', 'Vegetables'], createdAt: new Date() },
      { id: '105', restaurantId: '2', name: 'Egg Fried Rice', description: 'Fried rice with egg.', price: 90, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Rice', 'Egg'], createdAt: new Date() },
      // Chicken Curry Items
      { id: '106', restaurantId: '2', name: 'Chicken Curry', description: 'Spicy chicken curry.', price: 120, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Spices'], createdAt: new Date() },
      { id: '107', restaurantId: '2', name: 'Chicken Fry', description: 'Fried chicken pieces.', price: 130, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Spices'], createdAt: new Date() },
      // Egg Items
      { id: '108', restaurantId: '2', name: 'Egg Curry', description: 'Eggs cooked in spicy gravy.', price: 60, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Egg', 'Spices'], createdAt: new Date() },
      { id: '109', restaurantId: '2', name: 'Egg Masala', description: 'Eggs in masala gravy.', price: 70, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Egg', 'Spices'], createdAt: new Date() },
      // Biryani Items
      { id: '110', restaurantId: '2', name: 'Veg Biryani', description: 'Vegetable biryani.', price: 90, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'veg' as const, isAvailable: true, ingredients: ['Rice', 'Vegetables', 'Spices'], createdAt: new Date() },
      { id: '111', restaurantId: '2', name: 'Chicken Biryani', description: 'Chicken biryani.', price: 120, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=500', category: 'non-veg' as const, isAvailable: true, ingredients: ['Chicken', 'Rice', 'Spices'], createdAt: new Date() },
    ];

    setRestaurants(sampleRestaurants);
    setFoodItems(sampleFoodItems);
  }, [setRestaurants, setFoodItems]);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('menu');
  };

  const handleBackToHome = () => {
    setSelectedRestaurant(null);
    setCurrentView('home');
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedRestaurant(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentView={currentView} onViewChange={handleViewChange} />
      {currentView === 'auth' && <AuthPage onBack={() => setCurrentView('home')} />}
      {currentView === 'home' && (
        <RestaurantList 
          restaurants={[]} 
          onRestaurantClick={handleRestaurantClick}
        />
      )}
      {currentView === 'menu' && selectedRestaurant && (
        <RestaurantMenu
          restaurant={selectedRestaurant}
          foodItems={[]}
          onBack={handleBackToHome}
        />
      )}
      {currentView === 'cart' && (
        <Cart
          onBack={handleBackToHome}
          onCheckout={() => setCurrentView('checkout')}
        />
      )}
      {currentView === 'checkout' && (
        <Checkout
          onBack={() => setCurrentView('cart')}
          onOrderPlaced={() => setCurrentView('orders')}
        />
      )}
      {currentView === 'orders' && (
        <OrderTracking onBack={handleBackToHome} />
      )}
      {currentView === 'profile' && (
        <ProfilePage user={currentUser} onBack={handleBackToHome} />
      )}
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
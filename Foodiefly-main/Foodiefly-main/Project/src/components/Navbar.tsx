import React, { useEffect, useState } from 'react';
import { ShoppingCart, User, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  const { cart, currentUser } = useApp();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-orange-600">🍕</div>
            <h1 className="text-2xl font-bold text-gray-900">FoodFly</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onViewChange('home')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentView === 'home' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-orange-100'}`}
            >
              Home
            </button>
            
            <button
              onClick={() => onViewChange('orders')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'orders' 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User className="w-4 h-4 inline mr-1" />
             My Orders
            </button>
            
            <button
              onClick={() => onViewChange('cart')}
              className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'cart' 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ShoppingCart className="w-5 h-5 inline mr-1" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {currentUser && (
              <button
                onClick={() => onViewChange('profile')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'profile' 
                    ? 'bg-orange-100 text-orange-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Profile
              </button>
            )}

            {/* Show Profile if logged in, else Login / Signup */}
            {currentUser ? (
              <button
                onClick={() => onViewChange('profile')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentView === 'profile' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-orange-100'}`}
              >
                Profile
              </button>
            ) : (
              <button
                onClick={() => onViewChange('auth')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentView === 'auth' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-orange-100'}`}
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
/**
 * FoodFly - Restaurant Portal
 * Copyright © 2025 Ranbridge Services Private Limited. All rights reserved.
 * 
 * Developed by Ranbridge Services Private Limited
 * This software is proprietary and confidential.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import RestaurantPortal from './components/RestaurantPortal';
import './index.css';

const RestaurantApp = () => {
  return (
    <AppProvider>
      <RestaurantPortal />
    </AppProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RestaurantApp />
  </StrictMode>
);
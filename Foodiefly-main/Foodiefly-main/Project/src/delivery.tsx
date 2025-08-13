/**
 * FoodFly - Delivery Dashboard
 * Copyright © 2025 Ranbridge Services Private Limited. All rights reserved.
 * 
 * Developed by Ranbridge Services Private Limited
 * This software is proprietary and confidential.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import DeliveryDashboard from './components/DeliveryDashboard';
import './index.css';

const DeliveryApp = () => {
  return (
    <AppProvider>
      <DeliveryDashboard />
    </AppProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeliveryApp />
  </StrictMode>
);
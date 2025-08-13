import { useApp } from '../context/AppContext';

export const useRestaurants = () => {
  const { restaurants } = useApp();
  return restaurants;
};
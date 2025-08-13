import { useApp } from '../context/AppContext';

export const useFoodItems = () => {
  const { foodItems } = useApp();
  return foodItems;
};
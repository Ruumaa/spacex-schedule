import { CommentData } from './types';

export const useLocalStorage = (key: string) => {
  // setItem
  const setItem = (value: CommentData) => {
    try {
      const existingItems = getItem();
      const updatedItem = existingItems!.concat(value);
      window.localStorage.setItem(key, JSON.stringify(updatedItem));
    } catch (error) {
      console.error('Error at setItem', error);
    }
  };

  // getItem
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error at getItem', error);
      return [];
    }
  };

  // removeItem
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Error at removeItem', error);
    }
  };

  return { setItem, getItem, removeItem };
};

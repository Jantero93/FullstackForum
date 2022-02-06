import { User } from '../contexts/UserContext';

export const saveToLocalStorage = (key: string, obj: unknown): void =>
  localStorage.setItem(key, JSON.stringify(obj));

export const getItemFromLocalStorage = (key: string): null | User => {
  const item: unknown = localStorage.getItem(key);

  if (!item) return null;

  return JSON.parse(item as string);
};

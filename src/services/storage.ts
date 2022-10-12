export const setStorageItem = (key: string, value: string): void => {
  // 🌎 Save key/value in browser’s local storage
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorageItem = (key: string): any => {
  // 🌎 Get item by key from browser’s local storage
  const item = localStorage.getItem(key);
  // 🌎 If the item exists, parse it, else return null
  return item ? JSON.parse(item) : null;
};

export const removeStorageItem = (key: string): void => {
  // 🌎 Remove item by key from browser’s local storage
  localStorage.removeItem(key);
};

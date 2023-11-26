// Create a utility class to handle localStorage
export class LocalStorage {
  // Get a value from localStorage from key
  static get(key) {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // Set a value in localStorage by key
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from localStorage by key
  static remove(key) {
    localStorage.removeItem(key);
  }

  // Clear all items from localStorage
  static clear() {
    localStorage.clear();
  }
}

export const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key: string) {
      // @ts-ignore
      return store[key];
    },
    setItem(key: string, value: string) {
      // @ts-ignore
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      // @ts-ignore
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

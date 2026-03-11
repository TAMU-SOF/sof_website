export async function register() {
  // Node.js 22+ exposes `localStorage` as a stub `{}` with no methods.
  // Next.js dev overlay calls localStorage.getItem(), which crashes.
  // Patch it with a proper no-op implementation for the server.
  if (
    typeof localStorage !== 'undefined' &&
    typeof localStorage.getItem !== 'function'
  ) {
    const store = {};
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: (key) => store[key] ?? null,
        setItem: (key, value) => { store[key] = String(value); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
        key: (i) => Object.keys(store)[i] ?? null,
        get length() { return Object.keys(store).length; },
      },
      writable: true,
      configurable: true,
    });
  }
}

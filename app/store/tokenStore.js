import { create } from 'zustand';

const useTokenStore = create((set) => ({
  token: null, // Initial state

  setToken: (token) => set({ token }), // Action to set token
}));

export default useTokenStore;
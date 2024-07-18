
import { create } from 'zustand';

const useUserStore = create((set) => ({
  userId: null, // Initial state

  setUserId: (userId) => set({ userId }), // Action to set userId
}));

export default useUserStore;
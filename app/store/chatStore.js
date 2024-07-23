import create from 'zustand';

const useChatStore = create((set) => ({
  chattedWith: [],

  addChat: (chatInfo) =>
    set((state) => ({
      chattedWith: [...state.chattedWith, chatInfo],
    })),
}));

export default useChatStore;
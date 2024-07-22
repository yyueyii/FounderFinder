import create from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  removeNotification: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.filter((notif) => notif.id !== notificationId),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));

export default useNotificationStore;
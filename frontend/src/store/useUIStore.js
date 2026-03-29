import { create } from "zustand";

/**
 * UI state store — sidebar, info panel, mobile state, search.
 */
export const useUIStore = create((set) => ({
  isSidebarOpen: true,
  isInfoPanelOpen: false,
  isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  searchQuery: "",

  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  setSidebarOpen: (v) => set({ isSidebarOpen: v }),
  toggleInfoPanel: () => set((s) => ({ isInfoPanelOpen: !s.isInfoPanelOpen })),
  setInfoPanelOpen: (v) => set({ isInfoPanelOpen: v }),
  setMobile: (v) => set({ isMobile: v }),
  setSearchQuery: (q) => set({ searchQuery: q }),
}));

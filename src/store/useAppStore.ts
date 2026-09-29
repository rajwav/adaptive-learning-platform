import { create } from 'zustand';

interface AppState {
  currentSubject: string | null;
  isTransitioning: boolean;
  setSubject: (subject: string | null) => void;
  setTransitioning: (status: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentSubject: null,
  isTransitioning: false,
  setSubject: (subject) => set({ currentSubject: subject }),
  setTransitioning: (status) => set({ isTransitioning: status }),
}));

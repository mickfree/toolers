import { create } from 'zustand';

interface CanvasState {
  backgroundHex: string;
  gridHex: string;
  textHex: string;
  gridSize: number;
  gridOpacity: number;
  updateBackground: (hex: string) => void;
  updateGridColor: (hex: string) => void;
  updateTextHex: (hex: string) => void;
  updateGridSize: (size: number) => void;
  updateOpacity: (opacity: number) => void;
}

const getInitialBg = () => {
  if (typeof window !== 'undefined') {
    const isDark = document.body.classList.contains('dark-theme') || localStorage.getItem('theme') === 'dark';
    return isDark ? '#181a1b' : '#f8f9fa';
  }
  return '#f8f9fa';
};

export const useCanvasStore = create<CanvasState>((set) => ({
  backgroundHex: getInitialBg(),
  gridHex: '#cccccc',
  textHex: '#6e6e6e',
  gridSize: 20,
  gridOpacity: 0.5,
  updateBackground: (hex) => set({ backgroundHex: hex }),
  updateGridColor: (hex) => set({ gridHex: hex }),
  updateTextHex: (hex) => set({ textHex: hex }),
  updateGridSize: (size) => set({ gridSize: size }),
  updateOpacity: (opacity) => set({ gridOpacity: opacity }),
}));

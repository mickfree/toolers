import { useState, useEffect } from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { type ViewMode } from '../components/ViewModeSelector';
import { HEX_REGEX } from '../utils/color';

export const useHexCanvas = () => {
  const {
    backgroundHex,
    updateBackground,
    textHex,
    updateTextHex,
  } = useCanvasStore();

  const [bgInput, setBgInput] = useState(backgroundHex);
  const [textInput, setTextInput] = useState(textHex);
  const [viewMode, setViewMode] = useState<ViewMode>('hex');

  // Sincronizar el input interno con el store
  useEffect(() => {
    setBgInput(backgroundHex);
    document.body.style.setProperty('--bg-body', backgroundHex);
  }, [backgroundHex]);

  useEffect(() => {
    setTextInput(textHex);
  }, [textHex]);

  // Sincronizar automáticamente cuando cambie el tema (claro/oscuro)
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.body.classList.contains('dark-theme');
          updateBackground(isDark ? '#181a1b' : '#f8f9fa');
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, [updateBackground]);

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBgInput(value);

    if (HEX_REGEX.test(value)) {
      let formatted = value;
      if (!value.startsWith('#')) formatted = '#' + value;
      updateBackground(formatted);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextInput(value);

    if (HEX_REGEX.test(value)) {
      let formatted = value;
      if (!value.startsWith('#')) formatted = '#' + value;
      updateTextHex(formatted);
    }
  };

  const applyBackground = () => {
    let value = bgInput;
    if (!value.startsWith('#') && value.length > 0) value = '#' + value;

    if (HEX_REGEX.test(value)) {
      updateBackground(value);
    }
  };

  const applyText = () => {
    let value = textInput;
    if (!value.startsWith('#') && value.length > 0) value = '#' + value;

    if (HEX_REGEX.test(value)) {
      updateTextHex(value);
    }
  };

  const getDefaultBg = () => {
    if (typeof window !== 'undefined') {
      const isDark = document.body.classList.contains('dark-theme');
      return isDark ? '#181a1b' : '#f8f9fa';
    }
    return '#f8f9fa';
  };

  const DEFAULT_TEXT = '#6e6e6e';

  const handleResetBg = () => {
    updateBackground(getDefaultBg());
  };

  const handleResetText = () => {
    updateTextHex(DEFAULT_TEXT);
  };

  const showResetBg = backgroundHex.toLowerCase() !== getDefaultBg().toLowerCase();
  const showResetText = textHex.toLowerCase() !== DEFAULT_TEXT.toLowerCase();

  return {
    backgroundHex,
    textHex,
    bgInput,
    textInput,
    viewMode,
    setViewMode,
    handleBgChange,
    handleTextChange,
    applyBackground,
    applyText,
    handleResetBg,
    handleResetText,
    showResetBg,
    showResetText,
    updateBackground,
    updateTextHex,
  };
};

import React, { useState, useRef, useEffect } from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { PowerIcon } from '../../components/ui/icons/react/hexcanvas/PowerIcon';
import { TypographyIcon } from '../../components/ui/icons/react/hexcanvas/TypographyIcon';
import { GridIcon } from '../../components/ui/icons/react/hexcanvas/GridIcon';

const HEX_REGEX = /^#?([0-9A-F]{3}){1,2}$/i;

const HexCanvas: React.FC = () => {
  const {
    backgroundHex,
    updateBackground,
    textHex,
    updateTextHex,
  } = useCanvasStore();

  const [bgInput, setBgInput] = useState(backgroundHex);
  const [textInput, setTextInput] = useState(textHex);
  const [isSuccess, setIsSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<'hex' | 'type' | 'grid'>('hex');
  const bgPickerRef = useRef<HTMLInputElement>(null);
  const textPickerRef = useRef<HTMLInputElement>(null);

  // Sincronizar el input interno con el store
  useEffect(() => {
    setBgInput(backgroundHex);
    // Cambiar el fondo de TODO el layout (body)
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

    // Actualización en vivo si es válido
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
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }
  };

  const applyText = () => {
    let value = textInput;
    if (!value.startsWith('#') && value.length > 0) value = '#' + value;

    if (HEX_REGEX.test(value)) {
      updateTextHex(value);
    }
  };

  return (
    <div className="relative w-full">
      {/* Control Panel - Floating or Sectioned */}
      <div className="max-w-[250px] z-20">

        <div className="flex items-center gap-3 mb-[10px]">
          <div className="flex items-center justify-center bg-[var(--bg-container)] border border-[var(--border-color)] rounded-xl p-1 flex-1 min-w-0">
            <span className='text-xs dark:text-[var(--text-primary)] leading-none ml-2'>
              Background:
            </span>
            <input
              type="text"
              placeholder="background hex"
              className="border-none outline-none bg-transparent py-1.5 px-3.5 text-sm text-[var(--text-primary)] flex-1 min-w-0 self-center"
              value={bgInput}
              onChange={handleBgChange}
              onKeyDown={(e) => e.key === 'Enter' && applyBackground()}
            />
          </div>
          <button
            className="w-10 h-10 rounded-lg border border-[var(--border-color)] cursor-pointer relative overflow-hidden flex-shrink-0 p-0 block hover:opacity-85 hover:-translate-y-px transition-all"
            onClick={() => bgPickerRef.current?.click()}
            title="Selector de fondo"
          >
            <div
              className="w-full h-full rounded-[4px] block"
              style={{ backgroundColor: backgroundHex }}
            ></div>
          </button>
          <input
            type="color"
            ref={bgPickerRef}
            className="absolute opacity-0 pointer-events-none"
            value={backgroundHex}
            onChange={(e) => {
              updateBackground(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center gap-3 mb-[10px]">
          <div className="flex items-center bg-[var(--bg-container)] border border-[var(--border-color)] rounded-xl p-1 flex-1 min-w-0">
            <span className='text-xs dark:text-[var(--text-primary)] leading-none ml-2'>
              Text:
            </span>
            <input
              type="text"
              placeholder="text hex"
              className="border-none outline-none bg-transparent py-1.5 px-3.5 text-sm text-[var(--text-primary)] flex-1 min-w-0"
              value={textInput}
              onChange={handleTextChange}
              onKeyDown={(e) => e.key === 'Enter' && applyText()}
            />
          </div>
          <button
            className="w-10 h-10 rounded-lg border border-[var(--border-color)] cursor-pointer relative overflow-hidden flex-shrink-0 p-0 block hover:opacity-85 hover:-translate-y-px transition-all"
            onClick={() => textPickerRef.current?.click()}
            title="Selector de texto"
          >
            <div
              className="w-full h-full rounded-[4px] block"
              style={{ backgroundColor: textHex }}
            ></div>
          </button>
          <input
            type="color"
            ref={textPickerRef}
            className="absolute opacity-0 pointer-events-none"
            value={textHex}
            onChange={(e) => {
              updateTextHex(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center gap-2 mb-[10px]">
          <button
            onClick={() => setViewMode('hex')}
            className={`flex-1 flex items-center justify-center gap-2 border rounded-xl py-2 px-2 text-[10px] font-bold transition-all ${viewMode === 'hex'
              ? 'bg-[var(--text-primary)] text-[var(--bg-body)] border-[var(--text-primary)] shadow-lg'
              : 'bg-[var(--bg-container)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--border-color)] opacity-70'
              }`}
            title="Hex Preview"
          >
            <PowerIcon size={14} />
            HEX
          </button>

          <button
            onClick={() => setViewMode('type')}
            className={`flex-1 flex items-center justify-center gap-2 border rounded-xl py-2 px-2 text-[10px] font-bold transition-all ${viewMode === 'type'
              ? 'bg-[var(--text-primary)] text-[var(--bg-body)] border-[var(--text-primary)] shadow-lg'
              : 'bg-[var(--bg-container)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--border-color)] opacity-70'
              }`}
            title="Typography Scale"
          >
            <TypographyIcon size={14} />
            TYPE
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 flex items-center justify-center gap-2 border rounded-xl py-2 px-2 text-[10px] font-bold transition-all ${viewMode === 'grid'
              ? 'bg-[var(--text-primary)] text-[var(--bg-body)] border-[var(--text-primary)] shadow-lg'
              : 'bg-[var(--bg-container)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--border-color)] opacity-70'
              }`}
            title="Grid Preview"
          >
            <GridIcon size={14} />
            GRID
          </button>
        </div>

      </div>

      <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center -z-10 p-10 pt-32">
        {viewMode === 'hex' && (
          <>
            <span
              className="text-[15vw] font-black uppercase tracking-tighter select-none opacity-15 transition-colors duration-300"
              style={{ color: textHex }}
            >
              {backgroundHex}
            </span>
            <span
              className="text-7xl font-black uppercase tracking-tighter select-none opacity-100 transition-colors duration-300"
              style={{ color: textHex }}
            >
              {textHex}
            </span>
          </>
        )}

        {viewMode === 'type' && (
          <div className="w-full max-w-4xl flex flex-col items-center gap-10 overflow-y-auto max-h-[85vh] scrollbar-hide py-10">
            <div className="flex flex-col items-center text-center w-full" style={{ color: textHex }}>
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Heading 1 - 3.5rem</span>
              <h1 className="text-[3.5rem] font-black leading-tight mb-8">Tipografía Principal</h1>

              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Heading 2 - 2.5rem</span>
              <h2 className="text-[2.5rem] font-bold leading-tight mb-6">Encabezado de Sección</h2>

              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Heading 3 - 2.0rem</span>
              <h3 className="text-[2rem] font-bold leading-tight mb-4">Subencabezado de Nivel 3</h3>

              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Heading 4 - 1.5rem</span>
              <h4 className="text-[1.5rem] font-semibold leading-snug mb-3">Título de Componente</h4>

              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Heading 5 - 1.25rem</span>
              <h5 className="text-[1.25rem] font-semibold leading-normal mb-2">Título Menor</h5>

              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Heading 6 - 1.0rem</span>
              <h6 className="text-[1rem] font-medium leading-normal mb-6">Etiqueta de Interfaz</h6>

              <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Paragraph - 1.0rem (Light 300)</span>
              <p className="text-[1rem] font-light max-w-lg opacity-80">Este es un ejemplo de texto de párrafo utilizando un peso de fuente 300 para el color secundario.</p>
            </div>
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="w-full max-w-5xl flex flex-col gap-6 overflow-y-auto max-h-[85vh] scrollbar-hide py-10 px-6">
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="border-[2.5px] rounded-2xl p-8 flex flex-col gap-4 transition-colors duration-300" style={{ borderColor: `${textHex}22`, color: textHex }}>
                <h4 className="text-xl font-bold tracking-tight">Grid con Texto</h4>
                <p className="text-sm font-light leading-relaxed opacity-80">
                  Este es un panel de contenido con texto de ejemplo para visualizar la distribución del grid y la tipografía dentro de un contenedor con bordes redondeados.
                </p>
              </div>
              <div className="border-[2.5px] rounded-2xl border-dashed opacity-20 transition-colors duration-300" style={{ borderColor: textHex }}></div>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="border-[2.5px] rounded-2xl p-6 flex flex-col transition-colors duration-300" style={{ borderColor: `${textHex}22`, color: textHex }}>
                <textarea
                  id="grid-textarea"
                  className="w-full h-32 bg-transparent border-none outline-none resize-none text-base placeholder:text-[var(--text-hex)]"
                  placeholder="Escribe aquí..."
                  style={{
                    color: textHex,
                    '--text-hex': textHex
                  } as React.CSSProperties}
                />
              </div>
              <div className="border-[2.5px] rounded-2xl border-dashed opacity-20 transition-colors duration-300" style={{ borderColor: textHex }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HexCanvas;

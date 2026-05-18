import React from 'react';

interface GridPreviewProps {
  textHex: string;
}

export const GridPreview: React.FC<GridPreviewProps> = ({ textHex }) => {
  return (
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
  );
};

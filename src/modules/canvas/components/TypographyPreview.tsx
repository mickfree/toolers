import React from 'react';

interface TypographyPreviewProps {
  textHex: string;
}

export const TypographyPreview: React.FC<TypographyPreviewProps> = ({ textHex }) => {
  return (
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
  );
};

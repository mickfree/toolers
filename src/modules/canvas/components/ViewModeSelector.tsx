import React from 'react';
import { PowerIcon } from '../../../components/ui/icons/react/hexcanvas/PowerIcon';
import { TypographyIcon } from '../../../components/ui/icons/react/hexcanvas/TypographyIcon';
import { GridIcon } from '../../../components/ui/icons/react/hexcanvas/GridIcon';

export type ViewMode = 'hex' | 'type' | 'grid';

interface ViewModeSelectorProps {
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
}

export const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({
  viewMode,
  onChangeViewMode,
}) => {
  const modes = [
    { id: 'hex' as const, label: 'HEX', icon: <PowerIcon size={14} /> },
    { id: 'type' as const, label: 'TYPE', icon: <TypographyIcon size={14} /> },
    { id: 'grid' as const, label: 'GRID', icon: <GridIcon size={14} /> },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 mb-[10px]">
      {modes.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => onChangeViewMode(id)}
          className={`flex items-center justify-center gap-2 border rounded-xl py-2 px-2 text-[10px] font-bold transition-all ${viewMode === id
              ? 'bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--btn-bg)] shadow-lg'
              : 'bg-[var(--bg-container)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--border-color)] opacity-70'
            }`}
          title={`${label} Preview`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};

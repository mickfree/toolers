import React, { useRef } from 'react';
import { ResetIcon } from '@/components/ui/icons/react/common/ResetIcon';

interface ColorPickerInputProps {
  label: string;
  value: string;
  pickerValue: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPickerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  onReset?: () => void;
}

export const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  label,
  value,
  pickerValue,
  placeholder,
  onChange,
  onKeyDown,
  onPickerChange,
  title,
  onReset,
}) => {
  const pickerRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-3 mb-[10px]">
      <div className="flex items-center justify-center bg-[var(--bg-container)] border border-[var(--border-color)] rounded-xl p-1 flex-1 min-w-0">
        <span className="text-xs dark:text-[var(--text-primary)] leading-none ml-2">
          {label}:
        </span>
        <input
          type="text"
          placeholder={placeholder}
          className="border-none outline-none bg-transparent py-1.5 px-3.5 text-sm text-[var(--text-primary)] flex-1 min-w-0 self-center"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {onReset && (
          <button
            onClick={onReset}
            className="p-1 hover:bg-[var(--border-color)] rounded-lg mr-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer flex items-center justify-center flex-shrink-0"
            title="Restablecer color por defecto"
          >
            <ResetIcon size={18} />
          </button>
        )}
      </div>
      <button
        className="w-10 h-10 rounded-lg border border-[var(--border-color)] cursor-pointer relative overflow-hidden flex-shrink-0 p-0 block hover:opacity-85 hover:-translate-y-px transition-all"
        onClick={() => pickerRef.current?.click()}
        title={title}
      >
        <div
          className="w-full h-full rounded-[4px] block"
          style={{ backgroundColor: pickerValue }}
        ></div>
      </button>
      <input
        type="color"
        ref={pickerRef}
        className="absolute opacity-0 pointer-events-none"
        value={pickerValue}
        onChange={onPickerChange}
      />
    </div>
  );
};

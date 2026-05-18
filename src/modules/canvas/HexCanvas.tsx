import React from 'react';
import { useHexCanvas } from './hooks/useHexCanvas';
import { ColorPickerInput } from './components/ColorPickerInput';
import { ViewModeSelector } from './components/ViewModeSelector';
import { HexPreview } from './components/HexPreview';
import { TypographyPreview } from './components/TypographyPreview';
import { GridPreview } from './components/GridPreview';

const HexCanvas: React.FC = () => {
  const {
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
  } = useHexCanvas();

  return (
    <div className="relative w-full">
      {/* Control Panel */}
      <div className="max-w-[250px] z-20">
        <ColorPickerInput
          label="Background"
          value={bgInput}
          pickerValue={backgroundHex}
          placeholder="background hex"
          onChange={handleBgChange}
          onKeyDown={(e) => e.key === 'Enter' && applyBackground()}
          onPickerChange={(e) => updateBackground(e.target.value)}
          onReset={showResetBg ? handleResetBg : undefined}
          title="Selector de fondo"
        />

        <ColorPickerInput
          label="Text"
          value={textInput}
          pickerValue={textHex}
          placeholder="text hex"
          onChange={handleTextChange}
          onKeyDown={(e) => e.key === 'Enter' && applyText()}
          onPickerChange={(e) => updateTextHex(e.target.value)}
          onReset={showResetText ? handleResetText : undefined}
          title="Selector de texto"
        />

        <ViewModeSelector
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
        />
      </div>

      {/* Screen Preview Container */}
      <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center -z-10 p-10 pt-32">
        {viewMode === 'hex' && (
          <HexPreview backgroundHex={backgroundHex} textHex={textHex} />
        )}

        {viewMode === 'type' && (
          <TypographyPreview textHex={textHex} />
        )}

        {viewMode === 'grid' && (
          <GridPreview textHex={textHex} />
        )}
      </div>
    </div>
  );
};

export default HexCanvas;



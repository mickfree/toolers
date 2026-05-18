import React from 'react';

interface HexPreviewProps {
  backgroundHex: string;
  textHex: string;
}

export const HexPreview: React.FC<HexPreviewProps> = ({ backgroundHex, textHex }) => {
  return (
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
  );
};

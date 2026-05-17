interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const PowerIcon = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}: IconProps) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v10" />
      <path d="M18.4 6.9c1 .6 1.6 1.7 1.6 2.9 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1.2.6-2.3 1.6-2.9" />
      <path d="M7 6.9c-1 .6-1.6 1.7-1.6 2.9 0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.2-.6-2.3-1.6-2.9" />
      <path d="M12 22v-3" />
    </svg>
  );
};
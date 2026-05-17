interface IconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const TypographyIcon = ({
    size = 14,
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
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={className}
            >
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
        </svg>
    )
}


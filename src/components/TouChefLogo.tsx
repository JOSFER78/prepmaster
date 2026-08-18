import React from 'react';

interface TouChefLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showTagline?: boolean;
  className?: string;
}

export function TouChefIsotype({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      width={size} 
      height={size} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${className}`}
    >
      <defs>
        {/* Soft Copper Gradient */}
        <linearGradient id="tc-copper-grad" x1="10" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4A261" />
          <stop offset="100%" stopColor="#E07A5F" />
        </linearGradient>

        {/* Dark Squircle Background */}
        <linearGradient id="tc-bg-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E1F24" />
          <stop offset="100%" stopColor="#0E0F12" />
        </linearGradient>
      </defs>

      {/* Squircle Plate */}
      <rect 
        x="1" 
        y="1" 
        width="46" 
        height="46" 
        rx="14" 
        fill="url(#tc-bg-grad)" 
        stroke="rgba(255, 255, 255, 0.12)" 
        strokeWidth="1.2" 
      />

      {/* Ambient Warm Glow */}
      <circle cx="24" cy="24" r="14" fill="#E07A5F" opacity="0.18" />

      {/* Minimalist Modern Chef Hat (Toque) */}
      {/* Central Upper Dome */}
      <path 
        d="M24 11C20.5 11 18 13.5 17.5 16.5C15 16.8 13 19 13 22C13 24.8 14.8 27.2 17.5 27.8V31C17.5 31.8 18.2 32.5 19 32.5H29C29.8 32.5 30.5 31.8 30.5 31V27.8C33.2 27.2 35 24.8 35 22C35 19 33 16.8 30.5 16.5C30 13.5 27.5 11 24 11Z" 
        fill="url(#tc-copper-grad)" 
      />

      {/* Inner Pleat / Fold Lines (Minimalist Precision) */}
      <path 
        d="M20.5 18C20.5 22 21 27 21 31" 
        stroke="#0E0F12" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.3"
      />
      <path 
        d="M27.5 18C27.5 22 27 27 27 31" 
        stroke="#0E0F12" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.3"
      />

      {/* Chef Hat Base Band */}
      <rect 
        x="18" 
        y="33.5" 
        width="12" 
        height="3" 
        rx="1.5" 
        fill="#F4F1DE" 
      />
    </svg>
  );
}

export function TouChefLogo({ 
  size = 'md', 
  showWordmark = true, 
  showTagline = false,
  className = '' 
}: TouChefLogoProps) {
  const iconSize = size === 'sm' ? 26 : size === 'md' ? 32 : size === 'lg' ? 40 : 50;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <TouChefIsotype size={iconSize} />

      {showWordmark && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-0.5">
            <span className="font-display font-black text-zinc-900 dark:text-[#F4F1DE] tracking-tight text-base sm:text-lg">
              Tou
            </span>
            <span className="font-display font-medium tracking-wide text-[#E07A5F] text-base sm:text-lg">
              Chef
            </span>
          </div>

          {showTagline && (
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8E95A5]">
              Batch Cooking &amp; Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
}

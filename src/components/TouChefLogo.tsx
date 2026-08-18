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
      viewBox="0 0 64 64" 
      width={size} 
      height={size} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 ${className}`}
    >
      <defs>
        {/* Background Dark Container */}
        <linearGradient id="tc-iso-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22242B" />
          <stop offset="100%" stopColor="#0E0F13" />
        </linearGradient>

        {/* Copper to Amber Flame Gradient */}
        <linearGradient id="tc-iso-copper" x1="16" y1="12" x2="48" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4A261" />
          <stop offset="55%" stopColor="#E07A5F" />
          <stop offset="100%" stopColor="#C85A32" />
        </linearGradient>

        {/* Smoked Sage Lateral Wings */}
        <linearGradient id="tc-iso-sage" x1="20" y1="20" x2="44" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A3C9A8" />
          <stop offset="100%" stopColor="#52796F" />
        </linearGradient>

        {/* Soft Specular Glow */}
        <filter id="tc-iso-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Squircle Base */}
      <rect 
        x="1.5" 
        y="1.5" 
        width="61" 
        height="61" 
        rx="18" 
        fill="url(#tc-iso-bg)" 
        stroke="rgba(255,255,255,0.12)" 
        strokeWidth="1.5" 
      />

      {/* Ambient Glow */}
      <circle cx="32" cy="34" r="16" fill="#E07A5F" opacity="0.22" filter="url(#tc-iso-glow)" />

      {/* Top Crown / Toque Crest (The 'T' bar + Pleats) */}
      <path 
        d="M18 19C18 16.7909 19.7909 15 22 15H42C44.2091 15 46 16.7909 46 19C46 22.3137 43.3137 25 40 25C37.5 25 36.5 23.5 32 23.5C27.5 23.5 26.5 25 24 25C20.6863 25 18 22.3137 18 19Z" 
        fill="url(#tc-iso-copper)" 
      />

      {/* Left Precision Wing (Hourglass / Toque fold) */}
      <path 
        d="M19.5 25.5C22.5 26.5 24.5 30 24.5 33.5C24.5 38 21.5 41.5 20.5 45.5C19.8 48.3 22 51 25 51C27.5 51 28.8 49 29.5 46.5C30.2 44 29 40 27.5 37.5C26 35 25.5 31.5 27 28.5L24 25.5C22.2 25.2 20.7 25.2 19.5 25.5Z" 
        fill="url(#tc-iso-sage)" 
        opacity="0.88" 
      />

      {/* Right Precision Wing */}
      <path 
        d="M44.5 25.5C41.5 26.5 39.5 30 39.5 33.5C39.5 38 42.5 41.5 43.5 45.5C44.2 48.3 42 51 39 51C36.5 51 35.2 49 34.5 46.5C33.8 44 35 40 36.5 37.5C38 35 38.5 31.5 37 28.5L40 25.5C41.8 25.2 43.3 25.2 44.5 25.5Z" 
        fill="url(#tc-iso-sage)" 
        opacity="0.88" 
      />

      {/* Central Flame & Stem */}
      <path 
        d="M32 20C32 20 37 28 37 34.5C37 38.5 34.8 42 32 44C29.2 42 27 38.5 27 34.5C27 28 32 20 32 20Z" 
        fill="url(#tc-iso-copper)" 
      />

      {/* Inner Spark of Precision */}
      <path 
        d="M32 30C32 30 34.5 34.5 34.5 37C34.5 38.5 33.4 39.8 32 40.5C30.6 39.8 29.5 38.5 29.5 37C29.5 34.5 32 30 32 30Z" 
        fill="#F4F1DE" 
      />

      {/* Base Bar */}
      <rect x="26" y="52" width="12" height="2.5" rx="1.25" fill="rgba(244, 241, 222, 0.4)" />
    </svg>
  );
}

export function TouChefLogo({ 
  size = 'md', 
  showWordmark = true, 
  showTagline = false,
  className = '' 
}: TouChefLogoProps) {
  const iconSize = size === 'sm' ? 28 : size === 'md' ? 34 : size === 'lg' ? 44 : 54;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <TouChefIsotype size={iconSize} />

      {showWordmark && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-0.5">
            <span className="font-display font-black text-zinc-900 dark:text-[#F4F1DE] tracking-tight text-base sm:text-lg">
              Tou
            </span>
            <span className="font-sans font-light tracking-wider text-[#E07A5F] text-base sm:text-lg">
              Chef
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4A261] mb-1 ml-0.5 animate-pulse" />
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

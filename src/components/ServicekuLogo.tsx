import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'badge';
}

export const ServicekuLogo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  variant = 'light',
  size = 'md',
  layout = 'horizontal'
}) => {
  const isLight = variant === 'light';

  // Sizing tokens
  const iconDimensions = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }[size];

  // SVG Emblem matching exact uploaded artwork
  const EmblemSvg = (
    <svg
      viewBox="0 0 500 380"
      className="w-full h-full drop-shadow-xs"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0047AB" />
          <stop offset="45%" stopColor="#0275D8" />
          <stop offset="100%" stopColor="#00A3E0" />
        </linearGradient>
        <linearGradient id="logoWaveTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#0099FF" />
          <stop offset="100%" stopColor="#026AA7" />
        </linearGradient>
        <linearGradient id="logoWaveBottomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0A2540" />
          <stop offset="50%" stopColor="#00438F" />
          <stop offset="100%" stopColor="#0D3B66" />
        </linearGradient>
      </defs>

      {/* Circular Arc on Left and Top */}
      <path
        d="M 125 270 A 138 138 0 1 1 310 52"
        fill="none"
        stroke="url(#logoArcGrad)"
        strokeWidth="20"
        strokeLinecap="round"
      />

      {/* Snowflake in Upper-Left Quadrant */}
      <g transform="translate(195, 160)" stroke="#0265B8" strokeWidth="7" strokeLinecap="round">
        <line x1="0" y1="-52" x2="0" y2="52" />
        <line x1="-45" y1="-26" x2="45" y2="26" />
        <line x1="-45" y1="26" x2="45" y2="-26" />

        {/* Snowflake Chevrons */}
        <line x1="0" y1="-32" x2="-14" y2="-44" strokeWidth="5.5" />
        <line x1="0" y1="-32" x2="14" y2="-44" strokeWidth="5.5" />
        <line x1="0" y1="-18" x2="-10" y2="-26" strokeWidth="5" />
        <line x1="0" y1="-18" x2="10" y2="-26" strokeWidth="5" />

        <line x1="0" y1="32" x2="-14" y2="44" strokeWidth="5.5" />
        <line x1="0" y1="32" x2="14" y2="44" strokeWidth="5.5" />
        <line x1="0" y1="18" x2="-10" y2="26" strokeWidth="5" />
        <line x1="0" y1="18" x2="10" y2="26" strokeWidth="5" />

        <line x1="-28" y1="-16" x2="-40" y2="-10" strokeWidth="5" />
        <line x1="-28" y1="-16" x2="-30" y2="-30" strokeWidth="5" />

        <line x1="28" y1="-16" x2="40" y2="-10" strokeWidth="5" />
        <line x1="28" y1="-16" x2="30" y2="-30" strokeWidth="5" />

        <line x1="-28" y1="16" x2="-40" y2="10" strokeWidth="5" />
        <line x1="-28" y1="16" x2="-30" y2="30" strokeWidth="5" />

        <line x1="28" y1="16" x2="40" y2="10" strokeWidth="5" />
        <line x1="28" y1="16" x2="30" y2="30" strokeWidth="5" />

        <circle cx="0" cy="0" r="4.5" fill="#00479E" stroke="none" />
      </g>

      {/* Industrial Gear on Right */}
      <g transform="translate(325, 230)" fill="#14213d">
        <circle cx="0" cy="0" r="54" />
        <rect x="-10" y="-72" width="20" height="24" rx="2" />
        <rect x="-10" y="48" width="20" height="24" rx="2" />
        <rect x="-72" y="-10" width="24" height="20" rx="2" />
        <rect x="48" y="-10" width="24" height="20" rx="2" />
        <g transform="rotate(45)">
          <rect x="-10" y="-72" width="20" height="24" rx="2" />
          <rect x="-10" y="48" width="20" height="24" rx="2" />
          <rect x="-72" y="-10" width="24" height="20" rx="2" />
          <rect x="48" y="-10" width="24" height="20" rx="2" />
        </g>
        <circle cx="0" cy="0" r="28" fill={isLight ? '#FFFFFF' : '#0F172A'} />
      </g>

      {/* Technician Wrench Diagonally Up-Right (~48 deg) */}
      <g transform="translate(265, 205) rotate(48)">
        <rect x="-15" y="-95" width="30" height="155" rx="6" fill="#14213d" />
        <rect x="-4.5" y="-75" width="9" height="120" rx="3.5" fill="#f0f9ff" />
        <path
          d="M -34 -85
             C -34 -130, 34 -130, 34 -85
             C 24 -85, 17 -72, 17 -58
             L -17 -58
             C -17 -72, -24 -85, -34 -85 Z"
          fill="#14213d"
        />
        <circle cx="0" cy="78" r="28" fill="#14213d" />
        <circle cx="0" cy="78" r="14" fill={isLight ? '#FFFFFF' : '#0F172A'} />
      </g>

      {/* Dynamic Base Wave Swooshes */}
      <path
        d="M 65 315
           C 140 280, 210 325, 280 305
           C 335 290, 370 305, 415 320
           C 365 332, 320 315, 270 322
           C 190 335, 140 325, 65 315 Z"
        fill="url(#logoWaveTopGrad)"
      />
      <path
        d="M 45 328
           C 130 295, 205 345, 285 320
           C 340 302, 385 320, 435 334
           C 380 355, 325 336, 275 348
           C 175 372, 125 352, 45 328 Z"
        fill="url(#logoWaveBottomGrad)"
      />
    </svg>
  );

  if (layout === 'badge') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <div className="w-48 h-36 relative">{EmblemSvg}</div>
        <div className="mt-1">
          <div className="text-3xl font-black italic tracking-tight text-sky-700">
            Serviceku
          </div>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span className="w-6 h-0.5 bg-sky-700" />
            <span className={`text-[11px] font-black tracking-widest uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
              ELEKTRONIK TERBAIK
            </span>
            <span className="w-6 h-0.5 bg-sky-700" />
          </div>
          <div className={`text-[9px] font-bold tracking-wider uppercase mt-0.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            -SPESIALIS PENDINGIN DAN MESIN ELEKTRONIK-
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Precision Vector Emblem Icon */}
      <div className={`relative flex-shrink-0 ${iconDimensions} transition-transform duration-300 group-hover:scale-105`}>
        {EmblemSvg}
      </div>

      {/* Typography with exact layout from image */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-black italic tracking-tight leading-none text-sky-600 ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'}`}>
            Service<span className={isLight ? 'text-sky-700' : 'text-sky-400'}>ku</span>
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-3 h-0.5 bg-sky-600 rounded-full" />
            <span className={`font-black tracking-widest text-[9.5px] uppercase leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>
              ELEKTRONIK TERBAIK
            </span>
            <span className="w-3 h-0.5 bg-sky-600 rounded-full" />
          </div>
          <span className={`text-[8px] font-bold tracking-wider uppercase leading-none mt-1 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            -SPESIALIS PENDINGIN DAN MESIN ELEKTRONIK-
          </span>
        </div>
      )}
    </div>
  );
};

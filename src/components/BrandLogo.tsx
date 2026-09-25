import React from 'react';

interface BrandLogoProps {
  variant?: 'badge' | 'horizontal' | 'mark-only';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = ''
}) => {
  // Size mapping
  const badgeDimensions = {
    sm: { width: 38, height: 38, textClass: 'text-sm' },
    md: { width: 48, height: 48, textClass: 'text-base' },
    responsive: { width: 42, height: 42, textClass: 'text-base' },
    lg: { width: 110, height: 110, textClass: 'text-xl' },
    xl: { width: 180, height: 180, textClass: 'text-3xl' },
  }[size];

  // The circular badge icon rendering the authentic eagle, mountains, house, and tools
  const CircularBadgeSvg = (
    <svg
      viewBox="0 0 500 500"
      className="shrink-0 drop-shadow-sm w-full h-full max-w-full max-h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Eagle's Nest Property Care Logo"
    >
      {/* Outer Border Circles */}
      <circle cx="250" cy="250" r="242" fill="#0B2545" stroke="#C8102E" strokeWidth="6" />
      <circle cx="250" cy="250" r="228" fill="#FFFFFF" stroke="#0B2545" strokeWidth="4" />

      {/* Sky & Mountain Background Area */}
      <g>
        {/* Mountain Silhouette */}
        <path
          d="M70 240 L160 170 L210 210 L250 160 L310 215 L360 175 L430 240 Z"
          fill="#133966"
        />
        {/* Mountain Snow Caps */}
        <polygon points="160,170 145,190 155,185 160,195 168,185 175,192" fill="#FFFFFF" />
        <polygon points="250,160 235,185 245,180 250,190 258,180 265,188" fill="#FFFFFF" />
        <polygon points="360,175 348,195 356,188 360,198 368,188 374,195" fill="#FFFFFF" />

        {/* Evergreen Pines */}
        <path
          d="M95 245 L105 215 L115 245 Z M110 245 L120 205 L130 245 Z M125 245 L135 218 L145 245 Z M355 245 L365 215 L375 245 Z M370 245 L380 205 L390 245 Z M385 245 L395 218 L405 245 Z"
          fill="#07162C"
        />

        {/* Craftsman House Silhouette */}
        <path
          d="M250 145 L155 235 L345 235 Z"
          fill="#0B2545"
          stroke="#FFFFFF"
          strokeWidth="6"
        />
        {/* Chimney */}
        <rect x="300" y="155" width="22" height="40" fill="#0B2545" stroke="#FFFFFF" strokeWidth="3" />
        {/* House 4-Pane Window */}
        <rect x="236" y="180" width="28" height="28" fill="#FFFFFF" />
        <line x1="250" y1="180" x2="250" y2="208" stroke="#0B2545" strokeWidth="3" />
        <line x1="236" y1="194" x2="264" y2="194" stroke="#0B2545" strokeWidth="3" />
      </g>

      {/* Majestic Eagle Crest */}
      <g id="eagle-crest">
        {/* Wings Red/White/Blue Patriotic Feathers */}
        <path
          d="M250 110 C210 40, 120 40, 40 70 C80 100, 110 140, 160 170 C200 135, 230 115, 250 110 Z"
          fill="#0B2545"
        />
        <path
          d="M50 85 C95 105, 125 130, 175 160 C150 140, 100 110, 50 85 Z"
          fill="#C8102E"
        />
        <path
          d="M65 105 C110 125, 140 145, 190 170 C165 155, 115 130, 65 105 Z"
          fill="#FFFFFF"
        />
        <path
          d="M80 125 C125 145, 155 160, 205 180 C180 168, 130 148, 80 125 Z"
          fill="#C8102E"
        />

        {/* Right Wing Outer Feathers */}
        <path
          d="M250 110 C290 40, 380 40, 460 70 C420 100, 390 140, 340 170 C300 135, 270 115, 250 110 Z"
          fill="#0B2545"
        />
        <path
          d="M450 85 C405 105, 375 130, 325 160 C350 140, 400 110, 450 85 Z"
          fill="#C8102E"
        />
        <path
          d="M435 105 C390 125, 360 145, 310 170 C335 155, 385 130, 435 105 Z"
          fill="#FFFFFF"
        />
        <path
          d="M420 125 C375 145, 345 160, 295 180 C320 168, 370 148, 420 125 Z"
          fill="#C8102E"
        />

        {/* Eagle Head & Beak */}
        <path
          d="M250 45 C230 45, 218 60, 215 80 C215 105, 230 125, 250 130 C270 125, 285 105, 285 80 C282 60, 270 45, 250 45 Z"
          fill="#FFFFFF"
          stroke="#0B2545"
          strokeWidth="3"
        />
        <path d="M230 70 L220 75 L232 82 L225 90 L240 95" stroke="#0B2545" strokeWidth="2" fill="none" />
        <path d="M270 70 L280 75 L268 82 L275 90 L260 95" stroke="#0B2545" strokeWidth="2" fill="none" />

        {/* Eye */}
        <circle cx="272" cy="74" r="5" fill="#0B2545" />
        <circle cx="273" cy="73" r="2" fill="#FBBF24" />

        {/* Golden Hooked Beak */}
        <path
          d="M275 75 C295 76, 310 85, 305 102 C295 100, 285 96, 275 95 Z"
          fill="#F59E0B"
          stroke="#0B2545"
          strokeWidth="2"
        />
      </g>

      {/* Main Banner: EAGLE'S NEST */}
      <g>
        <path
          d="M20 235 L480 235 L460 300 L250 315 L40 300 Z"
          fill="#0B2545"
          stroke="#FFFFFF"
          strokeWidth="5"
        />
        <path
          d="M38 300 L250 315 L462 300 L452 335 L250 348 L48 335 Z"
          fill="#C8102E"
        />

        <text
          x="250"
          y="285"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="'Cinzel', 'Outfit', sans-serif"
          fontWeight="900"
          fontSize="48"
          letterSpacing="2"
          className="select-none"
        >
          EAGLE'S NEST
        </text>

        <text
          x="250"
          y="332"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="5"
          className="select-none"
        >
          PROPERTY CARE
        </text>
      </g>

      {/* 5 Property Service Icons Strip */}
      <g id="service-icons" transform="translate(0, 345)">
        <line x1="140" y1="12" x2="140" y2="38" stroke="#C8102E" strokeWidth="3" />
        <line x1="210" y1="12" x2="210" y2="38" stroke="#C8102E" strokeWidth="3" />
        <line x1="290" y1="12" x2="290" y2="38" stroke="#C8102E" strokeWidth="3" />
        <line x1="360" y1="12" x2="360" y2="38" stroke="#C8102E" strokeWidth="3" />

        {/* 1. Lawn Mower */}
        <g transform="translate(75, 10) scale(0.7)" fill="#0B2545">
          <circle cx="12" cy="28" r="8" fill="#0B2545" />
          <circle cx="48" cy="28" r="8" fill="#0B2545" />
          <rect x="12" y="16" width="36" height="10" rx="3" fill="#0B2545" />
          <path d="M40 16 L56 -2" stroke="#0B2545" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* 2. Leaves */}
        <g transform="translate(160, 10) scale(0.65)" fill="#0B2545">
          <path d="M20 5 C35 5, 45 20, 40 38 C20 40, 5 30, 20 5 Z" fill="#0B2545" />
          <path d="M10 20 C2 28, 5 42, 22 40" stroke="#0B2545" strokeWidth="3" fill="none" />
        </g>

        {/* 3. Crossed Tools */}
        <g transform="translate(235, 10) scale(0.65)" stroke="#0B2545" strokeWidth="4" strokeLinecap="round">
          <line x1="10" y1="10" x2="40" y2="40" />
          <line x1="40" y1="10" x2="10" y2="40" />
          <rect x="34" y="4" width="10" height="8" rx="2" fill="#0B2545" />
        </g>

        {/* 4. Snowflake */}
        <g transform="translate(312, 10) scale(0.65)" stroke="#0B2545" strokeWidth="3" strokeLinecap="round">
          <line x1="25" y1="5" x2="25" y2="45" />
          <line x1="5" y1="25" x2="45" y2="25" />
          <line x1="11" y1="11" x2="39" y2="39" />
          <line x1="39" y1="11" x2="11" y2="39" />
        </g>

        {/* 5. Wheelbarrow */}
        <g transform="translate(385, 10) scale(0.65)" stroke="#0B2545" strokeWidth="3" strokeLinecap="round">
          <circle cx="15" cy="35" r="7" fill="#0B2545" />
          <path d="M15 35 L45 35 L52 18 L24 18 Z" fill="#0B2545" />
          <line x1="20" y1="22" x2="8" y2="8" stroke="#0B2545" strokeWidth="4" />
        </g>
      </g>

      {/* Category Text Sub-Bar */}
      <text
        x="250"
        y="402"
        textAnchor="middle"
        fill="#0B2545"
        fontFamily="'Outfit', sans-serif"
        fontWeight="800"
        fontSize="11"
        letterSpacing="2"
      >
        LAWN CARE • CLEANUPS • MAINTENANCE • REPAIRS
      </text>

      {/* Slogan in Script */}
      <text
        x="250"
        y="435"
        textAnchor="middle"
        fill="#0B2545"
        fontFamily="'Caveat', cursive"
        fontWeight="700"
        fontSize="24"
        className="select-none"
      >
        Built on Hard Work, Honesty & Service
      </text>

      {/* Bottom Star & Patriot Stripes */}
      <g transform="translate(250, 460)">
        <polygon
          points="0,-9 3,-3 9,-3 4,2 6,8 0,4 -6,8 -4,2 -9,-3 -3,-3"
          fill="#0B2545"
        />
        <line x1="-80" y1="-3" x2="-20" y2="-3" stroke="#C8102E" strokeWidth="4" strokeLinecap="round" />
        <line x1="-60" y1="5" x2="-20" y2="5" stroke="#C8102E" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="-3" x2="80" y2="-3" stroke="#C8102E" strokeWidth="4" strokeLinecap="round" />
        <line x1="20" y1="5" x2="60" y2="5" stroke="#C8102E" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );

  if (variant === 'badge' || variant === 'mark-only') {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 max-w-full aspect-square ${className}`}
        style={{
          width: size === 'responsive' ? 'clamp(110px, 28vw, 180px)' : badgeDimensions.width,
          height: size === 'responsive' ? 'clamp(110px, 28vw, 180px)' : badgeDimensions.height
        }}
      >
        {CircularBadgeSvg}
      </div>
    );
  }

  // Horizontal lockup for navigation top bar
  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 select-none shrink-0 ${className}`}>
      <div
        className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center"
      >
        {CircularBadgeSvg}
      </div>
      <div className="flex flex-col justify-center text-left">
        <span className="font-badge font-bold tracking-tight text-[#0B2545] leading-none text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
          EAGLE'S NEST
        </span>
        <span className="font-display text-[8px] sm:text-[10px] md:text-xs font-extrabold tracking-[0.15em] sm:tracking-[0.2em] text-[#C8102E] uppercase mt-0.5 leading-none whitespace-nowrap">
          PROPERTY CARE
        </span>
      </div>
    </div>
  );
};

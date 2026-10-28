import React from 'react';

// 1. Isometric 3D Cube with multicolor facets (Green, Orange, Magenta, Sky-Blue)
export const IsometricCube: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-md transition-transform hover:scale-110 ${className}`}
    >
      {/* Top face */}
      <path
        d="M50 15 L85 35 L50 55 L15 35 Z"
        fill="#38BDF8"
        stroke="#0F172A"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Top cylinder button */}
      <ellipse cx="50" cy="35" rx="14" ry="7" fill="#FF007A" stroke="#0F172A" strokeWidth="3" />
      <path d="M36 35 V39 C36 43 64 43 64 39 V35 Z" fill="#FF5500" stroke="#0F172A" strokeWidth="3" />

      {/* Left face */}
      <path
        d="M15 35 L50 55 V90 L15 70 Z"
        fill="#00E599"
        stroke="#0F172A"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Right face */}
      <path
        d="M50 55 L85 35 V70 L50 90 Z"
        fill="#FF5500"
        stroke="#0F172A"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Hatching accents on right face */}
      <line x1="56" y1="62" x2="79" y2="48" stroke="#0F172A" strokeWidth="2.5" />
      <line x1="56" y1="72" x2="79" y2="58" stroke="#0F172A" strokeWidth="2.5" />
      <line x1="56" y1="82" x2="79" y2="68" stroke="#0F172A" strokeWidth="2.5" />
    </svg>
  );
};

// 2. Isometric 3D Staircase Step Block
export const IsometricStairs: React.FC<{ size?: number; className?: string }> = ({
  size = 54,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-md transition-transform hover:scale-110 ${className}`}
    >
      {/* Stair structure */}
      <path
        d="M20 70 L40 58 V42 L65 27 V15 L95 32 V50 L75 62 V78 L50 93 V105 L20 88 Z"
        fill="#FF007A"
        stroke="#0F172A"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Step surfaces (Green & Sky Blue) */}
      <path d="M65 15 L95 32 L75 44 L45 27 Z" fill="#00E599" stroke="#0F172A" strokeWidth="3.5" />
      <path d="M45 42 L75 59 L55 71 L25 54 Z" fill="#38BDF8" stroke="#0F172A" strokeWidth="3.5" />
      <path d="M25 70 L55 87 L35 99 L5 82 Z" fill="#FF6B00" stroke="#0F172A" strokeWidth="3.5" />
      
      {/* Hatching pattern on front step */}
      <line x1="12" y1="83" x2="25" y2="76" stroke="#0F172A" strokeWidth="2" />
      <line x1="17" y1="89" x2="30" y2="82" stroke="#0F172A" strokeWidth="2" />
    </svg>
  );
};

// 3. Striped Cylinder Tube with 3D Pop Angle
export const StripedTube: React.FC<{ size?: number; className?: string }> = ({
  size = 50,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-md transition-transform hover:scale-110 ${className}`}
    >
      {/* Cylinder body */}
      <g transform="rotate(-30 50 50)">
        {/* Stripe segments */}
        <rect x="25" y="25" width="12" height="50" fill="#00E599" stroke="#0F172A" strokeWidth="3.5" />
        <rect x="37" y="25" width="12" height="50" fill="#38BDF8" stroke="#0F172A" strokeWidth="3.5" />
        <rect x="49" y="25" width="12" height="50" fill="#FF007A" stroke="#0F172A" strokeWidth="3.5" />
        <rect x="61" y="25" width="12" height="50" fill="#FF6B00" stroke="#0F172A" strokeWidth="3.5" />
        
        {/* Top oval cap */}
        <ellipse cx="48.5" cy="25" rx="24" ry="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
        <ellipse cx="48.5" cy="25" rx="14" ry="5.5" fill="#FF6B00" stroke="#0F172A" strokeWidth="2.5" />

        {/* Bottom cap */}
        <ellipse cx="48.5" cy="75" rx="24" ry="10" fill="#38BDF8" stroke="#0F172A" strokeWidth="3.5" />
      </g>
    </svg>
  );
};

// 4. Pop Art Blob Sticker
export const PopBlob: React.FC<{ size?: number; className?: string }> = ({
  size = 46,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-md transition-transform hover:scale-110 ${className}`}
    >
      <path
        d="M20 45 C15 25 35 15 55 20 C75 15 90 30 85 55 C95 75 75 90 55 85 C35 95 15 80 20 55 Z"
        fill="#FF007A"
        stroke="#0F172A"
        strokeWidth="4"
      />
      <circle cx="45" cy="45" r="8" fill="#FF6B00" stroke="#0F172A" strokeWidth="2.5" />
      <path
        d="M30 65 Q50 75 70 65"
        stroke="#00E599"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

// 5. Hero Art Piece: The core graphic with smooth sticker borders and floating shadows
export const HeroAbstractPiece: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-64 h-64 sm:w-80 sm:h-80',
    lg: 'w-80 h-80 sm:w-96 sm:h-96',
    xl: 'w-96 h-96 sm:w-[28rem] sm:h-[28rem]',
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background glow circle */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF007A]/20 via-[#FF6B00]/20 to-[#00E599]/20 rounded-full blur-2xl scale-95 pointer-events-none" />

      {/* Main Art Cutout with bold sticker outline & shadow */}
      <div className={`relative ${sizeClasses[size]} transition-transform duration-500 hover:rotate-1`}>
        <img
          src="/art-memphis-pop.png"
          alt="Trackaa Abstract Pop Art"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

// 6. Floating Abstract Accent Cluster for section banners, card headers, and backgrounds
export const AbstractHeaderFlourish: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <div className="animate-float">
        <IsometricCube size={28} />
      </div>
      <div className="animate-float-delayed">
        <StripedTube size={26} />
      </div>
      <div className="animate-wiggle">
        <IsometricStairs size={30} />
      </div>
    </div>
  );
};

// 7. Mini Sticker Badge with Neo-Memphis Style
export const MemphisStickerBadge: React.FC<{
  icon?: string;
  text: string;
  color?: 'magenta' | 'orange' | 'green' | 'blue';
  className?: string;
}> = ({ icon, text, color = 'magenta', className = '' }) => {
  const bgColors = {
    magenta: 'bg-[#FF007A] text-white border-[#0F172A]',
    orange: 'bg-[#FF6B00] text-white border-[#0F172A]',
    green: 'bg-[#00E599] text-slate-950 border-[#0F172A]',
    blue: 'bg-[#38BDF8] text-slate-950 border-[#0F172A]',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide border-2 shadow-[2px_2px_0px_0px_#0F172A] ${bgColors[color]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </div>
  );
};

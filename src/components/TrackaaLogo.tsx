import React from 'react';

interface TrackaaLogoProps {
  className?: string;
  variant?: 'auto' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const TrackaaLogo: React.FC<TrackaaLogoProps> = ({
  className = '',
  variant = 'auto',
  size = 'md',
  showText = true,
}) => {
  // Dimension maps
  const heightClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-11',
    xl: 'h-14',
  };

  // We have both the exact cropped image assets and an ultra-sharp vector SVG fallback
  return (
    <div className={`inline-flex items-center gap-2.5 select-none transition-all duration-200 ${className}`}>
      {/* Dynamic responsive image based on theme */}
      <picture className="flex items-center">
        {variant === 'auto' ? (
          <>
            <source srcSet="/trackaa-logo-dark.png" media="(prefers-color-scheme: dark)" />
            {/* When inside an element with .dark class, we use dynamic CSS */}
            <div className="relative flex items-center">
              <img
                src="/trackaa-logo-light.png"
                alt="Trackaa Logo"
                className={`w-auto object-contain transition-opacity duration-200 dark:hidden ${heightClasses[size]}`}
              />
              <img
                src="/trackaa-logo-dark.png"
                alt="Trackaa Logo"
                className={`w-auto object-contain transition-opacity duration-200 hidden dark:block ${heightClasses[size]}`}
              />
            </div>
          </>
        ) : variant === 'dark' ? (
          <img
            src="/trackaa-logo-dark.png"
            alt="Trackaa Logo"
            className={`w-auto object-contain ${heightClasses[size]}`}
          />
        ) : (
          <img
            src="/trackaa-logo-light.png"
            alt="Trackaa Logo"
            className={`w-auto object-contain ${heightClasses[size]}`}
          />
        )}
      </picture>
    </div>
  );
};

export const TrackaaMark: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <div 
      style={{ width: size, height: size }} 
      className={`relative rounded-xl overflow-hidden shadow-sm flex items-center justify-center ${className}`}
    >
      <img
        src="/trackaa-mark-light.png"
        alt="Trackaa Mark"
        className="w-full h-full object-cover dark:hidden"
      />
      <img
        src="/trackaa-mark-dark.png"
        alt="Trackaa Mark"
        className="w-full h-full object-cover hidden dark:block"
      />
    </div>
  );
};

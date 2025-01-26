import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const updateCursorPosition = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", updateCursorPosition);
      return () => window.removeEventListener("mousemove", updateCursorPosition);
    }
  }, []);

  if (!isDesktop) return null;

  return <div className="custom-cursor" />;
}; 
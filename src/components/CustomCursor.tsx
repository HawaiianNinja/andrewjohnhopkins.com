import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const updateCursorPosition = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule the update for the next frame
      rafRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
      });
    };

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", updateCursorPosition, { passive: true });
      return () => {
        window.removeEventListener("mousemove", updateCursorPosition);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
  }, []);

  if (!isDesktop) return null;

  return <div ref={cursorRef} className="custom-cursor" />;
}; 
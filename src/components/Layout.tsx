import React from 'react';
import { Outlet } from 'react-router-dom';
import { Theme } from '../types';
import { CustomCursor } from './CustomCursor';
import { ThemeSwitcher } from './ThemeSwitcher';
import '../cursor.css';

interface LayoutProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const Layout: React.FC<LayoutProps> = ({ theme, onThemeChange }) => {
  return (
    <>
      <CustomCursor />
      <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />
      <div className={`min-h-screen ${theme === "cyberpunk" ? "" : `theme-${theme}`}`}>
        <div className="scanline" />
        <Outlet />
      </div>
    </>
  );
};

export default Layout; 
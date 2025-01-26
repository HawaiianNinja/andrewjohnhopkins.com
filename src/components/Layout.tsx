import React from 'react';
import { Outlet } from 'react-router-dom';
import { Theme } from '../types';
import { CustomCursor } from './CustomCursor';
import Header from './Header';
import '../cursor.css';

interface LayoutProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const Layout: React.FC<LayoutProps> = ({ theme, onThemeChange }) => {
  return (
    <>
      <CustomCursor />
      <div className={`min-h-screen ${theme === "cyberpunk" ? "" : `theme-${theme}`}`}>
        <div className="scanline" />
        <Header theme={theme} onThemeChange={onThemeChange} />
        <main className="pt-20 container mx-auto px-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout; 
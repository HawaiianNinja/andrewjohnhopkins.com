import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Theme } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeChange }) => {
  const location = useLocation();
  const currentPage = location.pathname === '/' ? '' :
    location.pathname.slice(1).toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b-2 border-primary
                      [box-shadow:_0_0_10px_var(--primary)]">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="retro-text-pink hover:retro-text-cyan transition-colors tracking-[0.2em] font-bold text-lg"
          >
            HOME
          </Link>
          {currentPage && (
            <span className="retro-text-cyan tracking-[0.2em] font-bold">
              {currentPage}
            </span>
          )}
        </div>
        <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />
      </nav>
    </header>
  );
};

export default Header; 
import React, { useState } from 'react';
import { Theme, themes } from '../types';

interface ThemeSwitcherProps {
    currentTheme: Theme;
    onThemeChange: (theme: Theme) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 border-2 border-primary rounded-md outline-none
                   [box-shadow:_0_0_10px_var(--primary),_inset_0_0_10px_var(--primary)]
                   hover:border-secondary hover:[box-shadow:_0_0_15px_var(--secondary),_inset_0_0_15px_var(--secondary)]
                   transition-all duration-300
                   flex items-center gap-2
                   backdrop-blur-md bg-black/50"
                aria-label="Toggle theme menu"
            >
                <span className="retro-text-pink hover:retro-text-cyan transition-colors tracking-[0.2em] font-bold">
                    {themes.find((t) => t.id === currentTheme)?.name || "THEME"}
                </span>
                <span className={`retro-text-pink transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-full min-w-[150px] border-2 border-primary rounded-md 
                        [box-shadow:_0_0_10px_var(--primary)]
                        backdrop-blur-md bg-black/50">
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => {
                                onThemeChange(t.id);
                                setIsOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left tracking-[0.2em] font-bold outline-none
                         transition-all duration-300
                         ${currentTheme === t.id
                                    ? 'retro-text-cyan [box-shadow:_0_0_10px_var(--secondary),_inset_0_0_10px_var(--secondary)]'
                                    : 'retro-text-pink hover:retro-text-cyan'}`}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}; 
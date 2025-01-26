import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Clock, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="retro-panel mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl retro-text-pink font-bold tracking-[0.2em]">
          WEATHER STATION ALPHA
        </h1>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Clock
              className="w-6 h-6"
              style={{ color: "var(--neon-secondary)" }}
            />
            <span className="retro-text-cyan text-xl">
              {format(currentTime, "HH:mm:ss")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar
              className="w-6 h-6"
              style={{ color: "var(--neon-secondary)" }}
            />
            <span className="retro-text-cyan text-xl">
              {format(currentTime, "yyyy-MM-dd")}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}; 
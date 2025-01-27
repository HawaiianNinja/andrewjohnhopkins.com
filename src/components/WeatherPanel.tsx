import React from 'react';
import { LucideIcon } from 'lucide-react';
import { WeatherDataForRoom } from '../types';
import { WeatherChart } from './WeatherChart';

interface WeatherPanelProps {
  title: string;
  data: WeatherDataForRoom[];
  icon: LucideIcon;
  unit: string;
}

export const WeatherPanel: React.FC<WeatherPanelProps> = ({
  title,
  data,
  icon: Icon,
  unit,
}) => {
  const getCurrentValue = (data: WeatherDataForRoom[], unit: string) => {
    if (data.length === 0) return "N/A";
    // Get the most recent value from any room
    const latestValues = data
      .map(room => room.data[room.data.length - 1]?.value)
      .filter(value => value !== undefined)
      .map(value => parseFloat(value));

    return latestValues.length > 0
      ? `${latestValues.reduce((a, b) => Math.max(a, b)).toFixed(1)}${unit}`
      : "N/A";
  };

  return (
    <div className="retro-panel">
      <div className="flex items-center gap-3 mb-4">
        <Icon
          className="w-8 h-8"
          style={{ color: "var(--neon-primary)" }}
        />
        <h2 className="text-2xl retro-text-pink tracking-[0.15em]">
          {title}
        </h2>
      </div>
      <div className="retro-screen">
        <div className="text-4xl md:text-6xl font-bold mb-4 retro-text text-center">
          {getCurrentValue(data, unit)}
        </div>
        <WeatherChart data={data} />
      </div>
    </div>
  );
}; 
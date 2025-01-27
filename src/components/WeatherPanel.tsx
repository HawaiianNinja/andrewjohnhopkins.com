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

    const livingRoomData = data.find(room => room.room === "living-room");
    if (!livingRoomData || livingRoomData.data.length === 0) return "N/A";

    const latestValue = livingRoomData.data[livingRoomData.data.length - 1].value;
    return `${parseFloat(latestValue).toFixed(1)}${unit}`;
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
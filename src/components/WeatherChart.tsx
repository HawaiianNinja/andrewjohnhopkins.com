import React, { useMemo } from 'react';
import { parseISO } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { WeatherDataForRoom } from '../types';

interface WeatherChartProps {
  data: WeatherDataForRoom[];
}

interface FormattedDataPoint {
  time: Date;
  [key: string]: number | Date;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length || !label) {
    return null;
  }
  return (
    <div style={{
      backgroundColor: "rgba(0,0,0,0.8)",
      border: "1px solid #0ff0ff",
      padding: "8px",
    }}>
      <p>{format(toZonedTime(label, Intl.DateTimeFormat().resolvedOptions().timeZone), "yyyy-MM-dd hh:mm a")}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey}>{`${p.name}: ${p.value.toFixed(1)}`}</p>
      ))}
    </div>
  );
};

export const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const formattedData = useMemo(() => {
    // Create a map of all timestamps
    const timestampMap = new Map<string, FormattedDataPoint>();

    // Process data from each room
    data.forEach(roomData => {
      roomData.data.forEach(reading => {
        const time = parseISO(reading.ts);
        const existingData = timestampMap.get(reading.ts) || { time };
        timestampMap.set(reading.ts, {
          ...existingData,
          [roomData.room]: parseFloat(reading.value),
        });
      });
    });

    // Convert map to array and sort by timestamp
    return Array.from(timestampMap.values())
      .sort((a, b) => a.time.getTime() - b.time.getTime());
  }, [data]);

  const domain = useMemo(() => {
    if (data.length === 0) return [0, 100];
    const values = data.flatMap(room =>
      room.data.map(d => parseFloat(d.value))
    );
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.01;
    return [Math.max(0, Math.floor(min - padding)), Math.ceil(max + padding)];
  }, [data]);

  const timeZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const timeFormatter = useMemo(() => (time: Date) =>
    format(toZonedTime(time, timeZone), "HH:mm"), [timeZone]);

  const colors = ["#ff0099", "#00ff99", "#0099ff", "#ff9900", "#9900ff"];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={formattedData}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,255,0.1)" />
        <XAxis
          dataKey="time"
          tickFormatter={timeFormatter}
          stroke="#0ff0ff"
          tick={{ fill: "#0ff0ff" }}
          interval="preserveStartEnd"
        />
        <YAxis
          stroke="#0ff0ff"
          tick={{ fill: "#0ff0ff" }}
          domain={domain}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {data.map((room, index) => (
          <Line
            key={room.room}
            type="monotone"
            dataKey={room.room}
            name={room.room}
            stroke={colors[index % colors.length]}
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}; 
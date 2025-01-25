import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import "./cursor.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Thermometer,
  Droplets,
  Clock,
  Calendar,
  Gauge,
  Sun,
} from "lucide-react";

interface WeatherData {
  value: string;
  ts: string;
}

interface SensorData {
  temperature: WeatherData[];
  humidity: WeatherData[];
  pressure: WeatherData[];
  lux: WeatherData[];
}

type Theme =
  | "cyberpunk"
  | "synthwave"
  | "vaporwave"
  | "retro-computer"
  | "matrix"
  | "commodore"
  | "amber"
  | "ibm"
  | "apple2"
  | "spectrum"
  | "atari"
  | "dos"
  | "gameboy"
  | "vectrex";

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState<Theme>("cyberpunk");
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: [],
    humidity: [],
    pressure: [],
    lux: [],
  });

  // Theme management
  useEffect(() => {
    document.documentElement.className =
      theme === "cyberpunk" ? "theme-cyberpunk" : `theme-${theme}`;
  }, [theme]);

  const themes: { id: Theme; name: string }[] = [
    { id: "cyberpunk", name: "Cyberpunk" },
    { id: "synthwave", name: "Synthwave" },
    { id: "vaporwave", name: "Vaporwave" },
    { id: "retro-computer", name: "Retro Computer" },
    { id: "matrix", name: "Matrix" },
    { id: "commodore", name: "Commodore 64" },
    { id: "amber", name: "Amber Terminal" },
    { id: "ibm", name: "IBM PC" },
    { id: "apple2", name: "Apple II" },
    { id: "spectrum", name: "ZX Spectrum" },
    { id: "atari", name: "Atari ST" },
    { id: "dos", name: "DOS" },
    { id: "gameboy", name: "Game Boy" },
    { id: "vectrex", name: "Vectrex" },
  ];

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const sensors = ["temperature", "humidity", "pressure", "lux"];
        const responses = await Promise.all(
          sensors.map((sensor) =>
            fetch(
              `https://api.andrewjohnhopkins.com/weather/query?start=2025-01-24%2008:01&end=2025-01-25%2008:01&period=5m&aggregation=avg&sensor=${sensor}`
            ).then((res) => res.json())
          )
        );

        const newSensorData: SensorData = {
          temperature: responses[0].data[0]?.data || [],
          humidity: responses[1].data[0]?.data || [],
          pressure: responses[2].data[0]?.data || [],
          lux: responses[3].data[0]?.data || [],
        };

        setSensorData(newSensorData);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    return () => window.removeEventListener("mousemove", updateCursorPosition);
  }, []);

  // Helper function to format chart data
  const formatChartData = (data: WeatherData[]) => {
    return data.map((reading) => ({
      time: parseISO(reading.ts),
      value: parseFloat(reading.value),
    }));
  };

  // Helper function to calculate Y-axis domain with some padding
  const calculateDomain = (data: WeatherData[]) => {
    if (data.length === 0) return [0, 100];
    const values = data.map((d) => parseFloat(d.value));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1; // Add 10% padding
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  };

  // Helper function to get current value
  const getCurrentValue = (data: WeatherData[], unit: string) => {
    return data.length > 0
      ? `${parseFloat(data[data.length - 1].value).toFixed(1)}${unit}`
      : "N/A";
  };

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />
      <div className="theme-switcher">
        <div className="theme-menu">
          <button className="theme-toggle" aria-label="Toggle theme menu">
            <span className="theme-current">
              {themes.find((t) => t.id === theme)?.name || "Theme"}
            </span>
            <span className="theme-icon">▼</span>
          </button>
          <div className="theme-options">
            {themes.map((t) => (
              <button
                key={t.id}
                className={`theme-option ${theme === t.id ? "active" : ""}`}
                onClick={() => setTheme(t.id)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`min-h-screen p-6 cursor-none ${
          theme === "cyberpunk" ? "" : `theme-${theme}`
        }`}
      >
        <div className="scanline" />
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="retro-panel">
              <div className="flex items-center gap-3 mb-4">
                <Thermometer
                  className="w-8 h-8"
                  style={{ color: "var(--neon-primary)" }}
                />
                <h2 className="text-2xl retro-text-pink tracking-[0.15em]">
                  TEMPERATURE
                </h2>
              </div>
              <div className="retro-screen">
                <div className="text-6xl font-bold mb-4 retro-text text-center">
                  {getCurrentValue(sensorData.temperature, "°F")}
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={formatChartData(sensorData.temperature)}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="time"
                      tickFormatter={(time) => format(time, "HH:mm")}
                      stroke="#0ff0ff"
                      tick={{ fill: "#0ff0ff" }}
                    />
                    <YAxis
                      stroke="#0ff0ff"
                      tick={{ fill: "#0ff0ff" }}
                      domain={calculateDomain(sensorData.temperature)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,34,0.9)",
                        border: "2px solid #0ff0ff",
                        borderRadius: "4px",
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                      }}
                      labelFormatter={(time) =>
                        format(time, "yyyy-MM-dd HH:mm")
                      }
                      formatter={(value: number) => [
                        `${value.toFixed(1)}°F`,
                        "Temperature",
                      ]}
                      itemStyle={{ color: "#0ff0ff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ff00ff"
                      strokeWidth={3}
                      dot={false}
                      filter="url(#glow)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="retro-panel">
              <div className="flex items-center gap-3 mb-4">
                <Droplets
                  className="w-8 h-8"
                  style={{ color: "var(--neon-primary)" }}
                />
                <h2 className="text-2xl retro-text-pink tracking-[0.15em]">
                  HUMIDITY
                </h2>
              </div>
              <div className="retro-screen">
                <div className="text-6xl font-bold mb-4 retro-text text-center">
                  {getCurrentValue(sensorData.humidity, "%")}
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={formatChartData(sensorData.humidity)}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="time"
                      tickFormatter={(time) => format(time, "HH:mm")}
                      stroke="#0ff0ff"
                      tick={{ fill: "#0ff0ff" }}
                    />
                    <YAxis
                      stroke="#0ff0ff"
                      tick={{ fill: "#0ff0ff" }}
                      domain={calculateDomain(sensorData.humidity)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,34,0.9)",
                        border: "2px solid #0ff0ff",
                        borderRadius: "4px",
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                      }}
                      labelFormatter={(time) =>
                        format(time, "yyyy-MM-dd HH:mm")
                      }
                      formatter={(value: number) => [
                        `${value.toFixed(1)}%`,
                        "Humidity",
                      ]}
                      itemStyle={{ color: "#0ff0ff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ff00ff"
                      strokeWidth={3}
                      dot={false}
                      filter="url(#glow)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="retro-panel">
              <div className="flex items-center gap-3 mb-4">
                <Gauge
                  className="w-8 h-8"
                  style={{ color: "var(--neon-primary)" }}
                />
                <h2 className="text-2xl retro-text-pink tracking-[0.15em]">
                  PRESSURE
                </h2>
              </div>
              <div className="retro-screen">
                <div className="text-6xl font-bold mb-4 retro-text text-center">
                  {getCurrentValue(sensorData.pressure, " hPa")}
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={formatChartData(sensorData.pressure)}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="time"
                      tickFormatter={(time) => format(time, "HH:mm")}
                      stroke="#0ff0ff"
                      tick={{ fill: "#0ff0ff" }}
                    />
                    <YAxis
                      stroke="#0ff0ff"
                      tick={{ fill: "#0ff0ff" }}
                      domain={calculateDomain(sensorData.pressure)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,34,0.9)",
                        border: "2px solid #0ff0ff",
                        borderRadius: "4px",
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                      }}
                      labelFormatter={(time) =>
                        format(time, "yyyy-MM-dd HH:mm")
                      }
                      formatter={(value: number) => [
                        `${value.toFixed(1)} hPa`,
                        "Pressure",
                      ]}
                      itemStyle={{ color: "#0ff0ff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ff00ff"
                      strokeWidth={3}
                      dot={false}
                      filter="url(#glow)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="retro-panel">
              <div className="flex items-center gap-3 mb-4">
                <Sun
                  className="w-8 h-8"
                  style={{ color: "var(--neon-primary)" }}
                />
                <h2 className="text-2xl retro-text-pink tracking-[0.15em]">
                  LIGHT
                </h2>
              </div>
              <div className="retro-screen">
                <div className="text-6xl font-bold mb-4 retro-text text-center">
                  {getCurrentValue(sensorData.lux, " lux")}
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={formatChartData(sensorData.lux)}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="time"
                      tickFormatter={(time) => format(time, "HH:mm")}
                      stroke="#0ff0ff"
                      tick={{ fill: "#0ff0ff" }}
                    />
                    <YAxis
                      stroke="#0ff0ff"
                      tick={{ fill: "#0ff0ff" }}
                      domain={calculateDomain(sensorData.lux)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(0,0,34,0.9)",
                        border: "2px solid #0ff0ff",
                        borderRadius: "4px",
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                      }}
                      labelFormatter={(time) =>
                        format(time, "yyyy-MM-dd HH:mm")
                      }
                      formatter={(value: number) => [
                        `${value.toFixed(1)} lux`,
                        "Light",
                      ]}
                      itemStyle={{ color: "#0ff0ff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ff00ff"
                      strokeWidth={3}
                      dot={false}
                      filter="url(#glow)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <footer className="retro-panel">
            <div className="text-center retro-text-cyan text-lg tracking-[0.2em]">
              SYSTEM STATUS:{" "}
              {sensorData.temperature.length > 0 ? "OPERATIONAL" : "LOADING"} •
              LAST UPDATE: {format(currentTime, "HH:mm:ss")}
            </div>
          </footer>

          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}

export default App;

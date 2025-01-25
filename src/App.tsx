import React, { useEffect, useState } from "react";
import { Thermometer, Droplets, Gauge, Sun } from "lucide-react";
import "./cursor.css";
import { SensorData, Theme } from "./types";
import { CustomCursor } from "./components/CustomCursor";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Header } from "./components/Header";
import { WeatherPanel } from "./components/WeatherPanel";

function App() {
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

  return (
    <>
      <CustomCursor />
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
      <div className={`min-h-screen p-6 cursor-none ${theme === "cyberpunk" ? "" : `theme-${theme}`}`}>
        <div className="scanline" />
        <div className="max-w-7xl mx-auto">
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <WeatherPanel
              title="TEMPERATURE"
              data={sensorData.temperature}
              icon={Thermometer}
              unit="°F"
            />
            <WeatherPanel
              title="HUMIDITY"
              data={sensorData.humidity}
              icon={Droplets}
              unit="%"
            />
            <WeatherPanel
              title="PRESSURE"
              data={sensorData.pressure}
              icon={Gauge}
              unit=" hPa"
            />
            <WeatherPanel
              title="LIGHT"
              data={sensorData.lux}
              icon={Sun}
              unit=" lux"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

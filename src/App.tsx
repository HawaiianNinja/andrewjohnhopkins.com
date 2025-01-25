import React, { useEffect, useState } from "react";
import { Thermometer, Droplets, Gauge, Sun, Wind, Atom } from "lucide-react";
import { format } from "date-fns";
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
    CO2: [],
    pm10_env: [],
    pm25_env: [],
    pm100_env: [],
  });

  // Theme management
  useEffect(() => {
    document.documentElement.className =
      theme === "cyberpunk" ? "theme-cyberpunk" : `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const endDate = new Date();
        console.log("original end date", endDate);
        const offset = endDate.getTimezoneOffset();
        console.log("offset", offset);
        endDate.setHours(endDate.getHours() + offset/60);
        console.log("adjusted end date", endDate);
        const startDate = new Date(endDate);
        startDate.setHours(endDate.getHours() - 24);

        const formatDate = (date: Date) => {
          return format(date, 'yyyy-MM-dd HH:mm');
        };
//GET
	//https://api.andrewjohnhopkins.com/weather/query?start=2025-01-24T09:34:04&end=2025-01-25T09:34:04&period=5m&aggregation=avg&sensor=pm10_env
// GET
//	https://api.andrewjohnhopkins.com/weather/query?start=2025-01-24 09:37&end=2025-01-25 09:37&period=5m&aggregation=avg&sensor=5.0um
        const sensors = [
          "temperature",
          "humidity",
          "pressure",
          "lux",
          "CO2",
          "pm10_env",
          "pm25_env",
          "pm100_env"
        ];
        const responses = await Promise.all(
          sensors.map((sensor) =>
            fetch(
              `https://api.andrewjohnhopkins.com/weather/query?start=${encodeURIComponent(formatDate(startDate))}&end=${encodeURIComponent(formatDate(endDate))}&period=5m&aggregation=avg&sensor=${sensor}`
            ).then((res) => res.json())
          )
        );

        const newSensorData: SensorData = {
          temperature: responses[0].data[0]?.data || [],
          humidity: responses[1].data[0]?.data || [],
          pressure: responses[2].data[0]?.data || [],
          lux: responses[3].data[0]?.data || [],
          CO2: responses[4].data[0]?.data || [],
          pm10_env: responses[5].data[0]?.data || [],
          pm25_env: responses[6].data[0]?.data || [],
          pm100_env: responses[7].data[0]?.data || [],
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
            <WeatherPanel
              title="CO₂"
              data={sensorData.CO2}
              icon={Wind}
              unit=" ppm"
            />
            <WeatherPanel
              title="PM 1.0"
              data={sensorData.pm10_env}
              icon={Atom}
              unit=" µg/m³"
            />
            <WeatherPanel
              title="PM 2.5"
              data={sensorData.pm25_env}
              icon={Atom}
              unit=" µg/m³"
            />
            <WeatherPanel
              title="PM 10"
              data={sensorData.pm100_env}
              icon={Atom}
              unit=" µg/m³"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

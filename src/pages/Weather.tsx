import React, { useEffect, useState } from "react";
import { Thermometer, Droplets, Gauge, Sun, Wind, Atom } from "lucide-react";
import { format } from "date-fns";
import { WeatherData, WeatherDataForRoom } from "../types";
import { WeatherPanel } from "../components/WeatherPanel";

type TimeRange = "day" | "week" | "month" | "year";

const TimeRangeSelector: React.FC<{
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}> = ({ value, onChange }) => (
  <div className="mb-8 flex flex-col items-center">
    <h2 className="mb-4 text-2xl retro-text-pink font-bold tracking-[0.2em] uppercase text-center">
      Time Range
    </h2>
    <div className="inline-flex flex-wrap justify-center gap-3 p-2">
      {["day", "week", "month", "year"].map((range) => (
        <button
          key={range}
          onClick={() => onChange(range as TimeRange)}
          className={`
            relative px-4 py-2 
            font-bold tracking-wider
            transition-all duration-200
            border-2 rounded-md
            text-sm sm:text-base sm:px-6 sm:tracking-[0.2em]
            ${value === range
              ? "retro-text-pink border-primary animate-pulse-slow [box-shadow:_0_0_10px_var(--primary),_inset_0_0_10px_var(--primary)]"
              : "retro-text-cyan border-secondary hover:border-primary hover:[box-shadow:_0_0_5px_var(--primary)]"
            }
          `}
        >
          {range.toUpperCase()}
        </button>
      ))}
    </div>
  </div>
);

const Weather: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("day");
  const [temperature, setTemperature] = useState<WeatherDataForRoom[]>([]);
  const [humidity, setHumidity] = useState<WeatherDataForRoom[]>([]);
  const [pressure, setPressure] = useState<WeatherDataForRoom[]>([]);
  const [lux, setLux] = useState<WeatherDataForRoom[]>([]);
  const [co2, setCo2] = useState<WeatherDataForRoom[]>([]);
  const [pm10, setPm10] = useState<WeatherDataForRoom[]>([]);
  const [pm25, setPm25] = useState<WeatherDataForRoom[]>([]);
  const [pm100, setPm100] = useState<WeatherDataForRoom[]>([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const endDate = new Date();
        const offset = endDate.getTimezoneOffset();
        endDate.setHours(endDate.getHours() + offset / 60);
        const startDate = new Date(endDate);

        switch (timeRange) {
          case "day":
            startDate.setHours(endDate.getHours() - 24);
            break;
          case "week":
            startDate.setDate(endDate.getDate() - 7);
            break;
          case "month":
            startDate.setMonth(endDate.getMonth() - 1);
            break;
          case "year":
            startDate.setFullYear(endDate.getFullYear() - 1);
            break;
        }

        const formatDate = (date: Date) => {
          return format(date, 'yyyy-MM-dd HH:mm');
        };

        const period = (() => {
          switch (timeRange) {
            case "day":
            case "week":
              return "5m";
            case "month":
              return "2h";
            case "year":
              return "6h";
          }
        })();

        const sensorSetters = {
          temperature: setTemperature,
          humidity: setHumidity,
          pressure: setPressure,
          lux: setLux,
          CO2: setCo2,
          pm10_env: setPm10,
          pm25_env: setPm25,
          pm100_env: setPm100,
        };

        Object.entries(sensorSetters).forEach(async ([sensor, setter]) => {
          try {
            const response = await fetch(
              `https://api.andrewjohnhopkins.com/weather/query?start=${encodeURIComponent(formatDate(startDate))}&end=${encodeURIComponent(formatDate(endDate))}&period=${period}&aggregation=avg&sensor=${sensor}`
            );
            const data: WeatherData = await response.json();
            setter(data.data);
          } catch (error) {
            console.error(`Error fetching ${sensor} data:`, error);
          }
        });
      } catch (error) {
        console.error("Error in fetch setup:", error);
      }
    };

    fetchSensorData();
  }, [timeRange]); // Add timeRange as dependency since it affects the fetch parameters

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <WeatherPanel
            title="TEMPERATURE"
            data={temperature}
            icon={Thermometer}
            unit="°F"
          />
          <WeatherPanel
            title="HUMIDITY"
            data={humidity}
            icon={Droplets}
            unit="%"
          />
          <WeatherPanel
            title="CO₂"
            data={co2}
            icon={Wind}
            unit=" ppm"
          />
          <WeatherPanel
            title="LIGHT"
            data={lux}
            icon={Sun}
            unit=" lux"
          />
          <WeatherPanel
            title="PM 1.0"
            data={pm10}
            icon={Atom}
            unit=" µg/m³"
          />
          <WeatherPanel
            title="PM 2.5"
            data={pm25}
            icon={Atom}
            unit=" µg/m³"
          />
          <WeatherPanel
            title="PM 10"
            data={pm100}
            icon={Atom}
            unit=" µg/m³"
          />
          <WeatherPanel
            title="PRESSURE"
            data={pressure}
            icon={Gauge}
            unit=" hPa"
          />
        </div>
      </div>
    </div>
  );
};

export default Weather; 
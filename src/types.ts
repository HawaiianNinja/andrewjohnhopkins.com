export interface WeatherDatapoint {
  value: string;
  ts: string;
}

export interface WeatherDataForRoom {
  room: string;
  sensor: string;
  data: WeatherDatapoint[];
}

export interface WeatherData {
  data: WeatherDataForRoom[];
}

export interface SensorData {
  temperature: WeatherData[];
  humidity: WeatherData[];
  pressure: WeatherData[];
  lux: WeatherData[];
  CO2: WeatherData[];
  pm10_env: WeatherData[];
  pm25_env: WeatherData[];
  pm100_env: WeatherData[];
}

export type Theme =
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

export const themes = [
  { id: "cyberpunk" as Theme, name: "Cyberpunk" },
  { id: "synthwave" as Theme, name: "Synthwave" },
  { id: "vaporwave" as Theme, name: "Vaporwave" },
  { id: "retro-computer" as Theme, name: "Retro Computer" },
  { id: "matrix" as Theme, name: "Matrix" },
  { id: "commodore" as Theme, name: "Commodore 64" },
  { id: "amber" as Theme, name: "Amber Terminal" },
  { id: "ibm" as Theme, name: "IBM PC" },
  { id: "apple2" as Theme, name: "Apple II" },
  { id: "spectrum" as Theme, name: "ZX Spectrum" },
  { id: "atari" as Theme, name: "Atari ST" },
  { id: "dos" as Theme, name: "DOS" },
  { id: "gameboy" as Theme, name: "Game Boy" },
  { id: "vectrex" as Theme, name: "Vectrex" },
]; 
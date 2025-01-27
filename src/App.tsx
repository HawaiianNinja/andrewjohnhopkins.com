import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Theme } from "./types";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Map from "./pages/Map";
import { initializeFlickerAnimations } from "./utils/flickerAnimation";

const HomeComponent = React.lazy(() => import("./pages/Home"));
const WeatherComponent = React.lazy(() => import("./pages/Weather"));
const MapComponent = React.lazy(() => import("./pages/Map"));

function App() {
  const [theme, setTheme] = useState<Theme>("cyberpunk");

  useEffect(() => {
    document.documentElement.className =
      theme === "cyberpunk" ? "theme-cyberpunk" : `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    initializeFlickerAnimations();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout theme={theme} onThemeChange={setTheme} />}>
          <Route index element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <HomeComponent />
            </Suspense>
          } />
          <Route path="weather" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <WeatherComponent />
            </Suspense>
          } />
          <Route path="map" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <MapComponent />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Theme } from "./types";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Map from "./pages/Map";

function App() {
  const [theme, setTheme] = useState<Theme>("cyberpunk");

  useEffect(() => {
    document.documentElement.className =
      theme === "cyberpunk" ? "theme-cyberpunk" : `theme-${theme}`;
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout theme={theme} onThemeChange={setTheme} />}>
          <Route index element={<Home />} />
          <Route path="weather" element={<Weather />} />
          <Route path="map" element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

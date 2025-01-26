import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Theme } from "./types";
import Layout from "./components/Layout";

const Home = React.lazy(() => import("./pages/Home"));
const Weather = React.lazy(() => import("./pages/Weather"));
const Map = React.lazy(() => import("./pages/Map"));

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
          <Route index element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Home />
            </Suspense>
          } />
          <Route path="weather" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Weather />
            </Suspense>
          } />
          <Route path="map" element={
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
              <Map />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

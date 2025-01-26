import React from 'react';
import { Link } from 'react-router-dom';
import { ThermometerSun, Map } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="flex-grow flex items-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <Link
            to="/weather"
            className="group relative p-8 border-2 border-primary rounded-lg 
                     [box-shadow:_0_0_10px_var(--primary),_inset_0_0_10px_var(--primary)]
                     hover:border-secondary hover:[box-shadow:_0_0_15px_var(--secondary),_inset_0_0_15px_var(--secondary)]
                     transition-all duration-300"
          >
            <div className="flex flex-col items-center space-y-4">
              <ThermometerSun size={48} className="retro-text-pink group-hover:retro-text-cyan transition-colors" />
              <h2 className="text-2xl font-bold tracking-[0.2em] retro-text-pink group-hover:retro-text-cyan transition-colors whitespace-nowrap">
                WEATHER STATION
              </h2>
              <p className="text-center opacity-80 group-hover:retro-text-cyan transition-colors">
                Real-time weather data and historical trends
              </p>
            </div>
          </Link>

          <Link
            to="/map"
            className="group relative p-8 border-2 border-primary rounded-lg 
                     [box-shadow:_0_0_10px_var(--primary),_inset_0_0_10px_var(--primary)]
                     hover:border-secondary hover:[box-shadow:_0_0_15px_var(--secondary),_inset_0_0_15px_var(--secondary)]
                     transition-all duration-300"
          >
            <div className="flex flex-col items-center space-y-4">
              <Map size={48} className="retro-text-pink group-hover:retro-text-cyan transition-colors" />
              <h2 className="text-2xl font-bold tracking-[0.2em] retro-text-pink group-hover:retro-text-cyan transition-colors whitespace-nowrap">
                NETWORK MAP
              </h2>
              <p className="text-center opacity-80 group-hover:retro-text-cyan transition-colors">
                Real-time network latency map
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full text-center mt-8">
        <p className="retro-text-pink animate-pulse-slow tracking-[0.2em]">
          SYSTEM ONLINE
        </p>
      </div>
    </div>
  );
};

export default Home; 
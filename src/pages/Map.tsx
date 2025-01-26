import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  ZoomableGroup
} from 'react-simple-maps';
import worldMapData from '../data/worldMap.json';

// Airport data adjusted to match simplified map boundaries
const airports = [
  { name: 'PDX', coordinates: [76, 165] as [number, number] },
  { name: 'SFO', coordinates: [74, 190] as [number, number] },
  { name: 'IAD', coordinates: [190, 185] as [number, number] },
  { name: 'CMH', coordinates: [160, 180] as [number, number] },
  { name: 'DUB', coordinates: [380, 130] as [number, number] },
  { name: 'LHR', coordinates: [400, 135] as [number, number] },

];

// Example flight paths
const flightPaths: [number, number][][] = [
  [[-100, 40], [15, 45]],    // JFK to LHR
  [[15, 45], [120, 35]],     // LHR to NRT
  [[120, 35], [135, -25]],   // NRT to SYD
  [[75, 25], [-100, 40]]     // DXB to JFK
];

const Map: React.FC = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  return (
    <div className="min-h-screen bg-background">
      <div className="h-screen w-full relative">
        {/* Grid Background */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(var(--primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--primary) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.1,
            pointerEvents: 'none',
          }}
        />
        
        <ComposableMap
          projection="geoMercator"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates as [number, number]}
            onMoveEnd={({ coordinates, zoom }) => setPosition({ coordinates, zoom })}
          >
            <Geographies geography={worldMapData}>
              {({ geographies }) => (
                <g
                  style={{
                    filter: `
                      drop-shadow(0 0 2px color-mix(in srgb, var(--neon-primary) 70%, transparent))
                      drop-shadow(0 0 4px color-mix(in srgb, var(--neon-primary) 50%, transparent))
                      drop-shadow(0 0 6px color-mix(in srgb, var(--neon-primary) 30%, transparent))
                    `,
                    animation: 'flicker 4s linear infinite'
                  }}
                >
                  {geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="var(--screen)"
                      stroke="var(--neon-primary)"
                      strokeWidth={1}
                    />
                  ))}
                </g>
              )}
            </Geographies>

            {/* Flight paths with neon glow effect */}
            {flightPaths.map((path, index) => (
              <Line
                key={index}
                from={path[0]}
                to={path[1]}
                stroke="var(--accent)"
                strokeWidth={2}
                style={{
                  filter: 'drop-shadow(0 0 4px var(--accent))',
                }}
              />
            ))}

            {/* Airports */}
            {airports.map((airport, index) => (
              <g key={index}>
                <circle
                  cx={airport.coordinates[0]}
                  cy={airport.coordinates[1]}
                  r={3}
                  fill="var(--neon-text)"
                  style={{
                    filter: `
                      drop-shadow(0 0 5px color-mix(in srgb, var(--neon-text) 70%, transparent))
                      drop-shadow(0 0 10px color-mix(in srgb, var(--neon-text) 50%, transparent))
                      drop-shadow(0 0 15px color-mix(in srgb, var(--neon-text) 30%, transparent))
                    `,
                    animation: 'flicker 4s linear infinite'
                  }}
                />
                <text
                  x={airport.coordinates[0]}
                  y={airport.coordinates[1] - 10}
                  textAnchor="middle"
                  fill="var(--neon-text)"
                  style={{
                    fontSize: '12px',
                    filter: `
                      drop-shadow(0 0 5px color-mix(in srgb, var(--neon-text) 70%, transparent))
                      drop-shadow(0 0 10px color-mix(in srgb, var(--neon-text) 50%, transparent))
                      drop-shadow(0 0 15px color-mix(in srgb, var(--neon-text) 30%, transparent))
                    `,
                    animation: 'flicker 4s linear infinite'
                  }}
                >
                  {airport.name}
                </text>
              </g>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default Map; 
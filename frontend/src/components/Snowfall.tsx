"use client";

import { useState, useEffect } from "react";

interface Flake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Flake[]>([]);

  useEffect(() => {
    setSnowflakes(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 2,
        duration: Math.random() * 18 + 14,
        delay: Math.random() * 20,
        opacity: Math.random() * 0.15 + 0.05,
      }))
    );
  }, []);

  if (snowflakes.length === 0) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          style={{
            position: "fixed",
            top: "-10px",
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            background: "white",
            borderRadius: "50%",
            opacity: flake.opacity,
            pointerEvents: "none",
            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

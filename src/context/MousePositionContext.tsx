"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export const MousePositionContext = createContext<{
  x: number;
  y: number;
} | null>(null);

export const MousePositionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <MousePositionContext.Provider value={mousePosition}>
      {children}
    </MousePositionContext.Provider>
  );
};

export const useMousePosition = () => useContext(MousePositionContext);

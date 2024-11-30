"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

const BreakpointContext = createContext<Breakpoint>("desktop");

export const BreakpointProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;

      if (width <= 540) {
        setBreakpoint("mobile");
      } else if (width <= 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);

    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, []);

  return (
    <BreakpointContext.Provider value={breakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpoint = () => useContext(BreakpointContext);

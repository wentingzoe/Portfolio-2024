import { useState, useEffect } from "react";

export const useCurrentTime = (
  locale: string = "en-US",
  options?: Intl.DateTimeFormatOptions
) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        ...options,
      });
      setCurrentTime(formattedTime);
    };

    // Update time initially
    updateTime();

    // Set interval to update time every second
    const intervalId = setInterval(updateTime, 1000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [locale, options]);

  return currentTime;
};

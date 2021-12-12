import { useCallback, useEffect, useState } from "react";
import { Percents } from "../../types/Percents";

export interface UseScrollProgressReturnType {
  progress: Percents;
}

export const useScrollProgress = (): UseScrollProgressReturnType => {
  const [progress, setProgress] = useState(0 as Percents);

  const handleScroll = useCallback(() => {
    const height = document.body.clientHeight - window.screen.height;
    const position = global.scrollY;
    const fraction = position / height;
    const progress = Math.floor(fraction * 100) as Percents;

    setProgress(progress);
  }, []);

  useEffect(() => {
    global.addEventListener("scroll", handleScroll);

    return () => {
      global.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    progress,
  };
};

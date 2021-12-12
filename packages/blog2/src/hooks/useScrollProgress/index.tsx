import { RefObject, useCallback, useEffect, useState } from "react";
import { Percents } from "../../types/Percents";

interface UseScrollProgressPropsType {
  scrollableRef: RefObject<HTMLElement>;
}

export interface UseScrollProgressReturnType {
  progress: Percents;
}

export const useScrollProgress = ({
  scrollableRef,
}: UseScrollProgressPropsType): UseScrollProgressReturnType => {
  const [progress, setProgress] = useState(0 as Percents);

  const handleScroll = useCallback(() => {
    const height = scrollableRef.current?.scrollHeight ?? 0;
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

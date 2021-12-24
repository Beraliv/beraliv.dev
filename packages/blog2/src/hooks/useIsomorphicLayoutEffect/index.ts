import is from "@sindresorhus/is";
import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect = is.undefined(window)
  ? useEffect
  : useLayoutEffect;

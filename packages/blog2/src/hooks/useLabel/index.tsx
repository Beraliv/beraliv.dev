import { useState } from "react";
import { getLocationSearchParameters } from "../../functions/getLocationSearchParameters";
import { LabelType } from "../../types/LabelType";
import { validateLabel } from "../../validators/validateLabel";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

type LabelReturnType =
  | {
      state: "loading";
    }
  | {
      state: "loaded";
      value: LabelType | undefined;
    };

export const useLabel = () => {
  const [state, setState] = useState<LabelReturnType>({ state: "loading" });

  useIsomorphicLayoutEffect(() => {
    const { label } = getLocationSearchParameters(location.search);
    if (!label) {
      setState({ state: "loaded", value: undefined });
      return;
    }

    try {
      const knownLabel = validateLabel(label);
      setState({ state: "loaded", value: knownLabel });
    } catch (error) {
      setState({ state: "loaded", value: undefined });
    }
  }, []);

  return state;
};

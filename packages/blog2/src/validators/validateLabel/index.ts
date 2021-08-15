import { KNOWN_LABELS } from "../../constants/KNOWN_LABELS";
import { LabelType } from "../../types/LabelType";

export const validateLabel = (label: string): LabelType => {
  if (!KNOWN_LABELS.includes(label as LabelType)) {
    throw new Error(`Cannot use label ${label}`);
  }

  return label as LabelType;
};

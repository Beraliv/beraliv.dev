import { TColor } from "../types/TColor";
import { TIconType } from "../types/TIconType";

export interface IHabit {
  title: string;
  completed: boolean;
  color: TColor;
  icon: TIconType;
}

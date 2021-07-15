import { Flatten } from "./Flatten";

export type PickRequired<T, K extends keyof T = keyof T> = Flatten<
  Required<Pick<T, K>> & Omit<T, K>
>;

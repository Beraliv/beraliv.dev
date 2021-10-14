import { Milliseconds } from "../../../types/Milliseconds";

export const toUtcString = (utcTimestamp: Milliseconds): string =>
  new Date(utcTimestamp).toUTCString();

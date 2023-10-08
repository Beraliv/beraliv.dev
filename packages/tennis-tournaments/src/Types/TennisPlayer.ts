import { type Person } from "./Person";

interface TennisPlayer extends Person {
  id: number;
  imageUrl: string;
  seed: number;
}

export { type TennisPlayer };

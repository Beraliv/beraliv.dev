import { type Person } from "./Person";

interface TennisPlayer extends Person {
  country: string;
  imageUrl: string;
  ranking: number;
}

export { type TennisPlayer };

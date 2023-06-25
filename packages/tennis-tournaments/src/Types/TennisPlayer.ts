import { type Person } from "./Person";

interface TennisPlayer extends Person {
  country: string;
  id: number;
  imageUrl: string;
  ranking: number;
}

export { type TennisPlayer };

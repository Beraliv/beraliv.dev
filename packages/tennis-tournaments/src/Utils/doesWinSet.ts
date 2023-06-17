import { TennisSet } from "../Types/TennisSet";

const doesWinSet = ([who, whom]: TennisSet) => who.games > whom.games;

export { doesWinSet };

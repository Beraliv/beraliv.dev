import { PlayerCentricScore } from "../Types/PlayerCentricScore";

const switchPlayerCentricScore = ({ away, home, type }: PlayerCentricScore) =>
  ({ away: home, home: away, type } as PlayerCentricScore);

export { switchPlayerCentricScore };

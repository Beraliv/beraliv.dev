import { type Component } from "solid-js";

import styles from "./MatchCard.module.css";
import { TennisPlayer } from "./Types/TennisPlayer";
import { TennisSet } from "./Types/TennisSet";
import { PlayerMatchResult } from "./PlayerMatchResult";
import { MatchStatus } from "./Types/MatchStatus";

interface MatchCardProps {
  awayPlayer: TennisPlayer;
  homePlayer: TennisPlayer;
  sets: TennisSet[];
  status: MatchStatus;
}

const MatchCard: Component<MatchCardProps> = ({
  awayPlayer,
  homePlayer,
  sets,
  status,
}) => {
  const homeCentricSets = sets;
  const awayCentricSets: TennisSet[] = sets.map(([opponentScore, score]) => [
    score,
    opponentScore,
  ]);

  const isHomeWinner = status.type === "FINISHED" && status.winner === "home";
  const isAwayWinner = status.type === "FINISHED" && status.winner === "away";

  return (
    <div class={styles.MatchCard}>
      <PlayerMatchResult
        className={styles.Home}
        isWinner={isHomeWinner}
        player={homePlayer}
        playerCentricSets={homeCentricSets}
      />
      <PlayerMatchResult
        className={styles.Away}
        isWinner={isAwayWinner}
        player={awayPlayer}
        playerCentricSets={awayCentricSets}
      />
    </div>
  );
};

export { MatchCard, type MatchCardProps };

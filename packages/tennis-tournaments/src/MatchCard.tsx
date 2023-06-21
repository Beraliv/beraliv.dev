import { type Component } from "solid-js";

import styles from "./MatchCard.module.css";
import { TennisPlayer } from "./Types/TennisPlayer";
import { TennisSet } from "./Types/TennisSet";
import { PlayerMatchResult } from "./PlayerMatchResult";

interface MatchCardProps {
  awayPlayer: TennisPlayer;
  homePlayer: TennisPlayer;
  sets: TennisSet[];
  winner: "away" | "home";
}

const MatchCard: Component<MatchCardProps> = ({
  awayPlayer,
  homePlayer,
  sets,
  winner,
}) => {
  const homeCentricSets = sets;
  const awayCentricSets: TennisSet[] = sets.map(([opponentScore, score]) => [
    score,
    opponentScore,
  ]);

  return (
    <div class={styles.MatchCard}>
      <PlayerMatchResult
        className={styles.Home}
        doesWinMatch={winner === "home"}
        player={homePlayer}
        playerCentricSets={homeCentricSets}
      />
      <PlayerMatchResult
        className={styles.Away}
        doesWinMatch={winner === "away"}
        player={awayPlayer}
        playerCentricSets={awayCentricSets}
      />
    </div>
  );
};

export { MatchCard, type MatchCardProps };

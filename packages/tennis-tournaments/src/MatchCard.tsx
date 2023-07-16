import {
  createResource,
  type Component,
  createSignal,
  createEffect,
} from "solid-js";

import styles from "./MatchCard.module.css";
import { TennisPlayer } from "./Types/TennisPlayer";
import { TennisSet } from "./Types/TennisSet";
import { PlayerMatchResult } from "./PlayerMatchResult";
import { MatchStatus } from "./Types/MatchStatus";
import { fetchEvent } from "./Utils/fetchEvent";
import { createTennisSetsFromScores } from "./Utils/createTennisSetsFromScores";
import { classNames } from "./Utils/classNames";

interface MatchCardProps {
  awayPlayer: TennisPlayer;
  eventId: string | undefined;
  homePlayer: TennisPlayer;
  sets: TennisSet[];
  status: MatchStatus;
}

const MatchCard: Component<MatchCardProps> = ({
  awayPlayer,
  eventId,
  homePlayer,
  sets,
  status,
}) => {
  const [extendedEventEnabled, setExtendedEventEnabled] = createSignal(false);
  const triggerLoadingExtendedScore = () => {
    setExtendedEventEnabled(true);
  };

  const [eventApiModel] = createResource(
    () => ({ eventId, enabled: extendedEventEnabled() }),
    fetchEvent
  );

  const [homeCentricSets, setHomeCentricSets] = createSignal<TennisSet[]>(sets);
  const [awayCentricSets, setAwayCentricSets] = createSignal<TennisSet[]>(
    sets.map(([opponentScore, score]) => [score, opponentScore])
  );

  createEffect(() => {
    const event = eventApiModel();

    if (!event) {
      return;
    }

    const updatedSets = createTennisSetsFromScores(
      event.homeScore,
      event.awayScore
    );

    setHomeCentricSets(updatedSets);
    setAwayCentricSets(
      updatedSets.map(([opponentScore, score]) => [
        score,
        opponentScore,
      ]) as TennisSet[]
    );
  });

  const isHomeWinner = status.type === "FINISHED" && status.winner === "home";
  const isAwayWinner = status.type === "FINISHED" && status.winner === "away";

  return (
    <div
      class={classNames(styles.MatchCard, {
        [styles.MatchCardWithShortScore]: !extendedEventEnabled(),
      })}
      onClick={triggerLoadingExtendedScore}
      onTouchEnd={triggerLoadingExtendedScore}
    >
      <div class={styles.ExtendedScore}>LOAD FULL SCORE</div>
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

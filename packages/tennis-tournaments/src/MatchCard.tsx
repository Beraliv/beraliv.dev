import {
  createResource,
  type Component,
  createSignal,
  createEffect,
  Signal,
  onMount,
  onCleanup,
} from "solid-js";

import styles from "./MatchCard.module.css";
import { TennisPlayer } from "./Types/TennisPlayer";
import { TennisSet } from "./Types/TennisSet";
import { PlayerMatchResult } from "./PlayerMatchResult";
import { MatchStatus } from "./Types/MatchStatus";
import { fetchEvent } from "./Utils/fetchEvent";
import { createTennisSetsFromScores } from "./Utils/createTennisSetsFromScores";
import { classNames } from "./Utils/classNames";
import { CourtType } from "./Types/CourtType";
import { createOneTouchTapController } from "./Utils/createOneTouchTapController";

interface MatchCardProps {
  awayPlayer: TennisPlayer;
  courtType: CourtType;
  eventId: string | undefined;
  homePlayer: TennisPlayer;
  selectedTennisPlayerIdSignal: Signal<TennisPlayer["id"] | undefined>;
  sets: TennisSet[];
  status: MatchStatus;
}

const MatchCard: Component<MatchCardProps> = ({
  awayPlayer,
  courtType,
  eventId,
  homePlayer,
  selectedTennisPlayerIdSignal,
  sets,
  status,
}) => {
  const [extendedEventEnabled, setExtendedEventEnabled] = createSignal(false);
  const triggerLoadingExtendedScore = () => {
    setExtendedEventEnabled(true);
  };

  const { handleTouchStartEvent, handleTouchEndEvent } =
    createOneTouchTapController(triggerLoadingExtendedScore);

  let matchCardRef: HTMLDivElement;

  onMount(() => {
    matchCardRef.addEventListener("click", triggerLoadingExtendedScore);
    matchCardRef.addEventListener("touchstart", handleTouchStartEvent, false);
    matchCardRef.addEventListener("touchend", handleTouchEndEvent, false);
  });

  onCleanup(() => {
    matchCardRef.removeEventListener("click", triggerLoadingExtendedScore);
    matchCardRef.removeEventListener(
      "touchstart",
      handleTouchStartEvent,
      false
    );
    matchCardRef.removeEventListener("touchend", handleTouchEndEvent, false);
  });

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
  const isInProgress = status.type === "IN_PROGRESS";

  const [selectedTennisPlayerId, selectTennisPlayerId] =
    selectedTennisPlayerIdSignal;

  return (
    <div
      class={classNames(styles.MatchCard, {
        [styles.MatchCardWithShortScore]: !extendedEventEnabled(),
      })}
      ref={matchCardRef!}
    >
      <div class={styles.ExtendedScore}>LOAD FULL SCORE</div>
      <PlayerMatchResult
        className={styles.Home}
        courtType={courtType}
        isInProgress={isInProgress}
        isWinner={isHomeWinner}
        onSelect={selectTennisPlayerId}
        player={homePlayer}
        playerCentricSets={homeCentricSets}
        selectedPlayerId={selectedTennisPlayerId}
      />
      <div class={styles.Border} />
      <PlayerMatchResult
        courtType={courtType}
        isWinner={isAwayWinner}
        onSelect={selectTennisPlayerId}
        player={awayPlayer}
        playerCentricSets={awayCentricSets}
        selectedPlayerId={selectedTennisPlayerId}
      />
    </div>
  );
};

export { MatchCard, type MatchCardProps };

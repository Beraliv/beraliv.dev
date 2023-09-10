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
import { PlayerCentricScore } from "./Types/PlayerCentricScore";
import { PlayerMatchResult } from "./PlayerMatchResult";
import { MatchStatus } from "./Types/MatchStatus";
import { fetchEvent } from "./Utils/fetchEvent";
import { createPlayerCentricScoreFromScores } from "./Utils/createPlayerCentricScoreFromScores";
import { classNames } from "./Utils/classNames";
import { CourtType } from "./Types/CourtType";
import { createOneTouchTapController } from "./Utils/createOneTouchTapController";
import { switchPlayerCentricScore } from "./Utils/switchPlayerCentricScore";

interface MatchCardProps {
  awayPlayer: TennisPlayer;
  courtType: CourtType;
  eventId: string | undefined;
  homePlayer: TennisPlayer;
  selectedTennisPlayerIdSignal: Signal<TennisPlayer["id"] | undefined>;
  scores: PlayerCentricScore[];
  status: MatchStatus;
}

const MatchCard: Component<MatchCardProps> = ({
  awayPlayer,
  courtType,
  eventId,
  homePlayer,
  selectedTennisPlayerIdSignal,
  scores,
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

  const [homeCentricScore, setHomeCentricScore] =
    createSignal<PlayerCentricScore[]>(scores);
  const [awayCentricScore, setAwayCentricScore] = createSignal<
    PlayerCentricScore[]
  >(scores.map(switchPlayerCentricScore));

  createEffect(() => {
    const event = eventApiModel();

    if (!event) {
      return;
    }

    const updatedScore = createPlayerCentricScoreFromScores(
      event.homeScore,
      event.awayScore,
      status
    );

    setHomeCentricScore(updatedScore);
    setAwayCentricScore(updatedScore.map(switchPlayerCentricScore));
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
        playerCentricScore={homeCentricScore}
        selectedPlayerId={selectedTennisPlayerId}
        serves={true}
      />
      <div class={styles.Line} />
      <PlayerMatchResult
        courtType={courtType}
        isInProgress={isInProgress}
        isWinner={isAwayWinner}
        onSelect={selectTennisPlayerId}
        player={awayPlayer}
        playerCentricScore={awayCentricScore}
        selectedPlayerId={selectedTennisPlayerId}
        serves={false}
      />
    </div>
  );
};

export { MatchCard, type MatchCardProps };

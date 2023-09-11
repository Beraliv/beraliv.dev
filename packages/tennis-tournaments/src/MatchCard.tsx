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
import { TennisSide } from "./Types/TennisSide";
import { createServeSide } from "./Utils/createServeSide";

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

  const [serveSide, setServeSide] = createSignal<TennisSide | undefined>(
    createServeSide(scores, { firstToServe: "home" })
  );

  createEffect(() => {
    const event = eventApiModel();

    if (!event) {
      return;
    }

    const updatedScores = createPlayerCentricScoreFromScores(
      event.homeScore,
      event.awayScore,
      status
    );

    const updatedServeSide = createServeSide(updatedScores, {
      firstToServe:
        event.firstToServe === 1
          ? "home"
          : event.firstToServe === 2
          ? "away"
          : undefined,
    });

    console.log("updatedServeSide", updatedServeSide);

    setHomeCentricScore(updatedScores);
    setAwayCentricScore(updatedScores.map(switchPlayerCentricScore));
    setServeSide(updatedServeSide);
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
        serves={() => serveSide() === "home"}
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
        serves={() => serveSide() === "away"}
      />
    </div>
  );
};

export { MatchCard, type MatchCardProps };

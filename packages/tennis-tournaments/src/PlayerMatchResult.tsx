import {
  For,
  type Component,
  Show,
  Accessor,
  Setter,
  onMount,
  onCleanup,
} from "solid-js";

import styles from "./PlayerMatchResult.module.css";

import TennisBall from "./Icons/TennisBall.svg";
import WinnerIcon from "./Icons/Winner.svg";
import { CourtType } from "./Types/CourtType";
import { TennisPlayer } from "./Types/TennisPlayer";
import { PlayerCentricScore } from "./Types/PlayerCentricScore";
import { classNames } from "./Utils/classNames";
import { createOneTouchTapController } from "./Utils/createOneTouchTapController";
import { createShortName } from "./Utils/createShortName";
import { doesWinSet } from "./Utils/doesWinSet";
import { getImagePlaceholder } from "./Utils/getImagePlaceholder";
import { hasTieBreak } from "./Utils/hasTieBreak";

interface PlayerMatchResultProps {
  className?: string;
  courtType: CourtType;
  isInProgress?: boolean;
  isWinner: boolean;
  onSelect: Setter<TennisPlayer["id"] | undefined>;
  player: TennisPlayer;
  playerCentricScore: Accessor<PlayerCentricScore[]>;
  selectedPlayerId: Accessor<TennisPlayer["id"] | undefined>;
}

const PlayerMatchResult: Component<PlayerMatchResultProps> = ({
  className,
  courtType,
  isInProgress = false,
  isWinner,
  onSelect,
  player,
  playerCentricScore,
  selectedPlayerId,
}) => {
  const shortName = createShortName(player);

  const isCurrentPlayerSelected = () => selectedPlayerId() === player.id;
  const togglePlayerId = () => {
    if (isCurrentPlayerSelected()) {
      onSelect(undefined);
    } else {
      onSelect(player.id);
    }
  };

  let playerMatchResultRef: HTMLDivElement;

  const { handleTouchStartEvent, handleTouchEndEvent } =
    createOneTouchTapController(togglePlayerId);

  onMount(() => {
    playerMatchResultRef.addEventListener("click", togglePlayerId);
    playerMatchResultRef.addEventListener(
      "touchstart",
      handleTouchStartEvent,
      false
    );
    playerMatchResultRef.addEventListener(
      "touchend",
      handleTouchEndEvent,
      false
    );
  });

  onCleanup(() => {
    playerMatchResultRef.removeEventListener("click", togglePlayerId);
    playerMatchResultRef.removeEventListener(
      "touchstart",
      handleTouchStartEvent,
      false
    );
    playerMatchResultRef.removeEventListener(
      "touchend",
      handleTouchEndEvent,
      false
    );
  });

  const handleError = function (this: HTMLImageElement) {
    this.onerror = null;
    this.src = getImagePlaceholder();
  };

  return (
    <div
      class={classNames(styles.PlayerMatchResult, {
        [className || ""]: Boolean(className),
        [styles.grass]: courtType === "grass",
        [styles.clay]: courtType === "clay",
        [styles.hard]: courtType === "hard",
        [styles.Selected]: isCurrentPlayerSelected(),
      })}
      ref={playerMatchResultRef!}
    >
      <div class={styles.Player}>
        <img
          class={styles.AvatarImage}
          src={player.imageUrl}
          onError={handleError}
        />
        <div
          class={classNames(styles.Name, {
            [styles.WinHighlighter]: isWinner,
          })}
        >
          {shortName}
        </div>
        <Show when={player.seed > 0 && player.seed}>
          {(seed) => <div class={styles.Seed}>{`(${seed()})`}</div>}
        </Show>
      </div>
      <div class={styles.Score}>
        <Show when={isWinner}>
          <div class={styles.Winner}>
            <WinnerIcon />
          </div>
        </Show>
        <Show when={isInProgress}>
          <div class={styles.TennisBall}>
            <TennisBall />
          </div>
        </Show>
        <div class={styles.PlayerCentricScores}>
          <For each={playerCentricScore()}>
            {(score) => (
              <div
                class={classNames(styles.PlayerCentricScore, {
                  [styles.WinHighlighter]: doesWinSet(score),
                })}
              >
                {score.home.points}
                <Show when={hasTieBreak(score) && score}>
                  {(scoreWithTieBreak) => (
                    <sup class={styles.TieBreakScore}>
                      {scoreWithTieBreak().home.tieBreak}
                    </sup>
                  )}
                </Show>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export { PlayerMatchResult, type PlayerMatchResultProps };

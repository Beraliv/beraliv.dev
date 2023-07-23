import { For, type Component, Show, Accessor, Signal, Setter } from "solid-js";

import styles from "./PlayerMatchResult.module.css";
import { TennisPlayer } from "./Types/TennisPlayer";
import { createShortName } from "./Utils/createShortName";
import WinnerIcon from "./Icons/Winner.svg";
import TennisBall from "./Icons/TennisBall.svg";
import { TennisSet } from "./Types/TennisSet";
import { hasTieBreak } from "./Utils/hasTieBreak";
import { doesWinSet } from "./Utils/doesWinSet";
import { classNames } from "./Utils/classNames";
import { CourtType } from "./Types/CourtType";

interface PlayerMatchResultProps {
  className?: string;
  courtType: CourtType;
  isInProgress?: boolean;
  isWinner: boolean;
  onSelect: Setter<TennisPlayer["id"] | undefined>;
  player: TennisPlayer;
  playerCentricSets: Accessor<TennisSet[]>;
  selectedPlayerId: Accessor<TennisPlayer["id"] | undefined>;
}

const PlayerMatchResult: Component<PlayerMatchResultProps> = ({
  className,
  courtType,
  isInProgress = false,
  isWinner,
  onSelect,
  player,
  playerCentricSets,
  selectedPlayerId,
}) => {
  const shortName = createShortName(player);
  const isCurrentPlayerSelected = () => selectedPlayerId() === player.id;
  const handlePlayerIdUpdate = () => {
    if (isCurrentPlayerSelected()) {
      onSelect(undefined);
    } else {
      onSelect(player.id);
    }
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
      onClick={handlePlayerIdUpdate}
      onTouchStart={handlePlayerIdUpdate}
    >
      <div class={styles.Player}>
        <div>
          <img class={styles.AvatarImage} src={player.imageUrl} />
        </div>
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
        <div class={styles.SetScores}>
          <For each={playerCentricSets()}>
            {([score, opponentScore]) => (
              <div
                class={classNames(styles.SetScore, {
                  [styles.WinHighlighter]: doesWinSet([score, opponentScore]),
                })}
              >
                {score.games}
                <Show when={hasTieBreak(score)}>
                  {
                    <sup class={styles.TieBreakScore}>
                      {hasTieBreak(score) && score.tieBreak}
                    </sup>
                  }
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

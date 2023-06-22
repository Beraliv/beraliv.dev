import { For, type Component, Show } from "solid-js";

import styles from "./PlayerMatchResult.module.css";
import { TennisPlayer } from "./Types/TennisPlayer";
import { createShortName } from "./Utils/createShortName";
import WinnerIcon from "./Icons/Winner.svg";
import { TennisSet } from "./Types/TennisSet";
import { hasTieBreak } from "./Utils/hasTieBreak";
import { doesWinSet } from "./Utils/doesWinSet";
import { classNames } from "./Utils/classNames";

interface PlayerMatchResultProps {
  player: TennisPlayer;
  playerCentricSets: TennisSet[];
  doesWinMatch: boolean;
  className?: string;
}

const PlayerMatchResult: Component<PlayerMatchResultProps> = ({
  player,
  playerCentricSets,
  doesWinMatch,
  className,
}) => {
  const shortName = createShortName(player);

  return (
    <div
      class={classNames(styles.PlayerMatchResult, {
        [className || ""]: Boolean(className),
      })}
    >
      <div class={styles.Player}>
        <div>
          <img class={styles.AvatarImage} src={player.imageUrl} />
        </div>
        <div
          class={classNames({
            [styles.WinHighlighter]: doesWinMatch,
          })}
        >
          {shortName}
        </div>
        <div class={styles.Ranking}>{`(${player.ranking})`}</div>
      </div>
      <div class={styles.Score}>
        <Show when={doesWinMatch}>
          <div class={styles.Winner}>
            <WinnerIcon />
          </div>
        </Show>
        <div class={styles.SetScores}>
          <For each={playerCentricSets}>
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

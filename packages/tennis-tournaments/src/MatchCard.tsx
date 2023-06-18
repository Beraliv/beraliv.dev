import { For, type Component, Show } from "solid-js";

import styles from "./MatchCard.module.css";
import { TennisPlayer } from "./Types/TennisPlayer";
import { createShortName } from "./Utils/createShortName";
import winnerIcon from "./Icons/Winner.svg";
import { TennisSet } from "./Types/TennisSet";
import { hasTieBreak } from "./Utils/hasTieBreak";
import { doesWinSet } from "./Utils/doesWinSet";
import { classNames } from "./Utils/classNames";

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
  const homeShortName = createShortName(homePlayer);
  const awayShortName = createShortName(awayPlayer);

  const doesHomeWinMatch = winner === "home";
  const doesAwayWinMatch = winner === "away";

  return (
    <div class={styles.MatchCard}>
      <div class={styles.Home}>
        <div class={styles.Player}>
          <div>
            <img class={styles.AvatarImage} src={homePlayer.imageUrl} />
          </div>
          <div
            class={classNames({
              [styles.WinHighlighter]: doesHomeWinMatch,
            })}
          >
            {homeShortName}
          </div>
          <div class={styles.Ranking}>{`(${homePlayer.ranking})`}</div>
        </div>
        <div class={styles.Score}>
          <Show when={doesHomeWinMatch}>
            <div class={styles.Winner}>
              <img class={styles.WinnerImage} src={winnerIcon} />
            </div>
          </Show>
          <div class={styles.SetScores}>
            <For each={sets}>
              {([firstItem, secondItem]) => (
                <div
                  class={classNames(styles.SetScore, {
                    [styles.WinHighlighter]: doesWinSet([
                      firstItem,
                      secondItem,
                    ]),
                  })}
                >
                  {firstItem.games}
                  <Show when={hasTieBreak(firstItem)}>
                    {
                      <sup class={styles.TieBreakScore}>
                        {hasTieBreak(firstItem) && firstItem.tieBreak}
                      </sup>
                    }
                  </Show>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
      <div class={styles.Away}>
        <div class={styles.Player}>
          <div>
            <img class={styles.AvatarImage} src={awayPlayer.imageUrl} />
          </div>
          <div
            class={classNames({
              [styles.WinHighlighter]: doesAwayWinMatch,
            })}
          >
            {awayShortName}
          </div>
          <div class={styles.Ranking}>{`(${awayPlayer.ranking})`}</div>
        </div>
        <div class={styles.Score}>
          <Show when={doesAwayWinMatch}>
            <div class={styles.Winner}>
              <img class={styles.WinnerImage} src={winnerIcon} />
            </div>
          </Show>
          <div class={styles.SetScores}>
            <For each={sets}>
              {([firstItem, secondItem]) => (
                <div
                  class={classNames(styles.SetScore, {
                    [styles.WinHighlighter]: doesWinSet([
                      secondItem,
                      firstItem,
                    ]),
                  })}
                >
                  {secondItem.games}
                  <Show when={hasTieBreak(secondItem)}>
                    {
                      <sup class={styles.TieBreakScore}>
                        {hasTieBreak(secondItem) && secondItem.tieBreak}
                      </sup>
                    }
                  </Show>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MatchCard, type MatchCardProps };

import { For, type Component, Show } from "solid-js";

import styles from "./MatchCard.module.css";
import { TennisPlayer } from "./Types/TennisPlayer";
import { COUNTRY_MAPPING } from "./Constants/COUNTRY_MAPPING";
import { createShortName } from "./Utils/createShortName";
import winnerIcon from "./Icons/Winner.svg";
import { TennisSet } from "./Types/TennisSet";
import { hasTieBreak } from "./Utils/hasTieBreak";

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
  const homeCountryIcon = COUNTRY_MAPPING[homePlayer.country];
  const awayCountryIcon = COUNTRY_MAPPING[awayPlayer.country];

  const homeShortName = createShortName(homePlayer);
  const awayShortName = createShortName(awayPlayer);

  return (
    <div class={styles.MatchCard}>
      <div class={styles.Home}>
        <div class={styles.Player}>
          <div>
            <img class={styles.AvatarImage} src={homePlayer.imageUrl} />
          </div>
          <Show when={homeCountryIcon}>
            <div>
              <img class={styles.CountryFlagImage} src={homeCountryIcon} />
            </div>
          </Show>
          <div>{homeShortName}</div>
          <div class={styles.Ranking}>{`(${homePlayer.ranking})`}</div>
        </div>
        <div class={styles.Score}>
          <Show when={winner === "home"}>
            <div class={styles.Winner}>
              <img class={styles.WinnerImage} src={winnerIcon} />
            </div>
          </Show>
          <div class={styles.SetScores}>
            <For each={sets}>
              {([firstItem]) => (
                <div class={styles.SetScore}>
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
          <Show when={awayCountryIcon}>
            <div>
              <img class={styles.CountryFlagImage} src={awayCountryIcon} />
            </div>
          </Show>
          <div>{awayShortName}</div>
          <div class={styles.Ranking}>{`(${awayPlayer.ranking})`}</div>
        </div>
        <div class={styles.Score}>
          <Show when={winner === "away"}>
            <div class={styles.Winner}>
              <img class={styles.WinnerImage} src={winnerIcon} />
            </div>
          </Show>
          <div class={styles.SetScores}>
            <For each={sets}>
              {([, secondItem]) => (
                <div class={styles.SetScore}>
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

export { MatchCard };

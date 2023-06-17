import { For, type Component, Show } from "solid-js";

import styles from "./MatchCard.module.css";
import { TennisPlayer } from "./Types/TennisPlayer";
import { COUNTRY_MAPPING } from "./Constants/COUNTRY_MAPPING";

interface MatchCardProps {
  awayPlayer: TennisPlayer;
  homePlayer: TennisPlayer;
  sets: [number, number][];
  winner: "away" | "home";
}

const MatchCard: Component<MatchCardProps> = ({
  awayPlayer,
  homePlayer,
  sets,
  winner,
}) => {
  const homeCountryUrl = COUNTRY_MAPPING[homePlayer.country];
  const awayCountryUrl = COUNTRY_MAPPING[awayPlayer.country];

  return (
    <div class={styles.MatchCard}>
      <div class={styles.Home}>
        <div class={styles.Player}>
          <div class={styles.Avatar}>
            <img src={homePlayer.imageUrl} />
          </div>
          <Show when={homeCountryUrl}>
            <div class={styles.CountryFlag}>
              <img src={homeCountryUrl} />
            </div>
          </Show>
          <div class={styles.Name}>{homePlayer.name}</div>
          <div class={styles.Ranking}>{`(${homePlayer.ranking})`}</div>
        </div>
        <div class={styles.Score}>
          <Show when={winner === "home"}>
            <div class={styles.Victory}>{"✅"}</div>
          </Show>
          <For each={sets}>{([firstItem]) => <div>{firstItem}</div>}</For>
        </div>
      </div>
      <div class={styles.Away}>
        <div class={styles.Player}>
          <div class={styles.Avatar}>
            <img src={awayPlayer.imageUrl} />
          </div>
          <Show when={awayCountryUrl}>
            <div class={styles.CountryFlag}>
              <img src={awayCountryUrl} />
            </div>
          </Show>
          <div class={styles.Name}>{awayPlayer.name}</div>
          <div class={styles.Ranking}>{`(${awayPlayer.ranking})`}</div>
        </div>
        <div class={styles.Score}>
          <Show when={winner === "away"}>
            <div class={styles.Victory}>{"✅"}</div>
          </Show>
          <For each={sets}>{([, secondItem]) => <div>{secondItem}</div>}</For>
        </div>
      </div>
    </div>
  );
};

export { MatchCard };

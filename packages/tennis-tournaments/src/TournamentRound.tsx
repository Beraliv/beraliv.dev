import { type Component, For } from "solid-js";

import styles from "./TournamentRound.module.css";
import { MatchCard } from "./MatchCard";
import { classNames } from "./Utils/classNames";
import { type SimpleTournamentRound } from "./Utils/fetchTournamentTree";

interface TournamentRoundProps extends SimpleTournamentRound {
  index: number;
}

const TournamentRound: Component<TournamentRoundProps> = ({
  matches,
  order,
  index,
  title,
}) => {
  return (
    <div
      class={classNames(styles.TournamentRound, {
        [styles.Index0]: index === 0,
        [styles.Index1]: index === 1,
        [styles.Index2]: index === 2,
        [styles.Order0]: order === 0,
        [styles.Order1]: order === 1,
        [styles.Order2]: order === 2,
      })}
    >
      <h1>{title}</h1>
      <For each={matches}>
        {(match) => (
          <div class={styles.CardWrapper}>
            <MatchCard {...match} />
          </div>
        )}
      </For>
    </div>
  );
};

export { TournamentRound, type TournamentRoundProps };

import { type Component, For } from "solid-js";

import styles from "./TournamentRound.module.css";
import { MatchCard, MatchCardProps } from "./MatchCard";
import { classNames } from "./Utils/classNames";

interface TournamentRoundProps {
  matches: MatchCardProps[];
  order: number;
  title: string;
}

const TournamentRound: Component<TournamentRoundProps> = ({
  matches,
  order,
  title,
}) => {
  return (
    <div
      class={classNames(styles.TournamentRound, {
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

export { TournamentRound };

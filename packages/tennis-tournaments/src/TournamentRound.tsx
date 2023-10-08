import { type Component, For, Signal } from "solid-js";

import styles from "./TournamentRound.module.css";
import { MatchCard } from "./MatchCard";
import { classNames } from "./Utils/classNames";
import { type SimpleTournamentRound } from "./Utils/fetchTournamentTree";
import { CourtType } from "./Types/CourtType";
import { TennisPlayer } from "./Types/TennisPlayer";

interface TournamentRoundProps extends SimpleTournamentRound {
  courtType: CourtType;
  index: number;
  selectedTennisPlayerIdSignal: Signal<TennisPlayer["id"] | undefined>;
}

const TournamentRound: Component<TournamentRoundProps> = ({
  courtType,
  index,
  matches,
  order,
  selectedTennisPlayerIdSignal,
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
            <MatchCard
              {...match}
              courtType={courtType}
              selectedTennisPlayerIdSignal={selectedTennisPlayerIdSignal}
            />
          </div>
        )}
      </For>
    </div>
  );
};

export { TournamentRound, type TournamentRoundProps };

import type { Component } from "solid-js";

import styles from "./App.module.css";
import eventMock from "./event-mock.json";
import { MatchCard } from "./MatchCard";
import { createTennisPlayerFromTeam } from "./Utils/createTennisPlayerFromTeam";
import { createSetsFromScores } from "./Utils/createSetsFromScores";

const App: Component = () => {
  const awayPlayer = createTennisPlayerFromTeam(eventMock.event.awayTeam);
  const homePlayer = createTennisPlayerFromTeam(eventMock.event.homeTeam);

  const sets = createSetsFromScores(
    eventMock.event.homeScore,
    eventMock.event.awayScore
  );

  const winner = eventMock.event.winnerCode === 1 ? "home" : "away";

  return (
    <div class={styles.App}>
      <MatchCard
        awayPlayer={awayPlayer}
        homePlayer={homePlayer}
        sets={sets}
        winner={winner}
      />
    </div>
  );
};

export { App };

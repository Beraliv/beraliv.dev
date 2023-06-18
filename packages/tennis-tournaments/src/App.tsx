import { For, type Component } from "solid-js";

import styles from "./App.module.css";
import finalMock from "./league-events-by-final.json";
import semifinalMock from "./league-events-by-semifinal.json";
import quarterfinalMock from "./league-events-by-quarterfinal.json";
import { MatchCard, MatchCardProps } from "./MatchCard";
import { createTennisPlayerFromTeam } from "./Utils/createTennisPlayerFromTeam";
import { createTennisSetsFromScores } from "./Utils/createTennisSetsFromScores";
import { Api } from "./Types/Api";

const extractMatchCardProps = (data: Api): MatchCardProps[] =>
  data.events.map((event) => ({
    awayPlayer: createTennisPlayerFromTeam(event.awayTeam),
    homePlayer: createTennisPlayerFromTeam(event.homeTeam),
    sets: createTennisSetsFromScores(event.homeScore, event.awayScore),
    winner: event.winnerCode === 1 ? "home" : "away",
  }));

const finalMatches = extractMatchCardProps(finalMock);
const semifinalMatches = extractMatchCardProps(semifinalMock);
const quarterfinalMatches = extractMatchCardProps(quarterfinalMock);

const data = [
  ["Final", finalMatches],
  ["Semifinal", semifinalMatches],
  ["Quarterfinal", quarterfinalMatches],
] satisfies [string, MatchCardProps[]][];

const App: Component = () => {
  return (
    <div class={styles.App}>
      <For each={data}>
        {([title, matches]) => (
          <div>
            <h1>{title}</h1>
            <For each={matches}>
              {(match) => (
                <MatchCard
                  awayPlayer={match.awayPlayer}
                  homePlayer={match.homePlayer}
                  sets={match.sets}
                  winner={match.winner}
                />
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
};

export { App };

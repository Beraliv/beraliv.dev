import { Component, For } from "solid-js";
import styles from "./TournamentsPage.module.css";
import { TournamentCard, TournamentCardProps } from "./TournamentCard";

const CARDS_INFORMATION: TournamentCardProps[] = [
  {
    courtType: "hard",
    // Jan 16 - Jan 29, 2023
    tournamentPeriod: {
      start: new Date(2023, 0, 16),
      end: new Date(2023, 0, 29),
    },
    tournamentId: 2363,
    tournamentName: "Australian Open",
    place: "Melbourne, Australia",
  },
  {
    courtType: "clay",
    // May 20 - June 9, 2023
    tournamentPeriod: {
      start: new Date(2023, 4, 20),
      end: new Date(2023, 5, 9),
    },
    tournamentId: 2480,
    tournamentName: "Roland Garros",
    place: "Paris, France",
  },
  {
    courtType: "grass",
    // Jul 3 - Jul 16, 2023
    tournamentPeriod: {
      start: new Date(2023, 6, 3),
      end: new Date(2023, 6, 16),
    },
    tournamentId: 2361,
    tournamentName: "Wimbledon",
    place: "London, UK",
  },
  {
    courtType: "hard",
    // Aug 28 - Sep 10, 2023
    tournamentPeriod: {
      start: new Date(2023, 7, 28),
      end: new Date(2023, 8, 10),
    },
    tournamentId: 2449,
    tournamentName: "US Open",
    place: "New York City, USA",
  },
];

const TournamentsPage: Component = () => {
  return (
    <div class={styles.TournamentsPage}>
      <h1>Tournaments</h1>
      <For each={CARDS_INFORMATION}>
        {(cardProps) => <TournamentCard {...cardProps} />}
      </For>
    </div>
  );
};

export { TournamentsPage };

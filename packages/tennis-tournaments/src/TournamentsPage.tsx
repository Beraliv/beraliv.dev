import { Component, For } from "solid-js";
import styles from "./TournamentsPage.module.css";
import { TournamentCard, TournamentCardProps } from "./TournamentCard";

const GRAND_SLAMS_INFORMATION: TournamentCardProps[] = [
  {
    courtType: "hard",
    // Jan 16 - Jan 29, 2023
    tournamentPeriod: {
      start: new Date(2023, 0, 16),
      end: new Date(2023, 0, 29),
    },
    tournamentIds: {
      men: 2363,
      women: -1,
    },
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
    tournamentIds: {
      men: 2480,
      women: -1,
    },
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
    tournamentIds: {
      men: 2361,
      women: -1,
    },
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
    tournamentIds: {
      men: 2449,
      women: 2601,
    },
    tournamentName: "US Open",
    place: "New York City, USA",
  },
];

const ATP_1000_INFORMATION: TournamentCardProps[] = [
  {
    courtType: "hard",
    // Mar 08 - Mar 19, 2023
    tournamentPeriod: {
      start: new Date(2023, 2, 8),
      end: new Date(2023, 2, 19),
    },
    tournamentIds: {
      men: 2487,
      women: -1,
    },
    tournamentName: "Indian Wells Masters",
    place: "Indian Wells, CA, USA",
  },
  {
    courtType: "hard",
    // Mar 22 - Apr 02, 2023
    tournamentPeriod: {
      start: new Date(2023, 2, 22),
      end: new Date(2023, 3, 2),
    },
    tournamentIds: {
      men: 2430,
      women: -1,
    },
    tournamentName: "Miami Open",
    place: "Miami, FL, USA",
  },
  {
    courtType: "clay",
    // Apr 09 - Apr 16, 2023
    tournamentPeriod: {
      start: new Date(2023, 3, 9),
      end: new Date(2023, 3, 16),
    },
    tournamentIds: {
      men: 2391,
      women: -1,
    },
    tournamentName: "Monte-Carlo Masters",
    place: "Monte-Carlo, Monaco",
  },
  {
    courtType: "clay",
    // Apr 26 - May 07, 2023
    tournamentPeriod: {
      start: new Date(2023, 3, 26),
      end: new Date(2023, 4, 7),
    },
    tournamentIds: {
      men: 2374,
      women: -1,
    },
    tournamentName: "Madrid Open",
    place: "Madrid, Spain",
  },
  {
    courtType: "clay",
    // May 10 - Aug 21, 2023
    tournamentPeriod: {
      start: new Date(2023, 4, 10),
      end: new Date(2023, 4, 21),
    },
    tournamentIds: {
      men: 2488,
      women: -1,
    },
    tournamentName: "Italian Open",
    place: "Rome, Italy",
  },
  {
    courtType: "hard",
    // Aug 7 - Aug 13, 2023
    tournamentPeriod: {
      start: new Date(2023, 7, 7),
      end: new Date(2023, 7, 13),
    },
    tournamentIds: {
      men: 2510,
      women: -1,
    },
    tournamentName: "Canada Masters",
    place: "Toronto, Canada",
  },
  {
    courtType: "hard",
    // Aug 13 - Aug 20, 2023
    tournamentPeriod: {
      start: new Date(2023, 7, 13),
      end: new Date(2023, 7, 20),
    },
    tournamentIds: {
      men: 2373,
      women: -1,
    },
    tournamentName: "Cincinnati Open",
    place: "Cincinnati, OH, USA",
  },
  {
    courtType: "hard",
    // Oct 04 - Oct 15, 2023
    tournamentPeriod: {
      start: new Date(2023, 9, 4),
      end: new Date(2023, 9, 15),
    },
    tournamentIds: {
      men: 2519,
      women: -1,
    },
    tournamentName: "Shanghai Masters",
    place: "Shanghai, China",
  },
  {
    courtType: "hard",
    // Oct 30 - Nov 05, 2023
    tournamentPeriod: {
      start: new Date(2023, 9, 30),
      end: new Date(2023, 10, 5),
    },
    tournamentIds: {
      men: 2404,
      women: -1,
    },
    tournamentName: "Paris Masters",
    place: "Paris, France",
  },
];

const TournamentsPage: Component = () => {
  return (
    <div class={styles.TournamentsPage}>
      <h1>Tournaments</h1>
      <h2>Grand Slams</h2>
      <For each={GRAND_SLAMS_INFORMATION}>
        {(cardProps) => <TournamentCard {...cardProps} />}
      </For>
      <h2>ATP 1000</h2>
      <For each={ATP_1000_INFORMATION}>
        {(cardProps) => <TournamentCard {...cardProps} />}
      </For>
    </div>
  );
};

export { TournamentsPage };

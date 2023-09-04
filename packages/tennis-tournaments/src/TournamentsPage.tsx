import { Component, For, createEffect, createSignal } from "solid-js";
import styles from "./TournamentsPage.module.css";
import { TournamentCard, TournamentCardProps } from "./TournamentCard";
import { Select } from "./Select";
import { COURT_TYPES } from "./Constants/COURT_TYPES";
import { CourtType } from "./Types/CourtType";
import { TournamentType } from "./Types/TournamentType";
import { TOURNAMENT_TYPES } from "./Constants/TOURNAMENT_TYPES";
import { TournamentStatus } from "./Types/TournamentStatus";
import { getTournamentStatus } from "./Utils/getTournamentStatus";
import { TOURNAMENT_STATUSES } from "./Constants/TOURNAMENT_STATUSES";

const TOURNAMENTS: TournamentCardProps[] = [
  {
    courtType: "hard",
    // Jan 16 - Jan 29, 2023
    tournamentPeriod: {
      start: new Date(2023, 0, 16),
      end: new Date(2023, 0, 29),
    },
    tournamentIds: {
      men: 2363,
      women: 2571,
    },
    tournamentName: "Australian Open",
    tournamentTypes: ["grand-slam"],
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
      women: 2577,
    },
    tournamentName: "Roland Garros",
    tournamentTypes: ["grand-slam"],
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
      women: 2600,
    },
    tournamentName: "Wimbledon",
    tournamentTypes: ["grand-slam"],
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
    tournamentTypes: ["grand-slam"],
    place: "New York City, USA",
  },
  {
    courtType: "hard",
    // Mar 08 - Mar 19, 2023
    tournamentPeriod: {
      start: new Date(2023, 2, 8),
      end: new Date(2023, 2, 19),
    },
    tournamentIds: {
      men: 2487,
      women: 2619,
    },
    tournamentName: "Indian Wells Masters",
    tournamentTypes: ["atp-1000", "wta-1000"],
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
      women: 2587,
    },
    tournamentName: "Miami Open",
    tournamentTypes: ["atp-1000", "wta-1000"],
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
    },
    tournamentName: "Monte-Carlo Masters",
    tournamentTypes: ["atp-1000"],
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
      women: 2607,
    },
    tournamentName: "Madrid Open",
    tournamentTypes: ["atp-1000", "wta-1000"],
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
      women: 2569,
    },
    tournamentName: "Italian Open",
    tournamentTypes: ["atp-1000", "wta-1000"],
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
      women: 2615,
    },
    tournamentName: "Canada Masters",
    tournamentTypes: ["atp-1000", "wta-1000"],
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
      women: 2548,
    },
    tournamentName: "Cincinnati Open",
    tournamentTypes: ["atp-1000", "wta-1000"],
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
    },
    tournamentName: "Shanghai Masters",
    tournamentTypes: ["atp-1000"],
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
    },
    tournamentName: "Paris Masters",
    tournamentTypes: ["atp-1000"],
    place: "Paris, France",
  },
  {
    courtType: "hard",
    // Feb 27 - Mar 04, 2023
    tournamentPeriod: {
      start: new Date(2023, 1, 27),
      end: new Date(2023, 2, 4),
    },
    tournamentIds: {
      men: 2389,
      women: 2612,
    },
    tournamentName: "Dubai Open",
    tournamentTypes: ["atp-500", "wta-1000"],
    place: "Dubai, UAE",
  },
  {
    courtType: "hard",
    // Sep 17 - Sep 23, 2023
    tournamentPeriod: {
      start: new Date(2023, 8, 17),
      end: new Date(2023, 8, 23),
    },
    tournamentIds: {
      women: 16559,
    },
    tournamentName: "Guadalajara Open",
    tournamentTypes: ["wta-1000"],
    place: "Guadalajara, Mexico",
  },
  {
    courtType: "hard",
    // Sep 30 - Oct 8, 2023
    tournamentPeriod: {
      start: new Date(2023, 9, 30),
      end: new Date(2023, 10, 8),
    },
    tournamentIds: {
      men: 2436,
      women: 2557,
    },
    tournamentName: "China Open",
    tournamentTypes: ["atp-500", "wta-1000"],
    place: "Beijing, China",
  },
];

type FilterMap = {
  courtType: "all" | CourtType;
  tournamentStatus: "all" | TournamentStatus;
  tournamentType: "all" | TournamentType;
};

type FilterType = keyof FilterMap;

const FILTER_COMPARATORS: Record<
  FilterType,
  (tournament: TournamentCardProps, expected: string) => boolean
> = {
  courtType: (tournament, expected) => tournament.courtType === expected,
  tournamentType: (tournament, expected) =>
    (tournament.tournamentTypes as string[]).includes(expected),
  tournamentStatus: (tournament, expected) =>
    getTournamentStatus(tournament.tournamentPeriod) === expected,
};

const TournamentsPage: Component = () => {
  const sortedTournaments = TOURNAMENTS.sort(
    (a, b) => +a.tournamentPeriod.start - +b.tournamentPeriod.start
  );

  const [visibleTournaments, updateVisibleTournaments] = createSignal([
    ...sortedTournaments,
  ]);
  const [filterMap, updateFilterMap] = createSignal<FilterMap>({
    courtType: "all",
    tournamentType: "all",
    tournamentStatus: "all",
  });

  const handleFilterUpdate = (currentFilterMap: FilterMap) => {
    updateVisibleTournaments(() => {
      const filters = Object.keys(
        currentFilterMap
      ) as (keyof typeof currentFilterMap)[];

      const isTournamentVisible = (
        tournament: TournamentCardProps
      ): boolean => {
        for (const filter of filters) {
          const expectedValue = currentFilterMap[filter];

          if (expectedValue === "all") {
            continue;
          }

          if (FILTER_COMPARATORS[filter](tournament, expectedValue)) {
            continue;
          }

          return false;
        }

        return true;
      };

      const tournaments = [];

      for (const tournament of sortedTournaments) {
        if (isTournamentVisible(tournament)) {
          tournaments.push(tournament);
        }
      }

      return tournaments;
    });
  };

  createEffect(() => {
    handleFilterUpdate(filterMap());
  });

  const applyFilters = (value: string, filterType: FilterType) => {
    // return new object to get reactivity working (specifically createEffect)
    updateFilterMap((previousFilterMap) => ({
      ...previousFilterMap,
      [filterType]: value,
    }));
  };

  return (
    <div class={styles.TournamentsPage}>
      <Select
        id="court type"
        current={() => "all"}
        values={() => ["all", ...COURT_TYPES]}
        onChange={(value) => applyFilters(value, "courtType")}
      />
      <Select
        id="tournament type"
        current={() => "all"}
        values={() => ["all", ...TOURNAMENT_TYPES]}
        onChange={(value) => applyFilters(value, "tournamentType")}
      />
      <Select
        id="tournament status"
        current={() => "all"}
        values={() => ["all", ...TOURNAMENT_STATUSES]}
        onChange={(value) => applyFilters(value, "tournamentStatus")}
      />
      <h1>Tournaments</h1>
      <div class={styles.Tournaments}>
        <For each={visibleTournaments()}>
          {(cardProps) => <TournamentCard {...cardProps} />}
        </For>
      </div>
    </div>
  );
};

export { TournamentsPage };

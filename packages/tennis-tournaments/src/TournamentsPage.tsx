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
    tournamentId: 2363,
    tournamentName: "Australian Open",
    tournamentType: "grand-slam",
    place: "Melbourne, Australia",
  },
  {
    courtType: "hard",
    // Mar 08 - Mar 19, 2023
    tournamentPeriod: {
      start: new Date(2023, 2, 8),
      end: new Date(2023, 2, 19),
    },
    tournamentId: 2487,
    tournamentName: "Indian Wells Masters",
    tournamentType: "atp-1000",
    place: "Indian Wells, CA, USA",
  },
  {
    courtType: "hard",
    // Mar 22 - Apr 02, 2023
    tournamentPeriod: {
      start: new Date(2023, 2, 22),
      end: new Date(2023, 3, 2),
    },
    tournamentId: 2430,
    tournamentName: "Miami Open",
    tournamentType: "atp-1000",
    place: "Miami, FL, USA",
  },
  {
    courtType: "clay",
    // Apr 09 - Apr 16, 2023
    tournamentPeriod: {
      start: new Date(2023, 3, 9),
      end: new Date(2023, 3, 16),
    },
    tournamentId: 2391,
    tournamentName: "Monte-Carlo Masters",
    tournamentType: "atp-1000",
    place: "Monte-Carlo, Monaco",
  },
  {
    courtType: "clay",
    // Apr 26 - May 07, 2023
    tournamentPeriod: {
      start: new Date(2023, 3, 26),
      end: new Date(2023, 4, 7),
    },
    tournamentId: 2374,
    tournamentName: "Madrid Open",
    tournamentType: "atp-1000",
    place: "Madrid, Spain",
  },
  {
    courtType: "clay",
    // May 10 - Aug 21, 2023
    tournamentPeriod: {
      start: new Date(2023, 4, 10),
      end: new Date(2023, 4, 21),
    },
    tournamentId: 2488,
    tournamentName: "Italian Open",
    tournamentType: "atp-1000",
    place: "Rome, Italy",
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
    tournamentType: "grand-slam",
    place: "Paris, France",
  },
  {
    courtType: "hard",
    // Aug 7 - Aug 13, 2023
    tournamentPeriod: {
      start: new Date(2023, 7, 7),
      end: new Date(2023, 7, 13),
    },
    tournamentId: 2510,
    tournamentName: "Canada Masters",
    tournamentType: "atp-1000",
    place: "Toronto, Canada",
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
    tournamentType: "grand-slam",
    place: "London, UK",
  },
  {
    courtType: "hard",
    // Aug 13 - Aug 20, 2023
    tournamentPeriod: {
      start: new Date(2023, 7, 13),
      end: new Date(2023, 7, 20),
    },
    tournamentId: 2373,
    tournamentName: "Cincinnati Open",
    tournamentType: "atp-1000",
    place: "Cincinnati, OH, USA",
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
    tournamentType: "grand-slam",
  },
  {
    courtType: "hard",
    // Oct 04 - Oct 15, 2023
    tournamentPeriod: {
      start: new Date(2023, 9, 4),
      end: new Date(2023, 9, 15),
    },
    tournamentId: 2519,
    tournamentName: "Shanghai Masters",
    tournamentType: "atp-1000",
    place: "Shanghai, China",
  },
  {
    courtType: "hard",
    // Oct 30 - Nov 05, 2023
    tournamentPeriod: {
      start: new Date(2023, 9, 30),
      end: new Date(2023, 10, 5),
    },
    tournamentId: 2404,
    tournamentName: "Paris Masters",
    tournamentType: "atp-1000",
    place: "Paris, France",
  },
];

type FilterMap = {
  courtType: "all" | CourtType;
  tournamentStatus: "all" | TournamentStatus;
  tournamentType: "all" | TournamentType;
};

type FilterType = keyof FilterMap;

const FILTERS: Record<FilterType, (tournament: TournamentCardProps) => string> =
  {
    courtType: (tournament) => tournament.courtType,
    tournamentType: (tournament) => tournament.tournamentType,
    tournamentStatus: (tournament) =>
      getTournamentStatus(tournament.tournamentPeriod),
  };

const TournamentsPage: Component = () => {
  const [visibleTournaments, updateVisibleTournaments] = createSignal([
    ...TOURNAMENTS,
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

          if (FILTERS[filter](tournament) === expectedValue) {
            continue;
          }

          return false;
        }

        return true;
      };

      const tournaments = [];

      for (const tournament of TOURNAMENTS) {
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

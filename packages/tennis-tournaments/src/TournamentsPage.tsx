import { Component } from "solid-js";
import styles from "./TournamentsPage.module.css";
import { TournamentCard } from "./TournamentCard";

const TournamentsPage: Component = () => {
  return (
    <div class={styles.TournamentsPage}>
      <TournamentCard
        courtType="hard"
        // Jul 3 - Jul 16, 2023
        tournamentPeriod={{
          start: new Date(2023, 6, 2),
          end: new Date(2023, 6, 15),
        }}
        tournamentId="2361"
        tournamentName="The Championships, Wimbledon"
        place="Wimbledon, UK"
      />
    </div>
  );
};

export { TournamentsPage };

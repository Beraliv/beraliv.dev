import { lazy, type Component } from "solid-js";
import { Routes, Route, Router } from "@solidjs/router";

const TournamentPage = lazy(() =>
  import("./TournamentPage").then(({ TournamentPage }) => ({
    default: TournamentPage,
  }))
);

const TournamentsPage = lazy(() =>
  import("./TournamentsPage").then(({ TournamentsPage }) => ({
    default: TournamentsPage,
  }))
);

const App: Component = () => (
  <Router>
    <Routes>
      <Route path="/" component={TournamentsPage} />
      <Route
        path="/tournament/:tournamentName/:tournamentId/:courtType"
        component={TournamentPage}
      />
    </Routes>
  </Router>
);

export { App };

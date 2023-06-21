import { Index, type Component, createResource, createSignal } from "solid-js";

import styles from "./App.module.css";
import { TournamentRound } from "./TournamentRound";
import { fetchRounds } from "./Utils/fetchRounds";
import { chooseVisibleRounds } from "./Utils/chooseVisibleRounds";
import { fetchMatchesByRound } from "./Utils/fetchMatchesByRound";
import { createMatchCardPropsFromMatches } from "./Utils/createMatchCardPropsFromMatches";

const App: Component = () => {
  // 1. Choose tournament

  const [tournament, setTournament] = createSignal({
    tournamentId: localStorage.getItem("tennis-tournament/tournamentId") || "",
    seasonId: localStorage.getItem("tennis-tournament/seasonId") || "",
  });

  // 2. Given tournament ID and season ID, request tournament rounds

  const [roundsApiModel] = createResource(tournament, fetchRounds);

  // 3. Given tournament round, fetch tournament tree

  const [tree] = createResource(roundsApiModel, async (model) => {
    const visibleRounds = chooseVisibleRounds(model);

    return Promise.all(
      visibleRounds.map(async (visibleRound) => {
        const data = await fetchMatchesByRound({
          roundId: visibleRound.id,
          seasonId: tournament().seasonId,
          slug: visibleRound.slug,
          tournamentId: tournament().tournamentId,
        });

        const treeData = {
          title: visibleRound.name,
          matches: createMatchCardPropsFromMatches(data),
        };

        return treeData;
      })
    );
  });

  return (
    <div class={styles.App}>
      <div class={styles.Filters}>
        <input
          type="text"
          placeholder="Enter Tournament Id"
          value={tournament().tournamentId}
          onInput={(e) => {
            const tournamentId = e.currentTarget.value;
            setTournament({
              ...tournament(),
              tournamentId,
            });
            localStorage.setItem(
              "tennis-tournament/tournamentId",
              tournamentId
            );
          }}
        />
        <input
          type="text"
          placeholder="Enter Season Id"
          value={tournament().seasonId}
          onInput={(e) => {
            const seasonId = e.currentTarget.value;
            setTournament({ ...tournament(), seasonId });
            localStorage.setItem("tennis-tournament/seasonId", seasonId);
          }}
        />
      </div>
      <div class={styles.Grid}>
        <Index each={tree()}>
          {(roundData, index) => (
            <TournamentRound
              matches={roundData().matches}
              title={roundData().title}
              order={index}
            />
          )}
        </Index>
      </div>
    </div>
  );
};

export { App };

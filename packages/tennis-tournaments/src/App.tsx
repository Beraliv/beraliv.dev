import {
  type Component,
  createResource,
  createSignal,
  Show,
  For,
} from "solid-js";

import styles from "./App.module.css";
import { TournamentRound } from "./TournamentRound";
import { fetchRounds } from "./Utils/fetchRounds";
import { RoundsNavigation } from "./RoundsNavigation";
import { Loading } from "./Loading";
import { fetchTournamentTree } from "./Utils/fetchTournamentTree";

const App: Component = () => {
  // 1. Choose tournament (no requests yet)

  const [tournament, setTournament] = createSignal({
    tournamentId: localStorage.getItem("tennis-tournament/tournamentId") || "",
    seasonId: localStorage.getItem("tennis-tournament/seasonId") || "",
  });

  // 2. Given tournament ID and season ID, request tournament rounds (1 request)

  const [roundsApiModel, { mutate: mutateRoundsApiModel }] = createResource(
    tournament,
    fetchRounds
  );

  // 3. Given tournament round, request tournament tree (3 requests for each visible round)
  // Quarterfinal – 1.7s
  // Round of 128 – 2.3s

  const [tree] = createResource(
    () => ({ rounds: roundsApiModel(), tournament: tournament() }),
    fetchTournamentTree
  );

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
      <div>
        <Show when={roundsApiModel.state === "ready" && roundsApiModel()}>
          {(roundsData) => (
            <RoundsNavigation
              roundsApiModel={roundsData}
              mutateRoundsApiModel={mutateRoundsApiModel}
            />
          )}
        </Show>
      </div>
      <div class={styles.Grid}>
        <For each={tree()} fallback={<Loading />}>
          {(roundData, index) => (
            <TournamentRound {...roundData} index={index()} />
          )}
        </For>
      </div>
    </div>
  );
};

export { App };

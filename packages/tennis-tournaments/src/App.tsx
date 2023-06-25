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
import { chooseVisibleRounds } from "./Utils/chooseVisibleRounds";
import { fetchMatchesByRound } from "./Utils/fetchMatchesByRound";
import { createMatchCardPropsFromMatches } from "./Utils/createMatchCardPropsFromMatches";
import { RoundsNavigation } from "./RoundsNavigation";
import { Loading } from "./Loading";

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

  const [tree] = createResource(roundsApiModel, async (model) => {
    const visibleRounds = chooseVisibleRounds(model);

    const treeData = await Promise.all(
      visibleRounds.map(async (visibleRound) => {
        const data = await fetchMatchesByRound({
          roundId: visibleRound.id,
          seasonId: tournament().seasonId,
          slug: visibleRound.slug,
          tournamentId: tournament().tournamentId,
        });

        const nodeData = {
          title: visibleRound.name,
          matches: createMatchCardPropsFromMatches(data),
        };

        return nodeData;
      })
    );

    return treeData;
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
      <div>
        <Show when={roundsApiModel.state === "ready"}>
          <RoundsNavigation
            roundsApiModel={roundsApiModel}
            mutateRoundsApiModel={mutateRoundsApiModel}
          />
        </Show>
      </div>
      <div class={styles.Grid}>
        <For each={tree()} fallback={<Loading />}>
          {(roundData, index) => (
            <TournamentRound {...roundData} order={index()} />
          )}
        </For>
      </div>
    </div>
  );
};

export { App };

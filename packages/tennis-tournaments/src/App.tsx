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

const App: Component = () => {
  // 1. Choose tournament

  const [tournament, setTournament] = createSignal({
    tournamentId: localStorage.getItem("tennis-tournament/tournamentId") || "",
    seasonId: localStorage.getItem("tennis-tournament/seasonId") || "",
  });

  // 2. Given tournament ID and season ID, request tournament rounds

  const [roundsApiModel, { mutate: updateRoundsApiModel }] = createResource(
    tournament,
    fetchRounds
  );

  // 3. Given tournament round, fetch tournament tree

  const [tree] = createResource(roundsApiModel, async (model) => {
    const visibleRounds = chooseVisibleRounds(model);

    const treeData = await Promise.all(
      visibleRounds.map(async (visibleRound) => {
        console.log(">>> request visible round", visibleRound);

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
            updateRoundsApiModel={updateRoundsApiModel}
          />
        </Show>
      </div>
      <div class={styles.Grid}>
        {/* TODO: the order in the tree isn't correct so have to restructure it */}
        <For each={tree()}>
          {(roundData, index) => (
            <TournamentRound
              matches={roundData.matches}
              title={roundData.title}
              order={index()}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export { App };

import { type Component, createResource, Show, For } from "solid-js";

import styles from "./TournamentPage.module.css";
import { TournamentRound } from "./TournamentRound";
import { fetchRounds } from "./Utils/fetchRounds";
import { RoundsNavigation } from "./RoundsNavigation";
import { Loading } from "./Loading";
import { fetchTournamentTree } from "./Utils/fetchTournamentTree";
import { useParams } from "@solidjs/router";
import { fetchSeasons } from "./Utils/fetchSeasons";
import { Select } from "./Select";
import { isDefined } from "./Utils/isDefined";
import { chooseVisibleTree } from "./Utils/chooseVisibleTree";

const TournamentPage: Component = () => {
  // 1. Choose tournament (no requests on this page)

  const { tournamentId } = useParams<{ tournamentId: string }>();

  // 2. Given tournament ID, request seasons (1 request)

  const [seasonsApiModel, { mutate: mutateSeasonsApiModel }] = createResource(
    tournamentId,
    fetchSeasons
  );

  const seasonId = () => {
    const seasonsData = seasonsApiModel();

    const id =
      isDefined(seasonsData) && isDefined(seasonsData.currentSeason)
        ? `${seasonsData.currentSeason.id}`
        : "";

    return id;
  };

  const handleSeasonChange = (year: string) => {
    mutateSeasonsApiModel((prev) => {
      if (prev === undefined) {
        return prev;
      }

      const nextSeason = prev.seasons.find((season) => season.year === year);

      return {
        ...prev,
        currentSeason: nextSeason,
      };
    });
  };

  // 3. Given tournament ID and season ID, request tournament rounds (1 request)

  const [roundsApiModel, { mutate: mutateRoundsApiModel }] = createResource(
    () => ({ seasonId: seasonId(), tournamentId }),
    fetchRounds
  );

  const handleRoundChange = (name: string) => {
    mutateRoundsApiModel((prev) => {
      if (prev === undefined) {
        return undefined;
      }

      const nextRound = prev.rounds.find((round) => round.name === name);

      return {
        ...prev,
        currentRound: nextRound,
      };
    });
  };

  // 4. Request tournament tree (1 request for the whole tree)

  const [tree] = createResource(
    () => ({ seasonId: seasonId(), tournamentId }),
    fetchTournamentTree
  );

  // 5. Given tournament tree and rounds, return visible tree (0 requests)

  const [visibleTree] = createResource(
    () => ({ tree: tree(), rounds: roundsApiModel() }),
    chooseVisibleTree
  );

  return (
    <div class={styles.TournamentPage}>
      <div>
        <Show when={seasonsApiModel.state === "ready" && seasonsApiModel()}>
          {(seasonsData) => (
            <Select
              id="season"
              current={() => seasonsData().currentSeason?.year}
              values={() => seasonsData().seasons.map((season) => season.year)}
              onChange={handleSeasonChange}
            />
          )}
        </Show>
      </div>
      <div class={styles.RoundsMobile}>
        <Show when={roundsApiModel.state === "ready" && roundsApiModel()}>
          {(roundsData) => (
            <Select
              id="round"
              current={() =>
                roundsData().currentRound?.name ?? roundsData().rounds[0]?.name
              }
              values={() => roundsData().rounds.map((round) => round.name)}
              onChange={handleRoundChange}
            />
          )}
        </Show>
      </div>
      <div class={styles.RoundsDesktop}>
        <Show when={roundsApiModel.state === "ready" && roundsApiModel()}>
          {(roundsData) => (
            <RoundsNavigation
              roundsApiModel={roundsData}
              onRoundChange={handleRoundChange}
            />
          )}
        </Show>
      </div>
      <div class={styles.Grid}>
        <For
          each={visibleTree.state === "ready" && visibleTree()}
          fallback={<Loading />}
        >
          {(roundData, index) => (
            <TournamentRound {...roundData} index={index()} />
          )}
        </For>
      </div>
    </div>
  );
};

export { TournamentPage };

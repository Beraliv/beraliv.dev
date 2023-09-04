import {
  type Component,
  createResource,
  Show,
  For,
  createSignal,
} from "solid-js";
import { A, useParams } from "@solidjs/router";

import styles from "./TournamentPage.module.css";

import BackIcon from "./Icons/BackIcon.svg";
import { CourtType } from "./Types/CourtType";
import { Loading } from "./Loading";
import { RoundsNavigation } from "./RoundsNavigation";
import { Select } from "./Select";
import { SelectGroup } from "./SelectGroup";
import { TennisMatchType } from "./Types/TennisMatchType";
import { TennisPlayer } from "./Types/TennisPlayer";
import { TournamentRound } from "./TournamentRound";
import { chooseTournamentId } from "./Utils/chooseTournamentId";
import { chooseVisibleTree } from "./Utils/chooseVisibleTree";
import { fetchRounds } from "./Utils/fetchRounds";
import { fetchSeasons } from "./Utils/fetchSeasons";
import { fetchTournamentTree } from "./Utils/fetchTournamentTree";
import { getCurrentRound } from "./Utils/getCurrentRound";
import { getMatchTypeEntries } from "./Utils/getMatchTypeEntries";
import { getObjectKeys } from "./Utils/getObjectKeys";
import { isDefined } from "./Utils/isDefined";
import { parseTournamentIds } from "./Utils/parseTournamentIds";

const NO_SEASON_ID = "";

const TournamentPage: Component = () => {
  const routeParams = useParams<{
    courtType: CourtType;
    tournamentId: string;
    tournamentName: string;
  }>();

  const { courtType } = routeParams;
  const tournamentName = decodeURIComponent(routeParams.tournamentName);
  const tournamentIds = parseTournamentIds(routeParams.tournamentId);
  const matchTypes = getObjectKeys(tournamentIds);
  const matchTypeEntries = getMatchTypeEntries(tournamentIds);

  // 1. Choose match type (no requests on this page)

  const [matchType, updateMatchType] = createSignal<TennisMatchType>(
    matchTypes[0]
  );

  // 2. Given match type, choose tournament ID (no requests on this page)

  const [tournamentId] = createResource(
    () => ({ matchType: matchType(), tournamentIds }),
    chooseTournamentId
  );

  // 3. Given tournament ID, request seasons (1 request)

  const [seasonsApiModel, { mutate: mutateSeasonsApiModel }] = createResource(
    tournamentId,
    fetchSeasons,
    {}
  );

  const seasonId = () => {
    if (seasonsApiModel.loading) {
      return NO_SEASON_ID;
    }

    const seasonsData = seasonsApiModel();

    const id =
      isDefined(seasonsData) && isDefined(seasonsData.currentSeason)
        ? `${seasonsData.currentSeason.id}`
        : NO_SEASON_ID;

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

  // 4. Given tournament ID and season ID, request tournament rounds (1 request)

  const [roundsApiModel, { mutate: mutateRoundsApiModel }] = createResource(
    () => ({ seasonId: seasonId(), tournamentId: tournamentId() }),
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

  // 5. Request tournament tree (1 request for the whole tree)

  const [tree] = createResource(
    () => ({ seasonId: seasonId(), tournamentId: tournamentId() }),
    fetchTournamentTree
  );

  // 6. Given tournament tree and rounds, return visible tree (0 requests)

  const [visibleTree] = createResource(
    () => ({ tree: tree(), rounds: roundsApiModel() }),
    chooseVisibleTree
  );

  // Store signal here to update players in all rounds

  const selectedTennisPlayerIdSignal = createSignal<TennisPlayer["id"]>();

  return (
    <div class={styles.TournamentPage}>
      <div class={styles.TournamentPageHeader}>
        <A href="/">
          <BackIcon />
        </A>
        <h1 class={styles.TournamentName}>{tournamentName}</h1>
      </div>

      <SelectGroup>
        <Show when={matchTypes.length > 1}>
          <div class={styles.MatchTypeSelect}>
            <Select
              current={matchType}
              id="matchType"
              label="Match type"
              onChange={updateMatchType}
              values={() => matchTypeEntries}
            />
          </div>
        </Show>

        <Show when={seasonsApiModel.state === "ready" && seasonsApiModel()}>
          {(seasonsData) => (
            <Select
              current={() => seasonsData().currentSeason?.year}
              id="season"
              label="Season"
              onChange={handleSeasonChange}
              values={() => seasonsData().seasons.map((season) => season.year)}
            />
          )}
        </Show>

        <Show when={roundsApiModel.state === "ready" && roundsApiModel()}>
          {(roundsData) => (
            <div class={styles.RoundsMobile}>
              <Select
                current={() => getCurrentRound(roundsData())}
                id="round"
                label="Round"
                onChange={handleRoundChange}
                values={() => roundsData().rounds.map((round) => round.name)}
              />
            </div>
          )}
        </Show>
      </SelectGroup>

      <Show when={roundsApiModel.state === "ready" && roundsApiModel()}>
        {(roundsData) => (
          <>
            <div class={styles.RoundsDesktop}>
              <RoundsNavigation
                roundsApiModel={roundsData}
                onRoundChange={handleRoundChange}
                courtType={courtType}
              />
            </div>
          </>
        )}
      </Show>

      <div class={styles.Grid}>
        <For
          each={visibleTree.state === "ready" && visibleTree()}
          fallback={<Loading />}
        >
          {(roundData, index) => (
            <TournamentRound
              {...roundData}
              selectedTennisPlayerIdSignal={selectedTennisPlayerIdSignal}
              courtType={courtType}
              index={index()}
            />
          )}
        </For>
      </div>
    </div>
  );
};

export { TournamentPage };

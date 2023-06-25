import { Accessor } from "solid-js";
import { RoundsApiModel } from "../Types/RoundsApiModel";
import { chooseVisibleRounds } from "./chooseVisibleRounds";
import { createMatchCardPropsFromMatches } from "./createMatchCardPropsFromMatches";
import { fetchMatchesByRound } from "./fetchMatchesByRound";

interface FetchTournamentTreeParameters {
  rounds: RoundsApiModel | undefined;
  tournament: {
    tournamentId: string;
    seasonId: string;
  };
}

const fetchTournamentTree = async ({
  rounds,
  tournament,
}: FetchTournamentTreeParameters) => {
  if (!rounds) {
    return [];
  }

  const visibleRounds = chooseVisibleRounds(rounds);

  const treeData = await Promise.all(
    visibleRounds.map(async (visibleRound) => {
      const data = await fetchMatchesByRound({
        roundId: visibleRound.id,
        seasonId: tournament.seasonId,
        slug: visibleRound.slug,
        tournamentId: tournament.tournamentId,
      });

      const nodeData = {
        title: visibleRound.name,
        matches: createMatchCardPropsFromMatches(data),
      };

      return nodeData;
    })
  );

  return treeData;
};

export { fetchTournamentTree };

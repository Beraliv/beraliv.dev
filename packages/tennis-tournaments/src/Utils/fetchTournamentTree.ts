import { RoundsApiModel } from "../Types/RoundsApiModel";
import { chooseVisibleRounds } from "./chooseVisibleRounds";
import { createMatchCardPropsFromMatches } from "./createMatchCardPropsFromMatches";
import { fetchMatchesByRound } from "./fetchMatchesByRound";
import { MatchCardProps } from "../MatchCard";
import { VisibleRoundOrder } from "./getVisibleRoundOrders";

interface FetchTournamentTreeParameters {
  rounds: RoundsApiModel | undefined;
  tournament: {
    tournamentId: string;
    seasonId: string;
  };
}

interface SimpleTournamentRound {
  matches: MatchCardProps[];
  order: VisibleRoundOrder;
  title: string;
}

const fetchTournamentTree = async ({
  rounds,
  tournament,
}: FetchTournamentTreeParameters): Promise<SimpleTournamentRound[]> => {
  if (!rounds) {
    return [];
  }

  if (!rounds.currentRound) {
    return [];
  }

  const visibleRounds = chooseVisibleRounds(rounds);

  const tournamentTreeData = await Promise.all(
    visibleRounds.map(async (round): Promise<SimpleTournamentRound> => {
      const data = await fetchMatchesByRound({
        roundId: round.id,
        seasonId: tournament.seasonId,
        slug: round.slug,
        tournamentId: tournament.tournamentId,
      });

      if (data === null) {
        return {
          title: round.name,
          order: round.order,
          matches: [],
        };
      }

      return {
        title: round.name,
        order: round.order,
        matches: createMatchCardPropsFromMatches(data),
      };
    })
  );

  return tournamentTreeData;
};

export { fetchTournamentTree, type SimpleTournamentRound };

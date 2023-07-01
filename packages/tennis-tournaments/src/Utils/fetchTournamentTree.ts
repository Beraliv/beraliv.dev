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

  const visibleRounds = chooseVisibleRounds(rounds);

  const tournamentTreeData = await Promise.all(
    visibleRounds.map(async (round) => {
      const data = await fetchMatchesByRound({
        roundId: round.id,
        seasonId: tournament.seasonId,
        slug: round.slug,
        tournamentId: tournament.tournamentId,
      });

      const roundData: SimpleTournamentRound = {
        title: round.name,
        order: round.order,
        matches: createMatchCardPropsFromMatches(data),
      };

      return roundData;
    })
  );

  return tournamentTreeData;
};

export { fetchTournamentTree, type SimpleTournamentRound };

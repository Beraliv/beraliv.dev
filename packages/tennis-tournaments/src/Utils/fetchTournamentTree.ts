import { RoundsApiModel } from "../Types/RoundsApiModel";
import { chooseVisibleRounds } from "./chooseVisibleRounds";
import { createMatchCardPropsFromMatches } from "./createMatchCardPropsFromMatches";
import { fetchMatchesByRound } from "./fetchMatchesByRound";
import { MatchCardProps } from "../MatchCard";

interface FetchTournamentTreeParameters {
  rounds: RoundsApiModel | undefined;
  tournament: {
    tournamentId: string;
    seasonId: string;
  };
}

interface TournamentRound {
  matches: MatchCardProps[];
  title: string;
}

const fetchTournamentTree = async ({
  rounds,
  tournament,
}: FetchTournamentTreeParameters): Promise<TournamentRound[]> => {
  if (!rounds) {
    return [];
  }

  const visibleRounds = chooseVisibleRounds(rounds);

  const tournamentTreeData = await Promise.all(
    visibleRounds.map(async (visibleRound) => {
      const data = await fetchMatchesByRound({
        roundId: visibleRound.id,
        seasonId: tournament.seasonId,
        slug: visibleRound.slug,
        tournamentId: tournament.tournamentId,
      });

      const roundData: TournamentRound = {
        title: visibleRound.name,
        matches: createMatchCardPropsFromMatches(data),
      };

      return roundData;
    })
  );

  return tournamentTreeData;
};

export { fetchTournamentTree };

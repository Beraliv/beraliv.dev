import type {
  AllRounds,
  MatchCardPropsWithOrder,
} from "./createRoundsFromCupTrees";

const convertRoundInformationToAllRounds = (
  roundMatchesByType: Record<string, MatchCardPropsWithOrder[]>,
  roundTitlesByType: Record<string, string>
): AllRounds[] => {
  // e.g. [64, 32, 16, 8, 4, 2, 1]
  const sortedRoundTypes = Object.keys(roundMatchesByType)
    .map((round) => parseInt(round, 10))
    .sort((a, b) => b - a);

  const roundTitles = sortedRoundTypes.map((round) => roundTitlesByType[round]);
  const roundsMatches = sortedRoundTypes.map(
    (round) => roundMatchesByType[round]
  );

  const rounds: AllRounds[] = [];

  for (let i = 0; i < sortedRoundTypes.length; i++) {
    const roundTitle = roundTitles[i];
    const roundMatches = roundsMatches[i].sort(
      (round1, round2) => round1.order - round2.order
    );

    rounds.push({
      matches: roundMatches,
      title: roundTitle,
    });
  }

  return rounds;
};

export { convertRoundInformationToAllRounds };

import { TournamentPeriod } from "../Types/TournamentPeriod";

/**
 * Converting period (start and end dates) to a string
 *
 * e.g. {start: new Date(2023, 6, 3), end: new Date(2023, 6, 16)}
 * to Jul 3 - Jul 16, 2023
 */
const formatTournamentPeriod = ({ start, end }: TournamentPeriod): string => {
  const formattedStart = start.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  const formattedEnd = end.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `${formattedStart} - ${formattedEnd}`;
};

export { formatTournamentPeriod };

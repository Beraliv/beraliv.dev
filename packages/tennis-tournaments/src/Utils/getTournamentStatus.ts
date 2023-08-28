import { TournamentPeriod } from "../Types/TournamentPeriod";
import { TournamentStatus } from "../Types/TournamentStatus";

const getTournamentStatus = ({
  start,
  end,
}: TournamentPeriod): TournamentStatus => {
  const now = new Date();

  const endInclusive = new Date(end);
  endInclusive.setDate(endInclusive.getDate() + 1);

  // tournament start is in the future

  if (start > now) {
    return "coming";
  }

  // tournament end is in the past

  if (endInclusive < now) {
    return "finished";
  }

  // tournament is currently live

  return "live";
};

export { getTournamentStatus };

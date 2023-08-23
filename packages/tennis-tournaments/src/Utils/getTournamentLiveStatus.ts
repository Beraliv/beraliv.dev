import { TournamentPeriod } from "../Types/TournamentPeriod";

const getTournamentLiveStatus = ({ start, end }: TournamentPeriod): boolean => {
  const now = new Date();

  const endInclusive = new Date(end);
  endInclusive.setDate(endInclusive.getDate() + 1);

  return start <= now && now <= endInclusive;
};

export { getTournamentLiveStatus };

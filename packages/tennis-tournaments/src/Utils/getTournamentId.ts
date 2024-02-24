import { TournamentIds } from "../Types/TournamentIds";
import { getObjectEntries } from "./getObjectEntries";

const getTournamentId = (tournamentIds: TournamentIds): string => {
  const entries = getObjectEntries(tournamentIds);

  return entries.map(([key, value]) => `${key}=${value}`).join("&");
};

export { getTournamentId };

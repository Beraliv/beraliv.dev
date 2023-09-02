import { TournamentIds } from "../Types/TournamentIds";

const parseTournamentIds = (tournamentId: string): TournamentIds => {
  const keyValues = tournamentId.split("&");

  let obj: Record<string, number> = {};

  for (let keyValue of keyValues) {
    const [key, stringifiedValue] = keyValue.split("=");

    obj[key] = parseInt(stringifiedValue, 10);
  }

  // TODO: add a warning if there is no value

  return {
    men: obj.men,
    women: obj.women,
  };
};

export { parseTournamentIds };

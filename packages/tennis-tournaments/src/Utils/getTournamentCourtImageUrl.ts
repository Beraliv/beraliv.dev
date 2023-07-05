import { CLOUDINARY_BASE_URL } from "../Constants/CLOUDINARY_BASE_URL";
import { CourtType } from "../Types/CourtType";

const TOURNAMENT_COURT_PATH = "tennis_tournaments/courts";

const COURT_HASH_MAP: Record<CourtType, number> = {
  hard: 1688590951,
  clay: 1688590954,
  grass: 1688592246,
};

const getTournamentCourtImageUrl = (courtType: CourtType): string => {
  return `${CLOUDINARY_BASE_URL}/v${COURT_HASH_MAP[courtType]}/${TOURNAMENT_COURT_PATH}/${courtType}.png`;
};

export { getTournamentCourtImageUrl };

import { TennisPlayer } from "../Types/TennisPlayer";
import { getImageUrlByLastName } from "../Utils/getImageUrlByLastName";

const TENNIS_PLAYER_PLACEHOLDER: TennisPlayer = {
  firstName: "",
  lastName: "",
  id: -1,
  imageUrl: getImageUrlByLastName(""),
  seed: -1,
};

export { TENNIS_PLAYER_PLACEHOLDER };

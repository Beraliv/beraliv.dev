import { TENNIS_PLAYER_HASH_MAP } from "../Constants/TENNIS_PLAYER_HASH_MAP";
import { TENNIS_PLAYER_PLACEHOLDER_HASH } from "../Constants/TENNIS_PLAYER_PLACEHOLDER_HASH";

const getImageUrlByLastName = (lastName: string): string => {
  const lastNameKey = lastName.toLowerCase();

  const [version, hash, key] = TENNIS_PLAYER_HASH_MAP[lastNameKey]
    ? [...TENNIS_PLAYER_HASH_MAP[lastNameKey], lastNameKey]
    : [...TENNIS_PLAYER_PLACEHOLDER_HASH, "placeholder"];

  return `https://res.cloudinary.com/beraliv/image/upload/${version}/tennis_tournaments/players/${key}_${hash}.png`;
};

export { getImageUrlByLastName };

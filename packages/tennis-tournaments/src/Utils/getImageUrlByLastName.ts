import { TENNIS_PLAYER_HASH_MAP } from "../Constants/TENNIS_PLAYER_HASH_MAP";
import { TENNIS_PLAYER_PLACEHOLDER_VERSION } from "../Constants/TENNIS_PLAYER_PLACEHOLDER_VERSION";

const getImageUrlByLastName = (slug: string): string => {
  if (TENNIS_PLAYER_HASH_MAP[slug]) {
    return `https://res.cloudinary.com/beraliv/image/upload/w_275,ar_1:1,c_crop,g_face,r_max/v${TENNIS_PLAYER_HASH_MAP[slug]}/tennis_tournaments/players/${slug}.avif`;
  }

  return `https://res.cloudinary.com/beraliv/image/upload/w_100,ar_1:1,c_fill,g_face,r_max/v${TENNIS_PLAYER_PLACEHOLDER_VERSION}/tennis_tournaments/players/placeholder.avif`;
};

export { getImageUrlByLastName };

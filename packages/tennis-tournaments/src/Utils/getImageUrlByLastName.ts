import { CLOUDINARY_BASE_URL } from "../Constants/CLOUDINARY_BASE_URL";
import { TENNIS_PLAYER_HASH_MAP } from "../Constants/TENNIS_PLAYER_HASH_MAP";
import { TENNIS_PLAYER_PLACEHOLDER_VERSION } from "../Constants/TENNIS_PLAYER_PLACEHOLDER_VERSION";

const CLOUDINARY_PATH = "tennis_tournaments/players";

const getImageUrlByLastName = (slug: string): string => {
  if (TENNIS_PLAYER_HASH_MAP[slug]) {
    return `${CLOUDINARY_BASE_URL}/w_275,ar_1:1,c_crop,g_face,r_max/v${TENNIS_PLAYER_HASH_MAP[slug]}/${CLOUDINARY_PATH}/${slug}.avif`;
  }

  return `${CLOUDINARY_BASE_URL}/w_100,ar_1:1,c_fill,g_face,r_max/v${TENNIS_PLAYER_PLACEHOLDER_VERSION}/${CLOUDINARY_PATH}/placeholder.avif`;
};

export { getImageUrlByLastName };

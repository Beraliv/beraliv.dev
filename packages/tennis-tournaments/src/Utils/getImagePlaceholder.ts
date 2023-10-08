import { CLOUDINARY_BASE_URL } from "../Constants/CLOUDINARY_BASE_URL";

const CLOUDINARY_PATH = "tennis_tournaments/players";

const getImagePlaceholder = () => {
  const timestampSeconds = Math.floor(Date.now() / 1_000);

  return `${CLOUDINARY_BASE_URL}/w_100,ar_1:1,c_fill,g_face,r_max/v${timestampSeconds}/${CLOUDINARY_PATH}/placeholder.avif`;
};

export { getImagePlaceholder };

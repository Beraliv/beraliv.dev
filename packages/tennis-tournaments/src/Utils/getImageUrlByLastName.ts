import { CLOUDINARY_BASE_URL } from "../Constants/CLOUDINARY_BASE_URL";

const CLOUDINARY_PATH = "tennis_tournaments/players";

const getImageUrlByLastName = (slug: string): string => {
  const timestampSeconds = Math.floor(Date.now() / 1_000);

  return `${CLOUDINARY_BASE_URL}/w_275,ar_1:1,c_crop,g_face,r_max/v${timestampSeconds}/${CLOUDINARY_PATH}/${slug}.avif`;
};

export { getImageUrlByLastName };

import { imageLoader } from "../functions/imageLoader";
import { ImageType } from "../types/ImageType";

export const PROMO_IMAGE: ImageType = {
  url: imageLoader({ src: "/banner_v2.png" }),
  width: 1600,
  height: 900,
};

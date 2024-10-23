import { CLOUDINARY_FOLDER } from "../constants/CLOUDINARY_FOLDER";
import { msToSeconds } from "../utils/msToSeconds";

interface ImageProps {
  alt: string;
  className?: string;
  name: string;
}

export const Image = ({ alt, className, name }: ImageProps) => (
  <img
    src={`https://res.cloudinary.com/beraliv/image/upload/v${msToSeconds(
      Date.now()
    )}/${CLOUDINARY_FOLDER}/${name}`}
    className={className}
    alt={alt}
  />
);

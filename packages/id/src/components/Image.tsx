import { CLOUDINARY_FOLDER } from "../constants/CLOUDINARY_FOLDER";

interface ImageProps {
  alt: string;
  className?: string;
  name: string;
}

export const Image = ({ alt, className, name }: ImageProps) => (
  <img
    src={`https://res.cloudinary.com/beraliv/image/upload/v${DEPLOYMENT_TIME}/${CLOUDINARY_FOLDER}/${name}`}
    className={className}
    alt={alt}
  />
);

import { CLOUDINARY_FOLDER } from "../constants/CLOUDINARY_FOLDER";
import { getCloudinaryConfig } from "../utils/getCloudinaryConfig";

interface ImageProps {
  alt: string;
  className?: string;
  name: string;
  width?: number;
}

export const Image = ({ alt, className, name, width }: ImageProps) => {
  const config = getCloudinaryConfig({ width });

  return (
    <img
      src={`https://res.cloudinary.com/beraliv/image/upload/${config}/v${DEPLOYMENT_TIME}/${CLOUDINARY_FOLDER}/${name}`}
      className={className}
      alt={alt}
    />
  );
};

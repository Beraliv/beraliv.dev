import { CLOUDINARY_FOLDER } from "../constants/CLOUDINARY_FOLDER";
import { getCloudinaryConfig } from "../utils/getCloudinaryConfig";

interface ImageProps {
  alt: string;
  className?: string;
  name: string;
  width?: number;
  mediaQueries?: boolean;
}

const MEDIA_QUERIES = [
  { minWidth: 1200, width: 2400 },
  { minWidth: 600, width: 1200 },
  { minWidth: 300, width: 600 },
  { minWidth: 150, width: 300 },
];

export const Image = ({
  alt,
  className,
  name,
  width,
  mediaQueries = true,
}: ImageProps) => {
  return (
    <picture>
      {mediaQueries && (
        <fragment>
          {MEDIA_QUERIES.map(({ minWidth, width }) => (
            <source
              media={`(min-width: ${minWidth}px)`}
              srcset={`https://res.cloudinary.com/beraliv/image/upload/${getCloudinaryConfig(
                { width }
              )}/v${DEPLOYMENT_TIME}/${CLOUDINARY_FOLDER}/${name}`}
            />
          ))}
        </fragment>
      )}
      <img
        src={`https://res.cloudinary.com/beraliv/image/upload/${getCloudinaryConfig(
          { width }
        )}/v${DEPLOYMENT_TIME}/${CLOUDINARY_FOLDER}/${name}`}
        className={className}
        alt={alt}
      />
    </picture>
  );
};

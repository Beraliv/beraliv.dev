interface CloudinaryConfigOptions {
  width: number;
  quality: number;
}

export const getCloudinaryConfig = ({
  quality = 75,
  width,
}: Partial<CloudinaryConfigOptions>): string => {
  return [`q_${quality}`, width ? `w_${width}` : undefined]
    .filter(Boolean)
    .join(",");
};

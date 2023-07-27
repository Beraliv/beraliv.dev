interface SizeLoaderProps {
  src: string;
}

export const sizeLoader = ({ src }: SizeLoaderProps) => {
  return src.replace(/v\d+/g, "fl_getinfo");
};

interface SizeLoaderProps {
  src: string;
}

export const sizeLoader = ({ src }: SizeLoaderProps) => {
  return src.replace("v1626469589", "fl_getinfo");
};

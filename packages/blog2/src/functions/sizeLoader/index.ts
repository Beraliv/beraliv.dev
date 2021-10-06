interface SizeLoaderProps {
  src: string;
}

export const sizeLoader = ({ src }: SizeLoaderProps) => {
  return src.replace("v1633444777", "fl_getinfo");
};

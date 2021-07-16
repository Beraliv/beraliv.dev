interface SizeLoaderProps {
  src: string;
}

export const sizeLoader = ({ src }: SizeLoaderProps) => {
  return src.replace("v1626453732", "fl_getinfo");
};

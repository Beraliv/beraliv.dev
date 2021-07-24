import { labelToIconMapping } from "../components/atoms/labelToIconMapping";

export interface PostType {
  title: string;
  date: string;
  slug: string;
  description: string;
  content: string;
  labels: (keyof typeof labelToIconMapping)[];
  keywords: string[];
  image: string;
  featured?: boolean;
}

import { labelToIconMapping } from "../components/atoms/labelToIconMapping";
import { UnsanitisedString } from "./UnsanitisedString";

export interface PostType {
  title: UnsanitisedString;
  date: string;
  slug: string;
  description: string;
  content: string;
  labels: (keyof typeof labelToIconMapping)[];
  keywords: string[];
  image: string;
  featured?: boolean;
}

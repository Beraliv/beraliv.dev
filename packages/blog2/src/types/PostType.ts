import { LabelType } from "./LabelType";
import { UnsanitisedString } from "./UnsanitisedString";

export interface PostType {
  title: UnsanitisedString;
  rawDate: string;
  date: string;
  slug: string;
  description: string;
  content: string;
  labels: LabelType[];
  keywords: string[];
  image: string;
  featured?: boolean;
}

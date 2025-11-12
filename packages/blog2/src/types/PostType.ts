import { LabelType } from "./LabelType";
import { UnsanitisedString } from "./UnsanitisedString";

export interface PostType {
  content: string;
  date?: string;
  description: string;
  featured?: boolean;
  image: string;
  keywords: string[];
  labels: LabelType[];
  rawDate: string;
  slug: string;
  title: UnsanitisedString;
}

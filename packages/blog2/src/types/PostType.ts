import { LabelType } from "./LabelType";
import { UnsanitisedString } from "./UnsanitisedString";

export interface PostType {
  content: string;
  created: string;
  description: string;
  featured?: boolean;
  image: string;
  keywords: string[];
  labels: LabelType[];
  rawCreated: string;
  rawUpdated: string;
  slug: string;
  title: UnsanitisedString;
  updated: string;
}

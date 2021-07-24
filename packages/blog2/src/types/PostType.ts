export interface PostType {
  title: string;
  date: string;
  slug: string;
  description: string;
  content: string;
  labels: string[];
  keywords: string[];
  image: string;
  featured?: boolean;
}

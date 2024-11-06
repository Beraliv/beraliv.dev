interface MarkdownAttributes {
  date: string;
  description: string;
  image: string;
  keywords: string[];
  labels: string[];
  title: string;
}

export interface ParsedMarkdown {
  attributes: MarkdownAttributes;
  body: string;
}

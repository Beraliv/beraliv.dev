import { ParsedMarkdown } from "../../types/ParsedMarkdown";
import { htmlToJSX } from "../../utils/htmlToJsx.client";
import { Footer } from "../Footer";
import { Header } from "../Header";

interface PostProps {
  markdown: ParsedMarkdown;
}

export const Post = ({ markdown }: PostProps) => {
  const attributes = markdown.attributes;

  return (
    <div className="layout">
      <Header />
      <h2>{attributes.title}</h2>
      {htmlToJSX(markdown.body)}
      <Footer />
    </div>
  );
};

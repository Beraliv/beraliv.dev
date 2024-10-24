import { htmlToJSX } from "../../utils/htmlToJsx";
import { Footer } from "../Footer";
import { Header } from "../Header";

interface PostProps {
  html: string;
}

export const Post = ({ html }: PostProps) => (
  <div className="layout">
    <Header />
    <main>{htmlToJSX(html)}</main>
    <Footer />
  </div>
);

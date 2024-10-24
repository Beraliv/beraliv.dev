import { Footer } from "../Footer";
import { Header } from "../Header";

const getArticleId = (): string | null => {
  const match = location.pathname.match(/\/blog\/(.*)/);

  if (match) {
    return match[1];
  }

  return null;
};

const MainContent = () => {
  const articleId = getArticleId();

  return <h2>{articleId}</h2>;
};

export const Post = () => (
  <div className="layout">
    <Header />
    <MainContent />
    <Footer />
  </div>
);

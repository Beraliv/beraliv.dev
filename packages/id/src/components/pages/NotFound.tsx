import { Footer } from "../Footer";
import { Header } from "../Header";

const MainContent = () => (
  <>
    <h1>404</h1>
    <p>Page not found.</p>
  </>
);

export const NotFound = () => (
  <div className="layout">
    <Header />
    <MainContent />
    <Footer />
  </div>
);

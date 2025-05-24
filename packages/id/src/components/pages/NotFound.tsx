import { Footer } from "../Footer";
import { Header } from "../Header";

const MainContent = () => (
  // @ts-expect-error: Fragment is not recognised in this context
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

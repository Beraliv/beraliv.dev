import { Footer } from "../Footer";
import { Header } from "../Header";
import { Link, TextLinkProps } from "../Link";

type SnippetProps = TextLinkProps & {
  description: string;
  time: string;
};

const Snippet = ({ href, text, description, external, time }: SnippetProps) => (
  <article className="snippet">
    <div className="row">
      <Link href={href} text={text} external={external} />
      <time>{time}</time>
    </div>
    <p>{description}</p>
  </article>
);

const MainContent = () => (
  <main>
    <header>
      <h1>Snippets</h1>

      <p>Tools and scripts that I created to solve small problems.</p>
    </header>

    <br />

    <section>
      <div>
        <Snippet
          description="Converting enum to object and type alias in TypeScript"
          href="/snippets/enum-converter"
          text="enum-converter"
          time="24.05.2025"
        />
      </div>
    </section>
  </main>
);

export const Snippets = () => (
  <div className="layout">
    <Header />
    <MainContent />
    <Footer />
  </div>
);

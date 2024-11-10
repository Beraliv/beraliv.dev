import { Footer } from "../Footer";
import { Header } from "../Header";
import { Link, TextLinkProps } from "../Link";

type ProjectProps = TextLinkProps & {
  description: string;
  time: string;
};

const Project = ({ href, text, description, external, time }: ProjectProps) => (
  <article className="project">
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
      <h1>Projects</h1>

      <p>
        Occasionally, solving specific challenges in my projects gives ideas
        that evolve into independent projects outside of working hours. I'm
        proud to share these with broader Open-Source community.
      </p>
    </header>

    <br />

    <section className="projects">
      <div>
        <Project
          href="https://github.com/ts-essentials/ts-essentials"
          text="ts-essentials"
          description="TypeScript utility library that offers advanced types, enabling developers to build more reliable, maintainable codebase."
          external
          time="2021 - now"
        />
        <Project
          href="https://github.com/nanoutils/nanoutils"
          text="nanoutils [archived]"
          description="JavaScript utility library for functional programming, with the focus on the bundle size"
          external
          time="2018 - 2021"
        />
      </div>
    </section>
  </main>
);

export const Projects = () => (
  <div className="layout">
    <Header />
    <MainContent />
    <Footer />
  </div>
);

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
          description="A glossary of video-related terms, concepts, and technologies."
          external
          href="http://video-glossary.beraliv.com"
          text="video-glossary"
          time="2025 - now"
        />
        <Project
          description="Interactive website, helping engineers understand, how they can convert one type to another in TypeScript, with examples and links to TypeScript playground."
          external
          href="http://ts-conversion.beraliv.com"
          text="ts-conversion"
          time="2024 - now"
        />
        <Project
          description="TypeScript utility library that offers advanced types, enabling developers to build more reliable, maintainable codebase."
          external
          href="https://github.com/ts-essentials/ts-essentials"
          text="ts-essentials"
          time="2021 - now"
        />
        <Project
          description="JavaScript utility library for functional programming, with the focus on the bundle size"
          external
          href="https://github.com/nanoutils/nanoutils"
          text="nanoutils [archived]"
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

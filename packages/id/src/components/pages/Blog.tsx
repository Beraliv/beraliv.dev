import { Footer } from "../Footer";
import { Header } from "../Header";
import { Link, TextLinkProps } from "../Link";

type ArticleProps = TextLinkProps & {
  publisher: string;
  time: string;
};

const Article = ({ href, text, external, time, publisher }: ArticleProps) => (
  <article>
    <div>
      <Link href={href} text={text} external={external} />
      <p className="publisher">{publisher}</p>
    </div>
    <time>{time}</time>
  </article>
);

const MainContent = () => (
  <main>
    <header>
      <h1>Blog</h1>

      <p>
        I share the solutions to the challenges I encounter, both at work and in
        my free time, whether they involve front-end development or building a
        reliable video player.
      </p>
    </header>

    <br />

    <section className="posts">
      <h2>2025</h2>
      <div>
        <Article
          href="https://blog.beraliv.dev/2025-04-23-how-i-earned-uk-global-talent-visa"
          text="How I Earned the UK Global Talent Visa (Exceptional Talent)"
          publisher="blog.beraliv.dev"
          external
          time="Apr 23"
        />
      </div>

      <br />

      <h2>2024</h2>
      <div>
        <Article
          href="https://hackernoon.com/the-scrollbar-customization-in-css-and-js-2024-update"
          text="The Scrollbar Customization in CSS and JS (2024 Update)"
          publisher="HackerNoon"
          external
          time="Jun 07"
        />
        <Article
          href="https://habr.com/ru/articles/808015/"
          text="What if Get Function in Lodash inferred types for you in TypeScript (in Russian)"
          publisher="Habr"
          external
          time="Apr 16"
        />
      </div>

      <br />

      <h2>2023</h2>
      <div>
        <Article
          href="https://blog.beraliv.dev/2023-12-21-story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes"
          text="A story of an unknown low-tier device and its MSE issues / London Video Tech 2023 notes"
          publisher="blog.beraliv.dev"
          external
          time="Dec 21"
        />
      </div>

      <br />

      <h2>2022</h2>
      <div>
        <Article
          href="https://blog.beraliv.dev/2022-09-10-with-or-without-enums"
          text="With or without enums in TypeScript"
          publisher="blog.beraliv.dev"
          external
          time="Sep 10"
        />
        <Article
          href="https://blog.beraliv.dev/2022-07-14-camel-case"
          text="Transform string literal type into camelCase in TypeScript"
          publisher="blog.beraliv.dev"
          external
          time="Jul 14"
        />
      </div>

      <br />

      <h2>2021</h2>
      <div>
        <Article
          href="https://blog.beraliv.dev/2021-12-10-advanced-types-holyjs-notes"
          text="Advanced types / Holy.js 2021 notes"
          publisher="blog.beraliv.dev"
          external
          time="Dec 10"
        />
        <Article
          href="https://blog.beraliv.dev/2021-05-07-opaque-type-in-typescript"
          text="Opaque Types in TypeScript"
          publisher="blog.beraliv.dev"
          external
          time="May 07"
        />
        <Article
          href="https://blog.beraliv.dev/2021-03-26-typed-get"
          text="Type-safe get function that extracts the value by paths in TypeScript"
          publisher="blog.beraliv.dev"
          external
          time="Mar 26"
        />
      </div>

      <br />

      <h2>2020</h2>
      <div>
        <Article
          href="https://beraliv.medium.com/research-joyn-scripts-obfuscation-d33b0e64f86d"
          text="Research Joyn scripts obfuscation"
          publisher="Medium"
          external
          time="May 04"
        />
      </div>

      <br />

      <h2>2019</h2>
      <div>
        <Article
          href="https://beraliv.medium.com/bbc-iplayer-geolocation-identification-636830e720d0"
          text="BBC iPlayer geolocation identification"
          publisher="Medium"
          external
          time="Dec 22"
        />
      </div>
    </section>
  </main>
);

export const Blog = () => (
  <div className="layout">
    <Header />
    <MainContent />
    <Footer />
  </div>
);

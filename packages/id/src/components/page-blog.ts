import { footer } from "./footer";
import { header } from "./header";
import { link, TextLinkProps } from "./link";

type ArticleProps = TextLinkProps & {
  time: string;
};

const article = ({ href, text, external, time }: ArticleProps) => `
    <article>
        ${link({
          href,
          text,
          external,
        })}
        <time>${time}</time>
    </article>
`;

const mainContent = `
    <main>
        <header>
            <h1>Blog</h1>

            <p>
                I share the solutions to the challenges I encounter, both at work and in my free time, whether they involve front-end development or building a reliable video player.
            </p>
        </header>

        <br />

        <section class="posts">
            <h2>2024</h2>
            <div>
                ${article({
                  href: "https://hackernoon.com/the-scrollbar-customization-in-css-and-js-2024-update",
                  text: "The Scrollbar Customization in CSS and JS (2024 Update)",
                  external: true,
                  time: "Jun 07",
                })}
                ${article({
                  href: "https://habr.com/ru/articles/808015/",
                  text: "What if Get Function in Lodash inferred types for you in TypeScript (in Russian)",
                  external: true,
                  time: "Apr 16",
                })}
            </div>

            <br />

            <h2>2023</h2>
            <div>
                ${article({
                  href: "https://blog.beraliv.dev/2023-12-21-story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes",
                  text: "A story of an unknown low-tier device and its MSE issues / London Video Tech 2023 notes",
                  external: true,
                  time: "Dec 21",
                })}
            </div>

            <br />

            <h2>2022</h2>
            <div>
                ${article({
                  href: "https://blog.beraliv.dev/2022-09-10-with-or-without-enums",
                  text: "With or without enums in TypeScript",
                  external: true,
                  time: "Sep 10",
                })}
                ${article({
                  href: "https://blog.beraliv.dev/2022-07-14-camel-case",
                  text: "Transform string literal type into camelCase in TypeScript",
                  external: true,
                  time: "Jul 14",
                })}
            </div>

            <br />

            <h2>2021</h2>
            <div>
                ${article({
                  href: "https://blog.beraliv.dev/2021-12-10-advanced-types-holyjs-notes",
                  text: "Advanced types / Holy.js 2021 notes",
                  external: true,
                  time: "Dec 10",
                })}
                ${article({
                  href: "https://blog.beraliv.dev/2021-05-07-opaque-type-in-typescript",
                  text: "Opaque Types in TypeScript",
                  external: true,
                  time: "May 07",
                })}
                ${article({
                  href: "https://blog.beraliv.dev/2021-03-26-typed-get",
                  text: "Type-safe get function that extracts the value by paths in TypeScript",
                  external: true,
                  time: "Mar 26",
                })}
            </div>

            <br />

            <h2>2020</h2>
            <div>
                ${article({
                  href: "https://beraliv.medium.com/research-joyn-scripts-obfuscation-d33b0e64f86d",
                  text: "Research Joyn scripts obfuscation",
                  external: true,
                  time: "May 04",
                })}
            </div>

            <br />

            <h2>2019</h2>
            <div>
                ${article({
                  href: "https://beraliv.medium.com/bbc-iplayer-geolocation-identification-636830e720d0",
                  text: "BBC iPlayer geolocation identification",
                  external: true,
                  time: "Dec 22",
                })}
            </div>
        </section>
    </main>
`;

export const blogPage = `
    <div class="layout">
    ${header}
    ${mainContent}
    ${footer}
    </div>
`;

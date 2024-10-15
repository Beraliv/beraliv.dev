import { link } from "./link";

export const header = `
<header class="header">
    <div class="home">
        ${link({
          href: "/",
          text: "Alexey Berezin",
        })}
    </div>
    <nav>
        <ul class="nav">
            <li>${link({
              href: "https://blog.beraliv.dev/",
              text: "Blog",
            })}</li>
        </ul>
    </nav>
</header>
`;

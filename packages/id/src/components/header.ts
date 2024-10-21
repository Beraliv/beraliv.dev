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
          href: "/blog",
          text: "Blog",
        })}</li>
				<li>${link({
          href: "https://drive.google.com/file/d/1IhM7brsm04_mQx_DrIIa3Tj9w-6Rd3l4/view",
          text: "CV",
          external: true,
        })}</li>
			</ul>
		</nav>
	</header>
`;

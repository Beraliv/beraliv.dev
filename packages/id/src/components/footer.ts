import linkedinSvg from "../../public/linkedin.svg?raw";
import githubSvg from "../../public/github.svg?raw";
import xSvg from "../../public/x.svg?raw";
import npmSvg from "../../public/npm.svg?raw";
import { link } from "./link";

export const footer = `
	<footer class="footer">
		<p>© ${new Date().getFullYear()} Alexey Berezin</p>
		<ul class="social">
			<li>${link({
        href: "https://www.linkedin.com/in/beraliv/",
        logo: linkedinSvg,
      })}</li>
			<li>${link({
        href: "https://github.com/Beraliv/",
        logo: githubSvg,
      })}</li>
			<li>${link({
        href: "https://x.com/beraliv/",
        logo: xSvg,
      })}</li>
			<li>${link({
        href: "https://www.npmjs.com/~beraliv/",
        logo: npmSvg,
      })}</li>
		</ul>
	</footer>
`;

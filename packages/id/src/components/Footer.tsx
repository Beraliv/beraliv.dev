import linkedinSvg from "./svgs/linkedin.svg?raw";
import githubSvg from "./svgs/github.svg?raw";
import xSvg from "./svgs/x.svg?raw";
import npmSvg from "./svgs/npm.svg?raw";
import { Link } from "./Link";

export const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} Alexey Berezin</p>
    <ul className="social">
      <li>
        <Link href="https://www.linkedin.com/in/beraliv/" logo={linkedinSvg} />
      </li>
      <li>
        <Link href="https://github.com/Beraliv/" logo={githubSvg} />
      </li>
      <li>
        <Link href="https://x.com/beraliv/" logo={xSvg} />
      </li>
      <li>
        <Link href="https://www.npmjs.com/~beraliv/" logo={npmSvg} />
      </li>
    </ul>
  </footer>
);

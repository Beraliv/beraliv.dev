import { Link } from "./Link";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { XIcon } from "./icons/XIcon";
import { NpmIcon } from "./icons/NpmIcon";

export const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} Alexey Berezin</p>
    <ul className="social">
      <li>
        <Link
          href="https://www.linkedin.com/in/beraliv/"
          logo={<LinkedInIcon />}
        />
      </li>
      <li>
        <Link href="https://github.com/Beraliv/" logo={<GithubIcon />} />
      </li>
      <li>
        <Link href="https://x.com/beraliv/" logo={<XIcon />} />
      </li>
      <li>
        <Link href="https://www.npmjs.com/~beraliv/" logo={<NpmIcon />} />
      </li>
    </ul>
  </footer>
);

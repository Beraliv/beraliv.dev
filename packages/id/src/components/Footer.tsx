import { Link } from "./Link";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { XIcon } from "./icons/XIcon";
import { NpmIcon } from "./icons/NpmIcon";
import { LeetcodeIcon } from "./icons/LeetcodeIcon";

export const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} Alexey Berezin</p>
    <ul className="social">
      <li>
        <Link href="https://linkedin.com/in/beraliv/" logo={<LinkedInIcon />} />
      </li>
      <li>
        <Link href="https://github.com/Beraliv/" logo={<GithubIcon />} />
      </li>
      <li>
        <Link href="https://leetcode.com/u/beraliv/" logo={<LeetcodeIcon />} />
      </li>
      <li>
        <Link href="https://npmjs.com/~beraliv/" logo={<NpmIcon />} />
      </li>
      <li>
        <Link href="https://x.com/beraliv/" logo={<XIcon />} />
      </li>
    </ul>
  </footer>
);

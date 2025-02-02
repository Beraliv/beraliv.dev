import { Link } from "./Link";

export const Header = () => (
  <header className="header">
    <div className="home">
      <Link href="/" text="Alexey Berezin" />
    </div>
    <nav>
      <ul className="nav">
        <li>
          <Link href="/blog" text="Blog" />
        </li>
        <li>
          <Link href="/projects" text="Projects" />
        </li>
        <li>
          <Link
            href="https://drive.google.com/file/d/1pUmwQFVBVxTsA3g1WTDnA1jwL4M-3XL2/view?usp=sharing"
            text="CV"
            external
          />
        </li>
      </ul>
    </nav>
  </header>
);

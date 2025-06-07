import { Link } from "./Link";

export const Header = () => (
  <header className="header">
    <div className="home">
      <Link href="/" text="Alexey Berezin" />
    </div>
    <nav>
      <ul className="nav">
        <li>
          {/* For testing purposes only */}
          {/* <Link href="http://localhost:3000/" text="Blog" external /> */}
          {/* <Link href="http://blog.beraliv.dev/" text="Blog" external /> */}
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

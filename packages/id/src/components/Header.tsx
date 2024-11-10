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
            href="https://drive.google.com/file/d/1IhM7brsm04_mQx_DrIIa3Tj9w-6Rd3l4/view"
            text="CV"
            external
          />
        </li>
      </ul>
    </nav>
  </header>
);

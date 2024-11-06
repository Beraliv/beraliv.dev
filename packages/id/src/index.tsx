import "./style.css";
import { ParsedMarkdown } from "./types/ParsedMarkdown";
import { render } from "./utils/render";

const getPostId = (): string | null => {
  const match = location.pathname.match(/\/blog\/(.*)/);

  if (match) {
    return match[1];
  }

  return null;
};

const routes = {
  "/": async () => (await import("./components/pages/About")).About,
  "/404": async () => (await import("./components/pages/NotFound")).NotFound,
  "/blog": async () => (await import("./components/pages/Blog")).Blog,
  "/blog/*": async () => {
    const postId = getPostId();
    const [{ Post }, markdown] = await Promise.all([
      import("./components/pages/Post"),
      import(`./content/${postId}.md`) as Promise<ParsedMarkdown>,
    ]);

    return () => <Post markdown={markdown} />;
  },
};

type Route = keyof typeof routes;

const matchRoute = (pathname: string): Route => {
  if (pathname === "/") {
    return "/";
  }

  if (pathname === "/blog") {
    return "/blog";
  }

  if (/\/blog\/.*/.test(pathname)) {
    return "/blog/*";
  }

  return "/404";
};

const router = async () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const pathname = window.location.pathname;
  const route = matchRoute(pathname);
  const loadPage = routes[route];
  const Page = await loadPage();
  render(<Page />, app);
};

window.addEventListener("load", router);

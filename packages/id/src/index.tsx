import "./style.css";
import { render } from "./utils/render";

const routes = {
  "/": async () => (await import("./components/pages/About")).About,
  "/404": async () => (await import("./components/pages/NotFound")).NotFound,
  "/blog": async () => (await import("./components/pages/Blog")).Blog,
  "/blog/*": async () => (await import("./components/pages/Post")).Post,
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
  const loadPage: () => Promise<() => JSX.Element> = routes[route];
  const Page = await loadPage();
  render(<Page />, app);
};

window.addEventListener("load", router);

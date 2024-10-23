import "./style.css";
import { render } from "./utils/render";

const routes = {
  "/": async () => (await import("./components/pages/About")).About,
  "/404": async () => (await import("./components/pages/NotFound")).NotFound,
  "/blog": async () => (await import("./components/pages/Blog")).Blog,
};

type Route = keyof typeof routes;

const router = async () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const route = window.location.pathname as Route;
  const loadPage: () => Promise<() => JSX.Element> =
    routes[route] || routes["/404"];
  const Page = await loadPage();
  render(<Page />, app);
};

window.addEventListener("load", router);

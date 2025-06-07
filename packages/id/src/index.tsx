import "./style.css";
import { render } from "./utils/render";

const routes = {
  "/": async () => (await import("./components/pages/About")).About,
  "/404": async () => (await import("./components/pages/NotFound")).NotFound,
  "/blog": async () => (await import("./components/pages/Blog")).Blog,
  "/projects": async () =>
    (await import("./components/pages/Projects")).Projects,
  "/snippets": async () =>
    (await import("./components/pages/Snippets")).Snippets,
  "/snippets/enum-converter": async () =>
    (await import("./components/pages/EnumConverterSnippet"))
      .EnumConverterSnippet,
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

const handleShortcuts = (event: KeyboardEvent) => {
  const isControlAndShiftKeyPressed =
    (event.metaKey || event.ctrlKey) && event.shiftKey;

  if (event.key === "s" && isControlAndShiftKeyPressed) {
    event.preventDefault();
    window.location.href = "/snippets";
  } else if (event.key === "b" && isControlAndShiftKeyPressed) {
    event.preventDefault();
    window.location.href = "/blog";
  } else if (event.key === "p" && isControlAndShiftKeyPressed) {
    event.preventDefault();
    window.location.href = "/projects";
  }
};

window.addEventListener("load", router);
window.addEventListener("keydown", handleShortcuts);

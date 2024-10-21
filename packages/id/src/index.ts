import "./style.css";

const routes = {
  "/": async () => (await import("./components/page-about")).aboutPage,
  "/404": async () => (await import("./components/page-404")).page404,
  "/blog": async () => (await import("./components/page-blog")).blogPage,
};

type Route = keyof typeof routes;

const router = async () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const route = window.location.pathname as Route;
  const loadPage: () => Promise<string> = routes[route] || routes["/404"];
  const page = await loadPage();
  app.innerHTML = page;
};

window.addEventListener("load", router);

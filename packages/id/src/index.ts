import { aboutPage } from "./components/page-about";
import { blogPage } from "./components/page-blog";
import { page404 } from "./components/page-404";
import "./style.css";

const routes = {
  "/": aboutPage,
  "/404": page404,
  "/blog": blogPage,
};

type Route = keyof typeof routes;

const router = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const route = window.location.pathname as Route;
  app.innerHTML = routes[route] || routes["/404"];
};

window.addEventListener("load", router);

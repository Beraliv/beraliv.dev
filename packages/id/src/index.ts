import { aboutPage } from "./components/page-about";
import { page404 } from "./components/page-404";
import "./style.css";

const routes = {
  "/": aboutPage,
  "/blog": null,
  "/404": page404,
};

type Route = keyof typeof routes;

const router = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const route = window.location.pathname as Route;
  if (route === "/blog") {
    location.href = "https://blog.beraliv.dev/";
  } else {
    app.innerHTML = routes[route] || routes["/404"];
  }
};

window.addEventListener("load", router);

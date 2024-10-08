import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <main>
          <div class="home">
            <a href="/">beraliv</a>
          </div>
          <a href="/blog">Blog</a>
          <a href="/snippets">Snippets</a>
          <a href="/uses">Uses</a>
          <a href="/about">About</a>
          <Suspense>{props.children}</Suspense>
        </main>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

import { createEffect, createSignal } from "solid-js";
import { fetchBlogStats, BlogStats } from "../utils/fetchBlogStats";
import styles from "./Blog.module.css";
import { Spinner } from "../components/Spinner";
import { PlausibleIcon } from "../components/PlausibleIcon";

const PLAUSIBLE_API_KEY = import.meta.env.VITE_PLAUSIBLE_API_KEY || "";

export const Blog = () => {
  const [stats, setStats] = createSignal<BlogStats | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(() => {
    if (!PLAUSIBLE_API_KEY) {
      setError("Plausible API key not configured");
      setLoading(false);
      return;
    }

    fetchBlogStats({
      apiKey: PLAUSIBLE_API_KEY,
      updateState: (state) => {
        setLoading(state.type === "loading");
        if (state.type === "success") {
          setStats(state.stats);
          setError(null);
        } else if (state.type === "error") {
          setStats(null);
          setError(state.message);
        }
      },
    });
  });

  let cachedError: string | null;
  let cachedStats: BlogStats | null;

  return (
    <div class={styles.blogWidget}>
      <a
        class={styles.blogLink}
        href="https://plausible.io/blog.beraliv.dev?period=all&keybindHint=A"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class={styles.plausibleIcon}>
          <PlausibleIcon />
        </div>
        {loading() && (
          <div class={styles.spinner}>
            <Spinner />
          </div>
        )}
        {(cachedError = error()) && (
          <p style={{ color: "red" }}>Error: {cachedError}</p>
        )}
        {(cachedStats = stats()) && (
          <div>
            <div class={styles.website}>
              <span class={styles.websiteKey}>blog.beraliv.dev</span>
            </div>
            <div class={styles.pageviews}>
              <span class={styles.pageviewsKey}>Total Pageviews</span>{" "}
              <span class={styles.pageviewsValue}>
                {cachedStats.pageviews.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

import { createEffect, createSignal } from "solid-js";
import {
  fetchTsEssentialsStats,
  TsEssentialsStats,
} from "../utils/fetchTsEssentialsStats";
import styles from "./TsEssentials.module.css";
import { Spinner } from "../components/Spinner";
import { GitHubIcon } from "../components/GitHubIcon";

export const TsEssentials = () => {
  const [stats, setStats] = createSignal<TsEssentialsStats | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(() => {
    fetchTsEssentialsStats({
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
  let cachedStats: TsEssentialsStats | null;

  return (
    <div class={styles.tsEssentialsWidget}>
      <a
        class={styles.githubLink}
        href="https://github.com/ts-essentials/ts-essentials"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class={styles.header}>
          <div class={styles.githubIcon}>
            <GitHubIcon />
          </div>
          <span>ts-essentials</span>
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
            <div class={styles.contributions}>
              <span class={styles.contributionsKey}>Contributions</span>{" "}
              <span class={styles.contributionsValue}>
                {cachedStats.contributions.toLocaleString()}
              </span>
            </div>
            <div class={styles.stats}>
              <div class={styles.stars}>
                <span class={styles.starsKey}>Starred</span>{" "}
                <span class={styles.starsValue}>
                  {cachedStats.stars.toLocaleString()}
                </span>
              </div>
              <div class={styles.downloads}>
                <span class={styles.downloadsKey}>Monthly Downloads</span>{" "}
                <span class={styles.downloadsValue}>
                  {cachedStats.monthlyDownloads.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

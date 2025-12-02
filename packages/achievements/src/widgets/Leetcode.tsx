import { createEffect, createSignal } from "solid-js";
import { fetchLeetCodeStats, LeetCodeStats } from "../utils/fetchLeetcodeStats";
import styles from "./Leetcode.module.css";
import { LeetcodeIcon } from "../components/LeetcodeIcon";
import { Spinner } from "../components/Spinner";

export const Leetcode = () => {
  const [stats, setStats] = createSignal<LeetCodeStats | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(() => {
    fetchLeetCodeStats("beraliv", {
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
  let cachedStats: LeetCodeStats | null;

  return (
    <div class={styles.leetcodeWidget}>
      <a
        class={styles.leetcodeLink}
        href="https://leetcode.com/u/beraliv/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class={styles.leetcodeIcon}>
          <LeetcodeIcon />
        </div>
        {loading() && <div class={styles.spinner}><Spinner /></div>}
        {(cachedError = error()) && (
          <p style={{ color: "red" }}>Error: {cachedError}</p>
        )}
        {(cachedStats = stats()) && (
          <div>
            <div class={styles.rank}>
              <span class={styles.rankKey}>Rank</span>{" "}
              <span class={styles.rankValue}>
                {cachedStats.ranking.toLocaleString()}
              </span>
            </div>
            <div class={styles.solved}>
              <div class={styles.easy}>
                <span class={styles.easyKey}>Easy</span>{" "}
                <span class={styles.easyValue}>
                  {cachedStats.easySolved}/{cachedStats.easyTotal}
                </span>
              </div>
              <div class={styles.medium}>
                <span class={styles.mediumKey}>Med.</span>{" "}
                <span class={styles.mediumValue}>
                  {cachedStats.mediumSolved}/{cachedStats.mediumTotal}
                </span>
              </div>
              <div class={styles.hard}>
                <span class={styles.hardKey}>Hard</span>{" "}
                <span class={styles.hardValue}>
                  {cachedStats.hardSolved}/{cachedStats.hardTotal}
                </span>
              </div>
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

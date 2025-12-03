import { createEffect, createSignal, onCleanup } from "solid-js";
import {
  fetchSpotifyNowPlaying,
  SpotifyNowPlaying,
} from "../utils/fetchSpotifyNowPlaying";
import styles from "./Spotify.module.css";
import { Spinner } from "../components/Spinner";
import { SpotifyIcon } from "../components/SpotifyIcon";

const REFRESH_INTERVAL = 30000; // Refresh every 30 seconds

export const Spotify = () => {
  const [nowPlaying, setNowPlaying] = createSignal<SpotifyNowPlaying | null>(
    null
  );
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchData = () => {
    fetchSpotifyNowPlaying({
      updateState: (state) => {
        // do not show spinner when data is available
        if (loading()) {
          setLoading(state.type === "loading");
        }
        if (state.type === "success") {
          setNowPlaying(state.data);
          setError(null);
        } else if (state.type === "error") {
          setNowPlaying(null);
          setError(state.message);
        }
      },
    });
  };

  createEffect(() => {
    fetchData();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchData, REFRESH_INTERVAL);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class={styles.spotifyWidget}>
      <a
        class={styles.spotifyLink}
        href={nowPlaying()?.songUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class={styles.header}>
          <div class={styles.spotifyIcon}>
            <SpotifyIcon />
          </div>
          <span>Spotify</span>
        </div>
        {loading() && (
          <div class={styles.spinner}>
            <Spinner />
          </div>
        )}
        {error() && (
          <div class={styles.error}>
            <p>Error: {error()}</p>
          </div>
        )}
        {!loading() && !error() && !nowPlaying() && (
          <div class={styles.notPlaying}>
            <span class={styles.spotifyIcon}>🎵</span>
            <p>Not playing</p>
          </div>
        )}
        {nowPlaying() && (
          <div class={styles.nowPlaying}>
            <div class={styles.albumCover}>
              <img
                src={nowPlaying()?.albumImageUrl}
                alt={nowPlaying()?.album}
                class={styles.albumImage}
              />
              {nowPlaying()?.isPlaying && (
                <div class={styles.playingIndicator}>
                  <div class={styles.bar}></div>
                  <div class={styles.bar}></div>
                  <div class={styles.bar}></div>
                </div>
              )}
            </div>
            <div class={styles.songInfo}>
              <div class={styles.title}>{nowPlaying()?.title}</div>
              <div class={styles.artist}>{nowPlaying()?.artist}</div>
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

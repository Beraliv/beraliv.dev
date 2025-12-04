import { createEffect, createSignal, onCleanup } from "solid-js";
import { fetchWeather, WeatherData } from "../utils/fetchWeather";
import styles from "./Weather.module.css";
import { Spinner } from "../components/Spinner";
import openWeatherIconUrl from "../components/openWeatherIcon.png";

const REFRESH_INTERVAL = 600000; // Refresh every 10 minutes

export const Weather = () => {
  const [weather, setWeather] = createSignal<WeatherData | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchData = () => {
    fetchWeather({
      updateState: (state) => {
        if (loading()) {
          setLoading(state.type === "loading");
        }
        if (state.type === "success") {
          setWeather(state.data);
          setError(null);
        } else if (state.type === "error") {
          setWeather(null);
          setError(state.message);
        }
      },
    });
  };

  createEffect(() => {
    fetchData();

    // Poll for updates every 10 minutes
    const interval = setInterval(fetchData, REFRESH_INTERVAL);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class={styles.weatherWidget}>
      <a
        class={styles.weatherLink}
        href={`https://openweathermap.org/city/${weather()?.location || ""}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class={styles.header}>
          <img
            class={styles.weatherIcon}
            src={openWeatherIconUrl}
            alt="open weather icon"
          />
          <div class={styles.location}>{weather()?.location}</div>
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
        {!loading() && weather() && (
          <div class={styles.weatherContent}>
            <div class={styles.mainInfo}>
              <div class={styles.iconContainer}>
                <img
                  src={`https://openweathermap.org/img/wn/${
                    weather()?.icon
                  }@2x.png`}
                  alt={weather()?.description}
                  class={styles.mainInfoIcon}
                />
              </div>
              <div class={styles.temperature}>
                <span class={styles.temp}>{weather()?.temperature}°</span>
                <span class={styles.condition}>{weather()?.condition}</span>
              </div>
            </div>
            <div class={styles.details}>
              <div class={styles.detailItem}>
                <span class={styles.detailLabel}>Feels like</span>
                <span class={styles.detailValue}>{weather()?.feelsLike}°</span>
              </div>
              <div class={styles.detailItem}>
                <span class={styles.detailLabel}>Humidity</span>
                <span class={styles.detailValue}>{weather()?.humidity}%</span>
              </div>
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

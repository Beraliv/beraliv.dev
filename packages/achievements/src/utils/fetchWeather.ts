export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  condition: string;
  description: string;
  icon: string;
  location: string;
}

interface WeatherAPIResponse {
  temperature: number;
  feelsLike: number;
  humidity: number;
  condition: string;
  description: string;
  icon: string;
  location: string;
}

type WeatherFetchState =
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "success"; data: WeatherData };

interface FetchWeatherOptions {
  updateState: (state: WeatherFetchState) => void;
}

export const fetchWeather = async ({
  updateState,
}: FetchWeatherOptions) => {
  try {
    updateState({ type: "loading" });

    const apiUrl = "/api/weather";

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: WeatherAPIResponse = await response.json();

    updateState({
      type: "success",
      data: {
        temperature: data.temperature,
        feelsLike: data.feelsLike,
        humidity: data.humidity,
        condition: data.condition,
        description: data.description,
        icon: data.icon,
        location: data.location,
      },
    });
  } catch (err) {
    updateState({
      type: "error",
      message:
        err instanceof Error ? err.message : "Failed to fetch weather data",
    });
    console.error("Error fetching weather data:", err);
  }
};

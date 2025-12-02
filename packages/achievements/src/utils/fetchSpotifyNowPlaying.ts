export interface SpotifyNowPlaying {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

interface SpotifyAPIResponse {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  data?: null;
}

type SpotifyFetchState =
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "success"; data: SpotifyNowPlaying | null };

interface FetchSpotifyNowPlayingOptions {
  updateState: (state: SpotifyFetchState) => void;
}

export const fetchSpotifyNowPlaying = async ({
  updateState,
}: FetchSpotifyNowPlayingOptions) => {
  try {
    updateState({ type: "loading" });

    const apiUrl = "/api/spotify";

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data: SpotifyAPIResponse = await response.json();

    if (!data.isPlaying || data.data === null) {
      updateState({
        type: "success",
        data: null,
      });
      return;
    }

    updateState({
      type: "success",
      data: {
        isPlaying: data.isPlaying,
        title: data.title || "",
        artist: data.artist || "",
        album: data.album || "",
        albumImageUrl: data.albumImageUrl || "",
        songUrl: data.songUrl || "",
      },
    });
  } catch (err) {
    updateState({
      type: "error",
      message:
        err instanceof Error
          ? err.message
          : "Failed to fetch Spotify now playing",
    });
    console.error("Error fetching Spotify now playing:", err);
  }
};

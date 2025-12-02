export interface BlogStats {
  pageviews: number;
}

interface PlausibleAggregateResponse {
  results: {
    metrics: [number]
  }[];
}

type BlogFetchState =
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "success"; stats: BlogStats };

interface FetchBlogStatsOptions {
  updateState: (state: BlogFetchState) => void;
  apiKey: string;
}

export const fetchBlogStats = async ({
  updateState,
  apiKey,
}: FetchBlogStatsOptions) => {
  try {
    updateState({ type: "loading" });

    // Fetch Plausible stats for all time
    const response = await fetch("https://plausible.io/api/v2/query", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        site_id: "blog.beraliv.dev",
        metrics: ["pageviews"],
        date_range: "all",
      }),
    });

    if (!response.ok) {
      throw new Error(`Plausible API error: ${response.status}`);
    }

    const data: PlausibleAggregateResponse = await response.json();

    updateState({
      type: "success",
      stats: {
        pageviews: data.results[0].metrics[0],
      },
    });
  } catch (err) {
    updateState({
      type: "error",
      message:
        err instanceof Error ? err.message : "Failed to fetch blog stats",
    });
    console.error("Error fetching blog stats:", err);
  }
};

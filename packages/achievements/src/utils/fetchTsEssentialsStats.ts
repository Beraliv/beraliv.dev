export interface TsEssentialsStats {
  stars: number;
  monthlyDownloads: number;
  contributions: number;
}

interface GitHubRepo {
  stargazers_count: number;
}

interface NpmDownloads {
  downloads: number;
}

interface GitHubSearchResponse {
  total_count: number;
}

type TsEssentialsFetchState =
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "success"; stats: TsEssentialsStats };

interface FetchTsEssentialsStatsOptions {
  updateState: (state: TsEssentialsFetchState) => void;
}

export const fetchTsEssentialsStats = async ({
  updateState,
}: FetchTsEssentialsStatsOptions) => {
  try {
    updateState({ type: "loading" });

    // Fetch GitHub stars, npm downloads, and user contributions in parallel
    const [githubResponse, npmResponse, contributionsResponse] = await Promise.all([
      fetch("https://api.github.com/repos/ts-essentials/ts-essentials"),
      fetch(
        "https://api.npmjs.org/downloads/point/last-month/ts-essentials"
      ),
      fetch(
        "https://api.github.com/search/commits?q=repo:ts-essentials/ts-essentials+author:beraliv",
        {
          headers: {
            Accept: "application/vnd.github.cloak-preview+json",
          },
        }
      ),
    ]);

    if (!githubResponse.ok) {
      throw new Error(`GitHub API error: ${githubResponse.status}`);
    }

    if (!npmResponse.ok) {
      throw new Error(`npm API error: ${npmResponse.status}`);
    }

    if (!contributionsResponse.ok) {
      throw new Error(`GitHub Search API error: ${contributionsResponse.status}`);
    }

    const githubData: GitHubRepo = await githubResponse.json();
    const npmData: NpmDownloads = await npmResponse.json();
    const contributionsData: GitHubSearchResponse = await contributionsResponse.json();

    updateState({
      type: "success",
      stats: {
        stars: githubData.stargazers_count,
        monthlyDownloads: npmData.downloads,
        contributions: contributionsData.total_count,
      },
    });
  } catch (err) {
    updateState({
      type: "error",
      message:
        err instanceof Error
          ? err.message
          : "Failed to fetch ts-essentials stats",
    });
    console.error("Error fetching ts-essentials stats:", err);
  }
};

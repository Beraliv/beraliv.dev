export interface LeetCodeStats {
  ranking: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
}

interface LeetCodeProfile {
  matchedUser: {
    profile: {
      ranking: number;
    };
    submitStatsGlobal: {
      acSubmissionNum: {
        difficulty: string;
        count: number;
      }[];
    };
  };
  allQuestionsCount: {
    difficulty: string;
    count: number;
  }[];
}

type LeetcodeFetchState =
  | { type: "loading" }
  | { type: "error"; message: string }
  | { type: "success"; stats: LeetCodeStats };

interface FetchLeetCodeStatsOptions {
  updateState: (state: LeetcodeFetchState) => void;
}

export const fetchLeetCodeStats = async (
  username: string,
  { updateState }: FetchLeetCodeStatsOptions
) => {
  try {
    updateState({ type: "loading" });

    // LeetCode GraphQL API
    const query = `
      query getUserProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          profile {
            ranking
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    // Use proxy in development, direct URL in production
    const apiUrl = "https://leetcode.com/graphql";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://achievements-eight.vercel.app/",
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: { data: LeetCodeProfile } = await response.json();
    const user = data.data.matchedUser;

    if (!user) {
      throw new Error("User not found");
    }

    const submissions = user.submitStatsGlobal.acSubmissionNum;
    const allProblems = submissions.find((s) => s.difficulty === "All");
    const easy = submissions.find((s) => s.difficulty === "Easy");
    const medium = submissions.find((s) => s.difficulty === "Medium");
    const hard = submissions.find((s) => s.difficulty === "Hard");

    const allQuestions = data.data.allQuestionsCount;
    const easyTotal = allQuestions.find((q) => q.difficulty === "Easy");
    const mediumTotal = allQuestions.find((q) => q.difficulty === "Medium");
    const hardTotal = allQuestions.find((q) => q.difficulty === "Hard");

    updateState({
      type: "success",
      stats: {
        ranking: user.profile.ranking,
        totalSolved: allProblems?.count || 0,
        easySolved: easy?.count || 0,
        mediumSolved: medium?.count || 0,
        hardSolved: hard?.count || 0,
        easyTotal: easyTotal?.count || 0,
        mediumTotal: mediumTotal?.count || 0,
        hardTotal: hardTotal?.count || 0,
      },
    });
  } catch (err) {
    updateState({
      type: "error",
      message:
        err instanceof Error ? err.message : "Failed to fetch LeetCode stats",
    });
    console.error("Error fetching LeetCode stats:", err);
  }
};

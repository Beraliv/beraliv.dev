import { TENNIS_API_MAX_REQUESTS_PER_SECOND } from "../Constants/TENNIS_API_MAX_REQUESTS_PER_SECOND";
import { createRateLimit } from "./RateLimit";

const RAPID_API_HOST = process.env.RAPID_API_HOST;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const TennisApiRateLimit = createRateLimit(TENNIS_API_MAX_REQUESTS_PER_SECOND);

const fetchTennisApi = async (endpoint: string): Promise<Response> => {
  await TennisApiRateLimit.acquire();

  const response = await fetch(
    `https://${RAPID_API_HOST}/api/tennis/${endpoint}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": RAPID_API_HOST,
      },
    }
  );

  TennisApiRateLimit.release();

  return response;
};

export { fetchTennisApi };

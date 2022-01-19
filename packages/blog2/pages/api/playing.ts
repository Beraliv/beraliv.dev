// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getPlaying } from "../../src/functions/getPlaying";
import { PlayingApi } from "../../src/types/PlayingApi";

const playing = async (
  _: NextApiRequest,
  response: NextApiResponse<PlayingApi>
) => {
  const playingStatus = await getPlaying();

  if (playingStatus.isPlaying) {
    response.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30"
    );
  }

  return response.status(200).json(playingStatus);
};

export default playing;

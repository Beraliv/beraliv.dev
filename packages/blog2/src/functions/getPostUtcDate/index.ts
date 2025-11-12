import { Milliseconds } from "../../types/Milliseconds";
import { PostType } from "../../types/PostType";

export const getPostUtcDate = ({
  rawCreated,
}: Pick<PostType, "rawCreated">): Milliseconds => {
  const milliseconds = Date.parse(rawCreated) as Milliseconds;

  if (isNaN(milliseconds)) {
    throw new Error(`Post created date format is incorrect: ${rawCreated}`);
  }

  return milliseconds;
};

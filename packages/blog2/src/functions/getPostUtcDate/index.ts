import { Milliseconds } from "../../types/Milliseconds";
import { PostType } from "../../types/PostType";

export const getPostUtcDate = ({
  rawDate,
}: Pick<PostType, "rawDate">): Milliseconds => {
  const milliseconds = Date.parse(rawDate) as Milliseconds;

  if (isNaN(milliseconds)) {
    throw new Error(`Post date format is incorrect: ${rawDate}`);
  }

  return milliseconds;
};

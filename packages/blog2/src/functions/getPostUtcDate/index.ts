import { Milliseconds } from "../../types/Milliseconds";
import { PostType } from "../../types/PostType";

export const getPostUtcDate = ({
  date,
}: Pick<PostType, "date">): Milliseconds => {
  const milliseconds = Date.parse(date) as Milliseconds;

  if (isNaN(milliseconds)) {
    throw new Error(`Post date format is incorrect: ${date}`);
  }

  return milliseconds;
};

import { validatePost } from "../../validators/validatePost";
import { getAllPosts } from "../getAllPosts";

export function getAllValidatedPostsByCreatedDesc() {
  return getAllPosts()
    .map(({ data, name }) => ({
      ...data,
      slug: name,
    }))
    .sort((a, b) => {
      if (!a.created) return -1;
      if (!b.created) return 1;
      return -a.created.localeCompare(b.created);
    })
    .map(validatePost);
}

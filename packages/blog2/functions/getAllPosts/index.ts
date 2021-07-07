import { readdirSync } from "fs";
import { CONTENT_DIR } from "../../constants/CONTENT_DIR";
import { PostType } from "../../types/PostType";
import { getPostBySlug } from "../getPostBySlug";

export function getAllPosts<K extends keyof PostType>(fields: K[] = []) {
  const slugs = readdirSync(CONTENT_DIR);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1: PostType, post2: PostType) => {
      if (!post1.date || !post2.date) {
        return 0;
      }

      if (post1.date > post2.date) {
        return -1;
      }

      if (post1.date < post2.date) {
        return 1;
      }

      return 0;
    });
  return posts;
}
import { readdirSync } from "fs";
import { CONTENT_DIR } from "../../constants/CONTENT_DIR";
import { getPostBySlug, MetaPostType } from "../getPostBySlug";

export function getAllPosts(): MetaPostType[] {
  const slugs = readdirSync(CONTENT_DIR);
  const posts = slugs.map((slug) => getPostBySlug(slug));
  return posts;
}

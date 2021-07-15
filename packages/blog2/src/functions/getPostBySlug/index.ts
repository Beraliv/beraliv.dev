import { readFileSync } from "fs";
import { join } from "path";
import frontmatter from "gray-matter";
import { CONTENT_DIR } from "../../constants/CONTENT_DIR";
import { PostType } from "../../types/PostType";

export interface MetaPostType {
  content: string;
  data: Partial<PostType>;
  name: string;
}

export const getPostBySlug = (slug: string): MetaPostType => {
  const slugName = slug.replace(/\.md$/, "");
  const fullPath = join(CONTENT_DIR, `${slugName}.md`);
  const fileContents = readFileSync(fullPath, "utf8");
  const { content, data } = frontmatter(fileContents);
  return {
    content,
    data,
    name: slugName,
  };
};

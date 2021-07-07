import { readFileSync } from "fs";
import { join } from "path";
import frontmatter from "gray-matter";
import { CONTENT_DIR } from "../../constants/CONTENT_DIR";
import { PostType } from "../../types/PostType";

export const getPostBySlug = (
  slug: string,
  fields: (keyof PostType)[] = []
): PostType => {
  const slugName = slug.replace(/\.md$/, "");
  const fullPath = join(CONTENT_DIR, `${slugName}.md`);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data, content } = frontmatter(fileContents);

  const items: Partial<PostType> = {};
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slugName;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items as PostType;
};

import { readFileSync } from "fs";
import { join } from "path";
import frontmatter from "gray-matter";
import { CONTENT_DIR } from "../../constants/CONTENT_DIR";

export const getPostBySlug = (slug: string, fields: string[] = []) => {
  const slugName = slug.replace(/\.md$/, "");
  const fullPath = join(CONTENT_DIR, `${slugName}.md`);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data, content } = frontmatter(fileContents);

  const items: Record<string, string> = {};
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

  return items;
};

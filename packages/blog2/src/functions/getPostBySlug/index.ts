import { readFileSync } from "fs";
import { join } from "path";
import frontmatter from "gray-matter";
import { CONTENT_DIR } from "../../constants/CONTENT_DIR";
import { PostType } from "../../../types/PostType";

export const getPostBySlug = <K extends keyof PostType>(
  slug: string,
  fields: K[] = []
): Pick<PostType, K> => {
  const slugName = slug.replace(/\.md$/, "");
  const fullPath = join(CONTENT_DIR, `${slugName}.md`);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data, content } = frontmatter(fileContents);

  const items: Partial<Pick<PostType, K>> = {};
  fields.forEach((field) => {
    if (field === "slug") {
      // @ts-expect-error
      items[field] = slugName;
    }
    if (field === "content") {
      // @ts-expect-error
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items as Pick<PostType, K>;
};

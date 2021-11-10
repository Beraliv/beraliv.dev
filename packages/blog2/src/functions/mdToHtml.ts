import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkUnwrapImages from "remark-unwrap-images";

export const mdToHtml = async (md: string) => {
  const result = await remark()
    .use(remarkUnwrapImages)
    .use(remarkHtml)
    .process(md);

  return result.toString();
};

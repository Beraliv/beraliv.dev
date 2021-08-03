import { remark } from "remark";
import html from "remark-html";

export const mdToHtml = async (md: string) => {
  const result = await remark().use(html).process(md);
  return result.toString();
};

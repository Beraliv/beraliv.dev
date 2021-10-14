import fs from "fs";
import path from "path";
import { getAllPosts } from "../../functions/getAllPosts";
import { validatePost } from "../../validators/validatePost";
import { generateRssXml } from "./generateRssXml";

export const rssMetadata = (): string => {
  const posts = getAllPosts()
    .map(({ data, name }) => ({
      ...data,
      slug: name,
    }))
    .sort((a, b) => {
      if (!a.date) return -1;
      if (!b.date) return 1;
      return -a.date.localeCompare(b.date);
    })
    .map(validatePost);
  const rssXml = generateRssXml(posts);
  return rssXml;
};

const rss = rssMetadata();
fs.writeFileSync(path.join(__dirname, "../../../public/rss.xml"), rss);

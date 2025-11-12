import fs from "fs";
import path from "path";
import { generateRssXml } from "./generateRssXml";
import { getAllValidatedPostsByCreatedDesc } from "../../functions/getAllValidatedPostsByCreatedDesc";

export const rssMetadata = (): string => {
  const posts = getAllValidatedPostsByCreatedDesc();
  const rssXml = generateRssXml(posts);
  return rssXml;
};

const rss = rssMetadata();
fs.writeFileSync(path.join(__dirname, "../../../public/rss.xml"), rss);

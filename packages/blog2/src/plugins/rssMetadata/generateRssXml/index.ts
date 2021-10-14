import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { PROMO_IMAGE } from "../../../constants/PROMO_IMAGE";
import { getPostUtcDate } from "../../../functions/getPostUtcDate";
import { ValidatedPostType } from "../../../types/ValidatedPostType";
import { generateRssXmlItem } from "../generateRssXmlItem";
import { toUtcString } from "../toUtcString";

const { author, summary, url } = BLOG_META_INFO;

export const generateRssXml = (posts: ValidatedPostType[]): string => {
  const utcTimestamps = posts.map((post) => getPostUtcDate(post));
  const latestUtcTimestamp = utcTimestamps.reduce((latest, current) =>
    latest > current ? latest : current
  );

  return `<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title><![CDATA[${author} blog]]></title>
        <description><![CDATA[Hi I'm ${author}, ${summary}.]]></description>
        <link>${url}</link>
        <image>
            <url>${PROMO_IMAGE.url}</url>
            <title>${author} blog</title>
            <link>${url}</link>
        </image>
        <generator>RSS for Node</generator>
        <lastBuildDate>${toUtcString(latestUtcTimestamp)}</lastBuildDate>
        <atom:link href="${url}rss.xml" rel="self" type="application/rss+xml"/>
        <language><![CDATA[en]]></language>
        ${posts.map((post) => generateRssXmlItem(post))}
    </channel>
    </rss>`;
};

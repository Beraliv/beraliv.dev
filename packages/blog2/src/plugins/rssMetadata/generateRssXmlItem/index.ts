import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { getPostUtcDate } from "../../../functions/getPostUtcDate";
import { sanitiseHtml } from "../../../functions/sanitiseHtml";
import { ValidatedPostType } from "../../../types/ValidatedPostType";
import { toUtcString } from "../toUtcString";

const { author } = BLOG_META_INFO;

export const generateRssXmlItem = (post: ValidatedPostType): string => {
  const utcTimestamp = getPostUtcDate(post);
  const link = `https://blog2.beraliv.dev/${post.slug}`;

  return `
        <item>
            <title><![CDATA[${sanitiseHtml(post.title)}]]></title>
            <description><![CDATA[${post.description}]]></description>
            <link>${link}</link>
            <guid isPermaLink="false">${link}</guid>
            <dc:creator><![CDATA[${author}]]></dc:creator>
            <pubDate>${toUtcString(utcTimestamp)}</pubDate>
        </item>
    `;
};

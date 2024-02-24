import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { getPostUtcDate } from "../../../functions/getPostUtcDate";
import { ValidatedPostType } from "../../../types/ValidatedPostType";
import { toUtcString } from "../toUtcString";

const { author, url } = BLOG_META_INFO;

export const generateRssXmlItem = (post: ValidatedPostType): string => {
  const utcTimestamp = getPostUtcDate(post);
  const link = `${url}${post.slug}`;

  return `<item>
            <title><![CDATA[${post.title}]]></title>
            <description><![CDATA[${post.description}]]></description>
            <link>${link}</link>
            <guid isPermaLink="false">${link}</guid>
            <dc:creator><![CDATA[${author}]]></dc:creator>
            <pubDate>${toUtcString(utcTimestamp)}</pubDate>
        </item>`;
};

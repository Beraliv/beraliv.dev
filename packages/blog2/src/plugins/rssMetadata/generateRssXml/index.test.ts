import { expect } from "earl";
import { ValidatedPostType } from "../../../types/ValidatedPostType";
import { generateRssXml } from "./";
import { SanitisedString } from "../../../types/SanitisedString";

const SCROLLBAR_CUSTOMISATION_POST: ValidatedPostType = {
  title: "Scrollbar customisation" as SanitisedString,
  rawDate: "2018-10-04",
  date: "04 Oct 2018",
  description:
    "CSS support in different browser engines, hacks and tricks, JS libraries",
  labels: ["css", "javascript"],
  keywords: ["scrollbar", "customisation", "javascript", "css"],
  image: "/scrollbar-customisation/macos-scrollbar.png",
  slug: "2018-10-04-scrollbar-customisation",
};

const AMAZON_POST: ValidatedPostType = {
  title: "Video player in Amazon" as SanitisedString,
  rawDate: "2019-12-17",
  date: "17 Dec 2019",
  description:
    "From video tag to the implementation, state machine, the way bundle is loaded, bundle names",
  labels: ["player"],
  keywords: ["Amazon Prime", "video player"],
  image: "/amazon-prime-video-player-investigation/amazon-prime-page.png",
  slug: "2019-12-17-amazon-prime-video-player-investigation",
};

describe(generateRssXml.name, () => {
  it("returns xml item for 1 post", () => {
    const actual = generateRssXml([SCROLLBAR_CUSTOMISATION_POST]);
    const expected = `<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title><![CDATA[Alexey Berezin blog]]></title>
        <description><![CDATA[Hi I'm Alexey Berezin, who loves London 🏴󠁧󠁢󠁥󠁮󠁧󠁿, players ⏯ and TypeScript 🦺.]]></description>
        <link>https://blog.beraliv.dev/</link>
        <image>
            <url>https://res.cloudinary.com/beraliv/image/upload/v1633444777/blog_beraliv_dev/banner_v2.png</url>
            <title>Alexey Berezin blog</title>
            <link>https://blog.beraliv.dev/</link>
        </image>
        <generator>RSS for Node</generator>
        <lastBuildDate>Thu, 04 Oct 2018 00:00:00 GMT</lastBuildDate>
        <atom:link href="https://blog.beraliv.dev/rss.xml" rel="self" type="application/rss+xml"/>
        <language><![CDATA[en]]></language>
        <item>
            <title><![CDATA[Scrollbar customisation]]></title>
            <description><![CDATA[CSS support in different browser engines, hacks and tricks, JS libraries]]></description>
            <link>https://blog.beraliv.dev/2018-10-04-scrollbar-customisation</link>
            <guid isPermaLink="false">https://blog.beraliv.dev/2018-10-04-scrollbar-customisation</guid>
            <dc:creator><![CDATA[Alexey Berezin]]></dc:creator>
            <pubDate>Thu, 04 Oct 2018 00:00:00 GMT</pubDate>
        </item>
    </channel>
    </rss>`;

    expect(actual).toEqual(expected);
  });

  it("returns xml item for 2 posts", () => {
    const actual = generateRssXml([SCROLLBAR_CUSTOMISATION_POST, AMAZON_POST]);
    const expected = `<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title><![CDATA[Alexey Berezin blog]]></title>
        <description><![CDATA[Hi I'm Alexey Berezin, who loves London 🏴󠁧󠁢󠁥󠁮󠁧󠁿, players ⏯ and TypeScript 🦺.]]></description>
        <link>https://blog.beraliv.dev/</link>
        <image>
            <url>https://res.cloudinary.com/beraliv/image/upload/v1633444777/blog_beraliv_dev/banner_v2.png</url>
            <title>Alexey Berezin blog</title>
            <link>https://blog.beraliv.dev/</link>
        </image>
        <generator>RSS for Node</generator>
        <lastBuildDate>Tue, 17 Dec 2019 00:00:00 GMT</lastBuildDate>
        <atom:link href="https://blog.beraliv.dev/rss.xml" rel="self" type="application/rss+xml"/>
        <language><![CDATA[en]]></language>
        <item>
            <title><![CDATA[Scrollbar customisation]]></title>
            <description><![CDATA[CSS support in different browser engines, hacks and tricks, JS libraries]]></description>
            <link>https://blog.beraliv.dev/2018-10-04-scrollbar-customisation</link>
            <guid isPermaLink="false">https://blog.beraliv.dev/2018-10-04-scrollbar-customisation</guid>
            <dc:creator><![CDATA[Alexey Berezin]]></dc:creator>
            <pubDate>Thu, 04 Oct 2018 00:00:00 GMT</pubDate>
        </item>
        <item>
            <title><![CDATA[Video player in Amazon]]></title>
            <description><![CDATA[From video tag to the implementation, state machine, the way bundle is loaded, bundle names]]></description>
            <link>https://blog.beraliv.dev/2019-12-17-amazon-prime-video-player-investigation</link>
            <guid isPermaLink="false">https://blog.beraliv.dev/2019-12-17-amazon-prime-video-player-investigation</guid>
            <dc:creator><![CDATA[Alexey Berezin]]></dc:creator>
            <pubDate>Tue, 17 Dec 2019 00:00:00 GMT</pubDate>
        </item>
    </channel>
    </rss>`;

    expect(actual).toEqual(expected);
  });
});

import { UnsanitisedString } from "../../../types/UnsanitisedString";
import { generateRssXml } from "./";

describe(generateRssXml.name, () => {
  test("returns xml item for validated post", () => {
    const actual = generateRssXml([
      {
        title: "Scrollbar cus&shy;tomi&shy;sa&shy;tion" as UnsanitisedString,
        date: "2018-10-04",
        description:
          "CSS support in different browser engines, hacks and tricks, JS libraries",
        labels: ["css", "javascript"],
        keywords: ["scrollbar", "customisation", "javascript", "css"],
        image: "/scrollbar-customisation/macos-scrollbar.png",
        slug: "2018-10-04-scrollbar-customisation",
      },
    ]);
    const expected = `<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title><![CDATA[Alexey Berezin blog]]></title>
        <description><![CDATA[Hi I'm Alexey Berezin, who loves London 🏴󠁧󠁢󠁥󠁮󠁧󠁿, players ⏯ and TypeScript.]]></description>
        <link>https://blog2.beraliv.dev/</link>
        <image>
            <url>https://res.cloudinary.com/beraliv/image/upload/v1633444777/blog_beraliv_dev/banner.png</url>
            <title>Alexey Berezin blog</title>
            <link>https://blog2.beraliv.dev/</link>
        </image>
        <generator>RSS for Node</generator>
        <lastBuildDate>Thu, 04 Oct 2018 00:00:00 GMT</lastBuildDate>
        <atom:link href="https://blog2.beraliv.dev/rss.xml" rel="self" type="application/rss+xml"/>
        <language><![CDATA[en]]></language>
        
        <item>
            <title><![CDATA[Scrollbar customisation]]></title>
            <description><![CDATA[CSS support in different browser engines, hacks and tricks, JS libraries]]></description>
            <link>https://blog2.beraliv.dev/2018-10-04-scrollbar-customisation</link>
            <guid isPermaLink="false">https://blog2.beraliv.dev/2018-10-04-scrollbar-customisation</guid>
            <dc:creator><![CDATA[Alexey Berezin]]></dc:creator>
            <pubDate>Thu, 04 Oct 2018 00:00:00 GMT</pubDate>
        </item>
    
    </channel>
    </rss>`;

    expect(actual).toEqual(expected);
  });
});

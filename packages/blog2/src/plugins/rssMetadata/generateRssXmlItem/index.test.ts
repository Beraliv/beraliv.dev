import { expect } from "earljs";
import { UnsanitisedString } from "../../../types/UnsanitisedString";
import { generateRssXmlItem } from "./";

describe(generateRssXmlItem.name, () => {
  test("returns xml item for validated post", () => {
    const actual = generateRssXmlItem({
      title: "Scrollbar cus&shy;tomi&shy;sa&shy;tion" as UnsanitisedString,
      date: "2018-10-04",
      description:
        "CSS support in different browser engines, hacks and tricks, JS libraries",
      labels: ["css", "javascript"],
      keywords: ["scrollbar", "customisation", "javascript", "css"],
      image: "/scrollbar-customisation/macos-scrollbar.png",
      slug: "2018-10-04-scrollbar-customisation",
    });
    const expected = `<item>
            <title><![CDATA[Scrollbar customisation]]></title>
            <description><![CDATA[CSS support in different browser engines, hacks and tricks, JS libraries]]></description>
            <link>https://blog.beraliv.dev/2018-10-04-scrollbar-customisation</link>
            <guid isPermaLink="false">https://blog.beraliv.dev/2018-10-04-scrollbar-customisation</guid>
            <dc:creator><![CDATA[Alexey Berezin]]></dc:creator>
            <pubDate>Thu, 04 Oct 2018 00:00:00 GMT</pubDate>
        </item>`;

    expect(actual).toEqual(expected);
  });
});

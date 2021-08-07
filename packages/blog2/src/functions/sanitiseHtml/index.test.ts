import { sanitiseHtml } from ".";

describe(sanitiseHtml.name, () => {
  test("removes &shy; from the string", () => {
    const actual = sanitiseHtml("Scrollbar cus&shy;tomi&shy;sa&shy;tion");
    const expected = "Scrollbar customisation";

    expect(actual).toEqual(expected);
  });
});

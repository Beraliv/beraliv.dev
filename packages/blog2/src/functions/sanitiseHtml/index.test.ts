import { sanitiseHtml } from ".";
import { UnsanitisedString } from "../../types/UnsanitisedString";

describe(sanitiseHtml.name, () => {
  test("removes &shy; from the string", () => {
    const actual = sanitiseHtml(
      "Scrollbar cus&shy;tomi&shy;sa&shy;tion" as UnsanitisedString
    );
    const expected = "Scrollbar customisation";

    expect(actual).toEqual(expected);
  });
});

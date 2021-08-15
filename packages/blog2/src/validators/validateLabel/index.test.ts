import { validateLabel } from ".";
import { KNOWN_LABELS } from "../../constants/KNOWN_LABELS";

describe(validateLabel.name, () => {
  KNOWN_LABELS.forEach((label) => {
    test(`returns label as ${label} is known`, () => {
      const actual = validateLabel(label);
      const expected = label;

      expect(actual).toEqual(expected);
    });
  });

  test("throws error if label is unknown", () => {
    expect(() => validateLabel("scala")).toThrow();
  });
});

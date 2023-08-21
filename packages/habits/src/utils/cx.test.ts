import { describe, it, expect } from "vitest";
import { cx } from "./cx";

interface ITestCase {
  input: Parameters<typeof cx>;
  expected: ReturnType<typeof cx>;
}

const testCases: ITestCase[] = [
  {
    input: [],
    expected: "",
  },
  {
    input: ["basic"],
    expected: "basic",
  },
  {
    input: ["basic", "active"],
    expected: "basic active",
  },
  {
    input: [{ turnedOff: false, turnedOn: true }],
    expected: "turnedOn",
  },
  {
    // @ts-expect-error: number isn't supported
    input: [1, 2],
    expected: "",
  },
];

describe(cx.name, () => {
  for (const testCase of testCases) {
    it(`returns ${JSON.stringify(testCase.expected)} for [${testCase.input
      .map((value) => JSON.stringify(value))
      .join(",")}]`, () => {
      const actual = cx(...testCase.input);

      expect(actual).toEqual(testCase.expected);
    });
  }
});

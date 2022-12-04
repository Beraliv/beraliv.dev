import { describe, it, expect } from "vitest";
import { parseJwt } from "./parseJwt";

interface ITestCase {
  input: Parameters<typeof parseJwt>[0];
  response:
    | {
        type: "success";
        expected: ReturnType<typeof parseJwt>;
      }
    | {
        type: "error";
        throws: string;
      };
}

const testCases: ITestCase[] = [
  {
    input:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9zw6kiLCJpYXQiOjE0MjU2NDQ5NjZ9.1CfFtdGUPs6q8kT3OGQSVlhEMdbuX0HfNSqum0023a0",
    response: {
      type: "success",
      expected: { name: "José", iat: 1425644966 },
    },
  },
  {
    input:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc8OpIiwiaWF0IjoxNTE2MjM5MDIyfQ.7A3F5SUH2gbBSYVon5mas_Y-KCrWojorKQg7UKGVEIA",
    response: {
      type: "success",
      expected: { sub: "1234567890", name: "José", iat: 1516239022 },
    },
  },
  {
    input:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSm9z6SIsImlhdCI6MTQyNTY0NDk2Nn0.cpnplCBxiw7Xqz5thkqs4Mo_dymvztnI0CI4BN0d1t8",
    response: {
      type: "error",
      throws: "URI malformed",
    },
  },
  {
    input:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpvc8OpZSIsImlhdCI6MTUxNjIzOTAyMn0.tbjJzDAylkKSV0_YGR5xBJBlFK01C82nZPLIcA3JX1g",
    response: {
      type: "success",
      expected: { sub: "1234567890", name: "Josée", iat: 1516239022 },
    },
  },
  {
    // @ts-expect-error: testing null JWT string
    input: null,
    response: {
      type: "error",
      throws: "Cannot read properties of null (reading 'split')",
    },
  },
  {
    input: "fubar",
    response: {
      type: "error",
      throws: "Cannot read properties of undefined (reading 'replace')",
    },
  },
];

describe(parseJwt.name, () => {
  for (const { input, response } of testCases) {
    if (response.type === "success") {
      it(`returns ${JSON.stringify(response.expected)} for ${input}`, () => {
        const actual = parseJwt(input);
        expect(actual).toEqual(response.expected);
      });
    } else if (response.type === "error") {
      it(`throws ${response.throws}`, () => {
        expect(() => parseJwt(input)).toThrow(response.throws);
      });
    }
  }
});

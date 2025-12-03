import { exampleOne } from "../input-examples/day03-examples";
import { puzzle } from "../input-puzzles/day03-puzzle";
import { formatRow, solveOne, solveTwo } from "../solutions/day03";

describe("day03", () => {
  describe("format row", () => {
    test("should format a row", () => {
      const input = "*.664.598#..";
      const expected = [
        { symbol: false, index: 0, value: 617 },
        { symbol: false, index: 1, value: 617 },
        { symbol: false, index: 2, value: 617 },
        { symbol: true, index: 3, value: 0 },
      ];

      const actual = formatRow(input, 1);

      expect(actual).toEqual(expected);
    });
  });
  describe("solveOne", () => {
    test("solveOne example", () => {
      const actual = solveOne(exampleOne);
      const expected = 4361;

      expect(actual).toEqual(expected);
    });

    test("solveOne puzzle", () => {
      const actual = solveOne(puzzle);
      const expected = 507214;

      expect(actual).toEqual(expected);
    });
  });

  describe("solveTwo", () => {
    test("solveTwo example", () => {
      const actual = solveTwo(exampleOne);
      const expected = 467835;

      expect(actual).toEqual(expected);
    });

    test("solveTwo puzzle", () => {
      const actual = solveTwo(puzzle);
      const expected = 72553319;

      expect(actual).toEqual(expected);
    });
  });
});
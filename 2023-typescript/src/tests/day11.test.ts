import { getDistance, getGalaxies, solve } from "../solutions/day11";
import { exampleOne } from "../input-examples/day11-examples";
import { puzzle } from "../input-puzzles/day11-puzzle";

describe("day11", () => {
  describe("pt1", () => {
    test("getGalaxies", () => {
      const actual = getGalaxies(exampleOne);
      const expected = [
        { x: 3, y: 0 },
        { x: 7, y: 1 },
        { x: 0, y: 2 },
        { x: 6, y: 4 },
        { x: 1, y: 5 },
        { x: 9, y: 6 },
        { x: 7, y: 8 },
        { x: 0, y: 9 },
        { x: 4, y: 9 },
      ];

      expect(actual).toEqual(expected);
    });

    test("getDistance", () => {
      const distances = [
        [1, 1, 2, 1, 1, 2, 1, 1, 2, 1],
        [1, 1, 2, 1, 1, 2, 1, 1, 2, 1],
        [1, 1, 2, 1, 1, 2, 1, 1, 2, 1],
        [2, 2, 4, 2, 2, 4, 2, 2, 4, 2],
        [1, 1, 2, 1, 1, 2, 1, 1, 2, 1],
        [1, 1, 2, 1, 1, 2, 1, 1, 2, 1],
        [1, 1, 2, 1, 1, 2, 1, 1, 2, 1],
        [2, 2, 4, 2, 2, 4, 2, 2, 4, 2],
        [1, 1, 2, 1, 1, 2, 1, 1, 2, 1],
        [1, 1, 2, 1, 1, 2, 1, 1, 2, 1],
      ];
      const actual = getDistance({ x: 1, y: 5 }, { x: 4, y: 9 }, distances);
      const expected = 9;
      expect(actual).toEqual(expected);
    });

    describe("solveOne", () => {
      test("solveOne example", () => {
        const actual = solve(exampleOne, 2);
        const expected = 374;

        expect(actual).toEqual(expected);
      });

      test("solveOne puzzle", () => {
        const actual = solve(puzzle, 2);
        const expected = 9974721;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("pt2", () => {
    describe("solveTwo", () => {
      test("solveTwo example one", () => {
        const actual = solve(exampleOne, 10);
        const expected = 1030;

        expect(actual).toEqual(expected);
      });

      test("solveTwo example two", () => {
        const actual = solve(exampleOne, 100);
        const expected = 8410;

        expect(actual).toEqual(expected);
      });

      test("solveTwo puzzle", () => {
        const actual = solve(puzzle, 1000000);
        const expected = 702770569197;

        expect(actual).toEqual(expected);
      });
    });
  });
});

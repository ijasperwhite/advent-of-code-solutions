import { createPathsMap, solveOne, solveTwo } from "../solutions/day08";
import { exampleOne, exampleThree, exampleTwo } from "../input-examples/day08-examples";
import { puzzle } from "../input-puzzles/day08-puzzle";

describe("day 08", () => {
  describe("pt1", () => {
    describe("createPathsMap", () => {
      test("create create map", () => {
        const input = `AAA = (BBB, CCC)
      BBB = (DDD, EEE)
      CCC = (ZZZ, GGG)`;
        const actual = createPathsMap(input);
        const expected = new Map([
          ["AAA", { left: "BBB", right: "CCC" }],
          ["BBB", { left: "DDD", right: "EEE" }],
          ["CCC", { left: "ZZZ", right: "GGG" }],
        ]);

        expect(actual).toEqual(expected);
      });
    });
    describe("solveOne", () => {
      test("solveOne example 1", () => {
        const actual = solveOne(exampleOne);
        const expected = 2;

        expect(actual).toEqual(expected);
      });

      test("solveOne example 2", () => {
        const actual = solveOne(exampleTwo);
        const expected = 6;

        expect(actual).toEqual(expected);
      });

      test("solveOne puzzle", () => {
        const actual = solveOne(puzzle);
        const expected = 13019;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("pt2", () => {
    describe("solveTwo", () => {
      test("solveTwo example", () => {
        const actual = solveTwo(exampleThree);
        const expected = 6;

        expect(actual).toEqual(expected);
      });

      test("solveTwo puzzle", () => {
        const actual = solveTwo(puzzle);
        const expected = 13524038372771;
        expect(actual).toEqual(expected);
      });
    });
  });
});

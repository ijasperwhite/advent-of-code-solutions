import { exampleOne, exampleTwo } from "../input-examples/day01-examples";
import { puzzle } from "../input-puzzles/day01-puzzle";
import { getNumberString, solveOne, words, solveTwo } from "../solutions/day01";

describe("day01", () => {
describe("getNumberString", () => {
  test("should return number word", () => {
    const input = "abcone2threexyz";
    const actual = getNumberString(input, words);
    const expected = "1";

    expect(actual).toEqual(expected);
  });

  test("should return number string", () => {
    const input = "a1b2c3d4e5f";
    const actual = getNumberString(input, words);
    const expected = "1";

    expect(actual).toEqual(expected);
  });
});

  describe("solveOne", () => {
    test("solveOne example", () => {
      const actual = solveOne(exampleOne);
      const expected = 142;

      expect(actual).toEqual(expected);
    });

    test("solveOne puzzle", () => {
      const actual = solveOne(puzzle);
      const expected = 55488;

      expect(actual).toEqual(expected);
    });
  });

  describe("solveTwo", () => {
    test("solveTwo example", () => {
      const actual = solveTwo(exampleTwo);
      const expected = 281;

      expect(actual).toEqual(expected);
    });

    test("solveTwo puzzle", () => {
      const actual = solveTwo(puzzle);
      const expected = 55614;

      expect(actual).toEqual(expected);
    });
  });
})
import { extrapolate, formatRow, solveOne, solveTwo } from "../solutions/day09";
import { exampleOne } from "../input-examples/day09-examples";
import { puzzle } from "../input-puzzles/day09-puzzle";

describe("day09", () => {
  describe("pt1", () => {
    describe("formatRow", () => {
      test("should create numbers list", () => {
        const input = "0 3 6 9 12 15";
        const actual = formatRow(input);
        const expected = [0, 3, 6, 9, 12, 15];

        expect(actual).toEqual(expected);
      });

      test("should create numbers list when numbers are negative", () => {
        const input = "7 -1 -11 -22 -33 -43 -51";
        const actual = formatRow(input);
        const expected = [7, -1, -11, -22, -33, -43, -51];

        expect(actual).toEqual(expected);
      });
    });
    describe("extrapolate", () => {
      test("should return result after 3 recursions", () => {
        const input = [0, 3, 6, 9, 12, 15];
        const actual = extrapolate(input, false);
        const expected = 18;

        expect(actual).toEqual(expected);
      });

      test("should return result after 5 recursions", () => {
        const input = [10, 13, 16, 21, 30, 45];
        const actual = extrapolate(input, false);
        const expected = 68;

        expect(actual).toEqual(expected);
      });
    });
    describe("solveOne", () => {
      test("solveOne example", () => {
        const actual = solveOne(exampleOne);
        const expected = 114;

        expect(actual).toEqual(expected);
      });

      test("solveOne puzzle", () => {
        const actual = solveOne(puzzle);
        const expected = 1641934234;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("pt2", () => {
    describe("extrapolatePt2", () => {
      test("should return result after 3 recursions", () => {
        const input = [0, 3, 6, 9, 12, 15];
        const actual = extrapolate(input, true);
        const expected = -3;

        expect(actual).toEqual(expected);
      });

      test("should return result after 5 recursions", () => {
        const input = [10, 13, 16, 21, 30, 45];
        const actual = extrapolate(input, true);
        const expected = 5;

        expect(actual).toEqual(expected);
      });
    });
    describe("solveTwo", () => {
      test("solveTwo example", () => {
        const actual = solveTwo(exampleOne);
        const expected = 2;

        expect(actual).toEqual(expected);
      });

      test("solveTwo puzzle", () => {
        const actual = solveTwo(puzzle);
        const expected = 975;

        expect(actual).toEqual(expected);
      });
    });
  });
});

import {
  getRaceResult,
  formatRow,
  getAllWins,
  solveOne,
  solveTwo,
  mergeValues,
} from "../solutions/day06";
import { exampleOne } from "../input-examples/day06-examples";
import { puzzle } from "../input-puzzles/day06-puzzle";

describe("day06", () => {
  describe("pt1", () => {
    test("formatRow", () => {
      const input = `Distance:   499   2210   1097   1440`;
      const actual = formatRow(input);
      const expected = [499, 2210, 1097, 1440];

      expect(actual).toEqual(expected);
    });

    describe("getRaceResult", () => {
      test("getRaceResult false", () => {
        const input = { distance: 9, time: 7, speed: 6 };
        const actual = getRaceResult(input);
        const expected = false;

        expect(actual).toEqual(expected);
      });

      test("getRaceResult true", () => {
        const input = { distance: 9, time: 7, speed: 2 };
        const actual = getRaceResult(input);
        const expected = true;

        expect(actual).toEqual(expected);
      });
    });

    describe("getAllWins", () => {
      test("should return result", () => {
        const actual = getAllWins(7, 9);
        const expected = 4;

        expect(actual).toEqual(expected);
      });
      test("should return result 2", () => {
        const actual = getAllWins(15, 40);
        const expected = 8;

        expect(actual).toEqual(expected);
      });
    });

    describe("solveOne", () => {
      test("solveOne example", () => {
        const actual = solveOne(exampleOne);
        const expected = 288;

        expect(actual).toEqual(expected);
      });

      test("solveOne puzzle", () => {
        const actual = solveOne(puzzle);
        const expected = 316800;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("pt2", () => {
    test("mergeValues", () => {
      const input = `Distance:   499   2210   1097   1440`;
      const actual = mergeValues(input);
      const expected = 499221010971440;

      expect(actual).toEqual(expected);
    });
    describe("solveTwo", () => {
      test("solveTwo example", () => {
        const actual = solveTwo(exampleOne);
        const expected = 71503;

        expect(actual).toEqual(expected);
      });

      test("solveTwo puzzle", () => {
        const actual = solveTwo(puzzle);
        const expected = 45647654;

        expect(actual).toEqual(expected);
      });
    });
  });
});

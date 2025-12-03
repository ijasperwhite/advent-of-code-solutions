import { exampleOne } from "../input-examples/day04-examples";
import { puzzle } from "../input-puzzles/day04-puzzle";
import { getResult, getRound, solveOne, solveTwo } from "../solutions/day04";

describe("day04", () => {
  describe("getScore", () => {
    test("should return winning score and next tickets", () => {
      const index = 1;
      const winners = [41, 48, 83, 86, 17];
      const players = [83, 86, 6, 31, 17, 9, 48, 53];
      const round = { index, winners, players };
      const actual = getResult(round);

      expect(actual.score).toEqual(8);
      expect(actual.tickets).toEqual([2, 3, 4, 5]);
    });

    test("should return winning score 1 game", () => {
      const index = 1;
      const winners = [48];
      const players = [83, 86, 6, 31, 17, 9, 48, 53];
      const round = { index, winners, players };
      const actual = getResult(round);

      expect(actual.score).toEqual(1);
      expect(actual.tickets).toEqual([2]);
    });

    test("should return winning score no game", () => {
      const index = 1;
      const winners = [1, 2, 3, 4, 5];
      const players = [83, 86, 6, 31, 17, 9, 48, 53];
      const round = { index, winners, players };
      const actual = getResult(round);

      expect(actual.score).toEqual(0);
      expect(actual.tickets).toEqual([]);
    });
  });

  describe("getRound", () => {
    const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`;
    const expected = {
      index: 1,
      winners: [41, 48, 83, 86, 17],
      players: [83, 86, 6, 31, 17, 9, 48, 53],
    };
    const actual = getRound(input);

    expect(actual).toEqual(expected);
  });

  describe("solveOne", () => {
    test("solveOne example", () => {
      const actual = solveOne(exampleOne);
      const expected = 13;

      expect(actual).toEqual(expected);
    });

    test("solveOne puzzle", () => {
      const actual = solveOne(puzzle);
      const expected = 24848;

      expect(actual).toEqual(expected);
    });
  });

  describe("solveTwo", () => {
    test("solveTwo example", () => {
      const actual = solveTwo(exampleOne);
      const expected = 30;

      expect(actual).toEqual(expected);
    });

    test("solveTwo puzzle", () => {
      const actual = solveTwo(puzzle);
      const expected = 7258152;

      expect(actual).toEqual(expected);
    });
  });
});

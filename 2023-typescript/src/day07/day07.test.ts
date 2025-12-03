import {
  getScore,
  getGameScore,
  solveOne,
  solveTwo,
  getGameScoreTwo,
} from "../solutions/day07";
import { exampleOne } from "../input-examples/day07-examples";
import { puzzle } from "../input-puzzles/day07-puzzle";

describe("pt1", () => {
  describe("getHandScore", () => {
    test("should return the hand result for 5 of a kind", () => {
      const hands = [
        { pic: "K", code: "13" },
        { pic: "K", code: "13" },
        { pic: "K", code: "13" },
        { pic: "K", code: "13" },
        { pic: "K", code: "13" },
      ];
      const actual = getGameScore(hands);
      const expected = 61313131313;

      expect(actual).toEqual(expected);
    });

    test("should return the hand result for 2 pair of a kind", () => {
      const hands = [
        { pic: "K", code: "13" },
        { pic: "K", code: "13" },
        { pic: "T", code: "09" },
        { pic: "T", code: "09" },
        { pic: "9", code: "08" },
      ];
      const actual = getGameScore(hands);
      const expected = 21313090908;

      expect(actual).toEqual(expected);
    });
  });

  describe("getScore", () => {
    test("should return getScore for hand no initial", () => {
      const input = [
        { pic: "2", code: "02" },
        { pic: "Q", code: "12" },
        { pic: "J", code: "11" },
        { pic: "T", code: "10" },
        { pic: "9", code: "09" },
      ];
      const actual = getScore(input, "NONE", false);

      const expected = 212111009;
      expect(actual).toEqual(expected);
    });

    test("should return getScore for hand with initial", () => {
      const input = [
        { pic: "2", code: "02" },
        { pic: "Q", code: "12" },
        { pic: "J", code: "11" },
        { pic: "T", code: "10" },
        { pic: "9", code: "09" },
      ];
      const actual = getScore(input, "THREE_KIND", false);
      const expected = 30212111009;
      expect(actual).toEqual(expected);
    });
  });
  describe("solveOne", () => {
    test("solveOne example", () => {
      const actual = solveOne(exampleOne);
      const expected = 6440;

      expect(actual).toEqual(expected);
    });

    test("solveOne puzzle", () => {
      const actual = solveOne(puzzle);
      const expected = 248836197;

      expect(actual).toEqual(expected);
    });
  });
});

describe("pt2", () => {
  describe("getGameScoreTwo", () => {
    test("should return the hand result for 5 of a kind", () => {
      const hands = [
        { pic: "K", code: "13", code2: "13" },
        { pic: "K", code: "13", code2: "13" },
        { pic: "J", code: "10", code2: "00" },
        { pic: "K", code: "13", code2: "13" },
        { pic: "J", code: "10", code2: "00" },
      ];
      const actual = getGameScoreTwo(hands);
      const expected = 61313001300;

      expect(actual).toEqual(expected);
    });

    test("should return the hand result for 2 pair of a kind", () => {
      const hands = [
        { pic: "K", code: "13", code2: "13" },
        { pic: "K", code: "13", code2: "13" },
        { pic: "T", code: "09", code2: "09" },
        { pic: "T", code: "09", code2: "09" },
        { pic: "9", code: "08", code2: "08" },
      ];
      const actual = getGameScore(hands);
      const expected = 21313090908;

      expect(actual).toEqual(expected);
    });
  });
  describe("solveTwo", () => {
    test("solveTwo example", () => {
      const actual = solveTwo(exampleOne);
      const expected = 5905;

      expect(actual).toEqual(expected);
    });

    test("solveTwo puzzle", () => {
      const actual = solveTwo(puzzle);
      const expected = 251195607;

      expect(actual).toEqual(expected);
    });
  });
});

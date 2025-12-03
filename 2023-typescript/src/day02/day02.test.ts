import { exampleOne } from "../input-examples/day02-examples";
import { puzzle } from "../input-puzzles/day02-puzzle";
import { solveOne, solveTwo } from "../solutions/day02";
import { getGame, getGames, getMinGame, isValidGame } from "../solutions/day02";
describe("day02", () => {

describe("isValidGame", () => {
  test("should return true", () => {
    const game = { red: 5, blue: 6, green: 10 };
    const actual = isValidGame(game);

    expect(actual).toEqual(true);
  });
  test("should return false", () => {
    const game = { red: 5, blue: 30, green: 10 };
    const actual = isValidGame(game);

    expect(actual).toEqual(false);
  });
});

describe("getGameResult", () => {
  test("should return red blue and green for a game, list of balls", () => {
    const input = [
      { color: "blue", count: 5 },
      { color: "red", count: 7 },
      { color: "green", count: 9 },
    ];
    const actual = getGame(input);
    const expected = {
      blue: 5,
      red: 7,
      green: 9,
    };
    expect(actual).toEqual(expected);
  });
});

describe("getGames", () => {
  test("should return a list of games", () => {
    const input = [
      "Game 3: 8 green, 6 blue, 20 red",
      "5 blue, 4 red, 13 green",
      "5 green, 1 red",
    ];
    const actual = getGames(input);
    const expected = [
      {
        blue: 6,
        red: 20,
        green: 8,
      },
      {
        blue: 5,
        red: 4,
        green: 13,
      },
      {
        blue: 0,
        red: 1,
        green: 5,
      },
    ];
    expect(actual).toEqual(expected);
  });
});

describe("getMinGame", () => {
  test("should return the min values", () => {
    const input = [
      {
        blue: 6,
        red: 20,
        green: 8,
      },
      {
        blue: 5,
        red: 4,
        green: 10,
      },
      {
        blue: 0,
        red: 1,
        green: 5,
      },
    ];
    const actual = getMinGame(input);
    const expected = {
      blue: 6,
      red: 20,
      green: 10,
    };

    expect(actual).toEqual(expected);
  });
});

  describe("solveOne", () => {
    test("solveOne example", () => {
      const actual = solveOne(exampleOne);
      const expected = 8;

      expect(actual).toEqual(expected);
    });

    test("solveOne puzzle", () => {
      const actual = solveOne(puzzle);
      const expected = 3059;

      expect(actual).toEqual(expected);
    });
  });

  describe("solveTwo", () => {
    test("solveTwo example", () => {
      const actual = solveTwo(exampleOne);
      const expected = 2286;

      expect(actual).toEqual(expected);
    });

    test("solveTwo puzzle", () => {
      const actual = solveTwo(puzzle);
      const expected = 65371;

      expect(actual).toEqual(expected);
    });
  });
})
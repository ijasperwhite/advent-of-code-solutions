import { exampleOne } from "../input-examples/day02-examples";
import { puzzle } from "../input-puzzles/day02-puzzle";

type Game = {
  red: number;
  blue: number;
  green: number;
};

type Ball = { color: string; count: number };

const matcher = /\d+\sgreen|\d+\sred|\d+\sblue/g;

export const getBall = (s: string): Ball => {
  return {
    color: s.split(" ")[1],
    count: Number(s.split(" ")[0]),
  };
};

export const getGame = (balls: Ball[]): Game => {
  return balls.reduce(
    (prev: Game, ball: Ball) => {
      if (ball.color === "red") {
        return {
          ...prev,
          red: ball.count,
        };
      } else if (ball.color === "blue") {
        return {
          ...prev,
          blue: ball.count,
        };
      } else {
        return {
          ...prev,
          green: ball.count,
        };
      }
    },
    { red: 0, blue: 0, green: 0 }
  );
};

export const getGames = (games: string[]): Game[] => {
  const results: Game[] = [];
  games.forEach((next) => {
    const actions = next.match(matcher)!!.map(getBall);
    const game = getGame(actions);
    results.push(game);
  });
  return results;
};

export const isValidGame = (g: Game): boolean => {
  return g.red <= 12 && g.green <= 13 && g.blue <= 14 ? true : false;
};

export const solveOne = (s: string): number => {
  return s.split("\n").reduce((prev: number, curr: string, i: number) => {
    const games = curr.split(";");
    const result: boolean[] = getGames(games).map((g) => isValidGame(g));
    if (result.some((g) => g == false)) {
      return prev;
    }
    return prev + (i + 1);
  }, 0);
};

console.log("pt1 example", solveOne(exampleOne), "to be", 8);
console.log("pt1 result", solveOne(puzzle), "to be", 3059);

// PART TWO

export const getMinGame = (games: Game[]): Game => {
  return {
    red: Math.max(...games.map((g) => g.red)),
    blue: Math.max(...games.map((g) => g.blue)),
    green: Math.max(...games.map((g) => g.green)),
  };
};

export const solveTwo = (s: string): number => {
  return s.split("\n").reduce((prev: number, curr: string, i: number) => {
    const games = curr.split(";");
    const result: Game[] = getGames(games);
    const minGame = getMinGame(result);
    const add = minGame.blue * minGame.red * minGame.green;
    return prev + add;
  }, 0);
};

console.log("pt2 example", solveTwo(exampleOne), "to be", 2286);
console.log("pt2 result", solveTwo(puzzle), "to be", 65371);

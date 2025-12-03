import { exampleOne } from "../input-examples/day04-examples";
import { puzzle } from "../input-puzzles/day04-puzzle";

// PART ONE

export type Round = {
  index: number;
  winners: number[];
  players: number[];
};

export type Result = {
  score: number;
  tickets: number[];
};

export const getResult = (round: Round): Result => {
  const result = round.winners.reduce((curr, next) => {
    if (round.players.includes(next)) {
      return curr.add(next);
    }
    return curr;
  }, new Set<number>());
  if (result.size === 0) {
    return { score: 0, tickets: [] };
  }
  return result.size === 1
    ? { score: 1, tickets: [round.index + 1] }
    : {
        score: 2 ** (result.size - 1),
        tickets: [...Array(result.size).keys()].map((a) => a + round.index + 1),
      };
};

const regex = /\d+|\|/g;

export const getRound = (s: string): Round => {
  const values = s.match(regex)!!;
  const splitIndex = values.findIndex((a) => a === "|");

  return {
    index: Number(values[0]),
    winners: values.slice(1, splitIndex).map(Number),
    players: values.slice(splitIndex + 1, values.length).map(Number),
  };
};

export const solveOne = (s: string): number => {
  return s.split("\n").reduce((sum: number, next: string) => {
    const round = getRound(next);
    return sum + getResult(round).score;
  }, 0);
};

console.log("pt1 example", solveOne(exampleOne), "to be", 13);
console.log("pt1 result", solveOne(puzzle), "to be", 23673);

// PART TWO

export const solveTwo = (s: string): number => {
  const ticketMap = s.split("\n").reduce((final, _, i) => {
    return final.set(i + 1, 1);
  }, new Map<number, number>());

  s.split("\n").forEach((next: string, index: number) => {
    const round = getRound(next);
    const tickets = getResult(round).tickets;
    tickets.forEach((a) => {
      [...new Array(ticketMap.get(index + 1))].forEach((_) => {
        const curr = ticketMap.get(a)!!;
        ticketMap.set(a, curr + 1);
      });
    });
    return;
  });
  return [...ticketMap.values()].reduce((sum, next) => sum + next, 0);
};

console.log("pt2 example", solveTwo(exampleOne), "to be", 30);
console.log("pt2 result", solveTwo(puzzle), "to be", 12263631);

import { countBy } from "lodash";
// PART ONE

type Card = {
  pic: string;
  code: string;
  code2?: string;
};

type Game = {
  cards: Card[];
  bid: number;
};

const results = [
  "NONE",
  "ONE_PAIR",
  "TWO_PAIR",
  "THREE_KIND",
  "FULL_HOUSE",
  "FOUR_KIND",
  "FIVE_KIND",
] as const;
type Result = (typeof results)[number];

const toCard: Record<string, Card> = {
  A: { pic: "A", code: "13", code2: "13" },
  K: { pic: "K", code: "12", code2: "12" },
  Q: { pic: "Q", code: "11", code2: "11" },
  J: { pic: "J", code: "10", code2: "00" },
  T: { pic: "T", code: "09", code2: "09" },
  9: { pic: "9", code: "08", code2: "08" },
  8: { pic: "8", code: "07", code2: "07" },
  7: { pic: "7", code: "06", code2: "06" },
  6: { pic: "6", code: "05", code2: "05" },
  5: { pic: "5", code: "04", code2: "04" },
  4: { pic: "4", code: "03", code2: "03" },
  3: { pic: "3", code: "02", code2: "02" },
  2: { pic: "2", code: "01", code2: "01" },
};

const toGame = (s: string): Game => {
  const split = s.split(" ");
  const bid = Number(split[1]);
  const cards = split[0].split("").map((c) => toCard[c]);
  return { cards, bid };
};

export const getScore = (
  cards: Card[],
  result: Result,
  isPartTwo: boolean
): number => {
  return Number(
    cards.reduce(
      (sum, next) => (!isPartTwo ? sum + next.code : sum + next.code2),
      String(results.indexOf(result))
    )
  );
};

export const getHandCode = (map: Map<number, number>): Result => {
  if (map.has(5)) return "FIVE_KIND";
  if (map.has(4)) return "FOUR_KIND";
  if (map.has(3) && map.has(2)) return "FULL_HOUSE";
  if (map.has(3)) return "THREE_KIND";
  if (map.has(2) && 2 == map.get(2)) return "TWO_PAIR";
  if (map.has(2)) return "ONE_PAIR";
  return "NONE";
};

export const getGameScore = (cards: Card[]): number => {
  const counts = countBy(cards, "pic");
  const values = Object.values(counts);
  const keys = Object.keys(counts);
  const map = keys.reduce((prev, _, i) => {
    const current = prev.get(values[i]) ?? 0;
    return prev.set(values[i], current + 1);
  }, new Map<number, number>());
  return getScore(cards, getHandCode(map), false);
};

export const solveOne = (s: string) => {
  return s
    .split("\n")
    .map((r) => {
      const game = toGame(r);
      return {
        score: getGameScore(game.cards),
        bid: game.bid,
      };
    })
    .sort((a, b) => a.score - b.score)
    .reduce((sum, next, i) => {
      return sum + next.bid * (i + 1);
    }, 0);
};

// PART TWO
const isJoker = (c: Card) => c.pic === "J";

const newHand = (result: Result, jokers: number): Result => {
  if (0 == jokers) return result;
  if (1 == jokers) return oneJoker(result);
  if (2 == jokers) return twoJoker(result);
  if (3 == jokers) return threeJoker(result);
  return "FIVE_KIND";
};

export const oneJoker = (result: Result): Result => {
  if (result === "FOUR_KIND") return "FIVE_KIND"; // 4 kind return 5 kind
  if (result === "THREE_KIND") return "FOUR_KIND"; // 3 kind return 4 kind
  if (result === "TWO_PAIR") return "FULL_HOUSE"; // 2 pair return FH
  if (result === "ONE_PAIR") return "THREE_KIND"; // 1 pair return 3 kind
  return "ONE_PAIR"; // None return pair
};

export const twoJoker = (result: Result): Result => {
  if (result === "THREE_KIND") return "FIVE_KIND"; // three kind return 5 kind
  if (result === "FULL_HOUSE") return "FIVE_KIND"; // full house return 5 kind
  if (result === "TWO_PAIR") return "FOUR_KIND"; // f2 pair return 4 kind
  if (result === "ONE_PAIR") return "THREE_KIND"; // pair return 3 kind
  return "THREE_KIND"; // None return 3 kind // not happening
};

export const threeJoker = (result: Result): Result => {
  if (result == "FULL_HOUSE") return "FIVE_KIND"; // FH to 5 KIND
  return "FOUR_KIND"; // None return  4 kind
};

export const getGameScoreTwo = (cards: Card[]): number => {
  const counts = countBy(cards, "pic");
  const values = Object.values(counts);
  const keys = Object.keys(counts);
  const map = keys.reduce((prev, _, i) => {
    const current = prev.get(values[i]) ?? 0;
    return prev.set(values[i], current + 1);
  }, new Map<number, number>());

  const code = getHandCode(map);
  const jokerCount: number = cards.filter(isJoker).length;
  const jokerHandCode = newHand(code, jokerCount);
  return getScore(cards, jokerHandCode, true);
};

export const solveTwo = (s: string) => {
  return s
    .split("\n")
    .map((r) => {
      const game = toGame(r);
      return {
        score: getGameScoreTwo(game.cards),
        bid: game.bid,
      };
    })
    .sort((a, b) => a.score - b.score)
    .reduce((sum, next, i) => {
      return sum + next.bid * (i + 1);
    }, 0);
};

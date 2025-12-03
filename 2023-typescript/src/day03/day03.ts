import { exampleOne } from "../input-examples/day03-examples";
import { puzzle } from "../input-puzzles/day03-puzzle";

type Computer = {
  symbols: Set<RowValue>;
  digits: Set<RowValue>;
};

type RowValue = {
  gear: boolean;
  x: number;
  y: number;
  value: number;
};

const getSymbols = (s: string): RegExpMatchArray[] => {
  return [...s.matchAll(/[^\.\d+]|\+/g)];
};

const getRowSymbols = (s: string, rowIndex: number) => {
  const set = new Set<RowValue>();
  const symbols = getSymbols(s);
  symbols.forEach((a) => {
    set.add({
      gear: a[0] === "*" ? true : false,
      x: rowIndex,
      y: Number(a.index),
      value: 0,
    });
  });
  return set;
};

const getDigits = (s: string): RegExpMatchArray[] => {
  return [...s.matchAll(/\d+/g)];
};

const getRowDigits = (s: string, rowIndex: number): Set<RowValue> => {
  const set = new Set<RowValue>();
  const digits = getDigits(s);
  digits.forEach((a) => {
    [...new Array(a[0].length)].forEach((n, i) => {
      set.add({
        gear: false,
        x: rowIndex,
        y: Number(a.index) + i,
        value: Number(a),
      });
    });
  });

  return set;
};

export const formatRow = (s: string, rowIndex: number): Computer => {
  return {
    symbols: getRowSymbols(s, rowIndex),
    digits: getRowDigits(s, rowIndex),
  };
};

const getSymbolValues = (
  s: RowValue,
  digits: Map<string, number>
): number[] => {
  const ri = digits.get(`${s.x}_${s.y - 1}`) ?? 0;
  const le = digits.get(`${s.x}_${s.y + 1}`) ?? 0;
  const topM = digits.get(`${s.x - 1}_${s.y}`) ?? 0;
  const topL = topM !== 0 ? 0 : digits.get(`${s.x - 1}_${s.y - 1}`) ?? 0;
  const topR = topM !== 0 ? 0 : digits.get(`${s.x - 1}_${s.y + 1}`) ?? 0;

  const boM = digits.get(`${s.x + 1}_${s.y}`) ?? 0;
  const boL = boM !== 0 ? 0 : digits.get(`${s.x + 1}_${s.y - 1}`) ?? 0;
  const boR = boM !== 0 ? 0 : digits.get(`${s.x + 1}_${s.y + 1}`) ?? 0;

  return [ri, le, topM, topL, topR, boM, boL, boR].filter((a) => a !== 0);
};

const getEngineValue = (
  symbols: Set<RowValue>,
  digits: Map<string, number>
): number => {
  return Array.from(symbols.values()).reduce((total, s) => {
    const result = getSymbolValues(s, digits);

    return total + result.reduce((sum, next) => sum + next);
  }, 0);
};

export const solveOne = (s: string): number => {
  const symbols = new Set<RowValue>();
  const digits = new Map<string, number>();
  s.split("\n").forEach((next: string, i: number) => {
    const result = formatRow(next, i);
    result.symbols.forEach((element) => {
      symbols.add(element);
    });
    result.digits.forEach((element) => {
      digits.set(`${element.x}_${element.y}`, element.value);
    });
  });
  return getEngineValue(symbols, digits);
};

console.log("pt1 example", solveOne(exampleOne), "to be", 4361);
console.log("pt1 result", solveOne(puzzle), "to be", 550064);

// PART TWO

const getGearValue = (
  gears: Set<RowValue>,
  digits: Map<string, number>
): number => {
  return Array.from(gears.values()).reduce((total, s) => {
    const result = getSymbolValues(s, digits);
    if (result.length >= 2) {
      return total + result.reduce((prod, next) => prod * next, 1);
    }
    return total;
  }, 0);
};

export const solveTwo = (s: string): number => {
  const symbols = new Set<RowValue>();
  const digits = new Map<string, number>();
  s.split("\n").forEach((next: string, i: number) => {
    const result = formatRow(next, i);
    result.symbols.forEach((element) => {
      symbols.add(element);
    });
    result.digits.forEach((element) => {
      digits.set(`${element.x}_${element.y}`, element.value);
    });
  });
  const gears = [...symbols].filter((a) => true === a.gear);
  return getGearValue(new Set(gears), digits);
};

console.log("pt2 example", solveTwo(exampleOne), "to be", 467835);
console.log("pt2 result", solveTwo(puzzle), "to be", 85010461);

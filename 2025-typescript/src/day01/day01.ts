export const getNextTurn = (s: string): number => {
  const match = s.match(/\d+/g);
  if (!match) throw new Error("no match for digits in string");
  return s[0] === "R" ? Number(match[0]) : -1 * Number(match[0]);
};

export const partOne = (s: string) => {
  return s.split("\n").reduce(
    (result, next) => {
      const dial = (result.dial + getNextTurn(next)) % 100;
      if (dial === 0) return { dial: 0, sum: result.sum + 1 };
      return { ...result, dial };
    },
    { dial: 50, sum: 0 } as { dial: number; sum: number }
  ).sum;
};

export const getNextDial = (
  dial: number,
  turn: number
): { dial: number; counter: number } => {
  let counter = 0;
  dial = dial + turn;
  turn = dial < 0 ? 100 : -100;
  while (dial < 0 || dial > 99) {
    dial = dial + turn;
    counter++;
  }
  return { dial, counter };
};

export const partTwo = (s: string) => {
  return s.split("\n").reduce(
    (result, next) => {
      const { dial, counter } = getNextDial(result.dial, getNextTurn(next));
      return { dial, sum: result.sum + counter };
    },
    { dial: 50, sum: 0 } as { dial: number; sum: number }
  ).sum;
};

export const getComputerInstructions = (s: string): string[] => {
  const match = s.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g);
  if (!match) return [];
  return match.map(String);
};

export const executeInstruction = (s: string): number => {
  const match = s.match(/\d+/g);
  if (!match) return 0;
  return match.reduce((sum, next) => {
    return sum * Number(next);
  }, 1);
};

const sum = (a: number, b: number) => a + b;

export const partOne = (s: string) => {
  return s
    .split("\n")
    .map(getComputerInstructions)
    .flat()
    .map(executeInstruction)
    .reduce(sum);
};

export const partTwo = (s: string) => {
  return s
    .split("\n")
    .map(getComputerInstructions)
    .flat()
    .reduce(
      (sum, next) => {
        if (next === "do()") return { ...sum, isEnabled: 1 };
        if (next === "don't()") return { ...sum, isEnabled: 0 };
        return {
          ...sum,
          total: sum.total + sum.isEnabled * executeInstruction(next),
        };
      },
      { total: 0, isEnabled: 1 }
    ).total;
};

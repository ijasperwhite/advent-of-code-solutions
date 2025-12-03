export const fetchLocationIds = (
  s: string
): { first: number; second: number } => {
  const match = s.match(/\d+/g);
  if (!match || match.length < 2) {
    throw new Error("Invalid input format");
  }
  return { first: Number(match[0]), second: Number(match[1]) };
};

export const partOne = (s: string) => {
  const { listOne, listTwo } = s.split("\n").reduce(
    (sum: { listOne: number[]; listTwo: number[] }, next: string) => {
      const { first, second } = fetchLocationIds(next);
      return {
        listOne: [...sum.listOne, first],
        listTwo: [...sum.listTwo, second],
      };
    },
    { listOne: [], listTwo: [] }
  );

  const sortedOne = listOne.sort((a, b) => a - b);
  const sortedTwo = listTwo.sort((a, b) => a - b);

  return sortedOne.reduce((sum, _, i) => {
    return sum + Math.abs(sortedOne[i] - sortedTwo[i]);
  }, 0);
};

export const partTwo = (s: string) => {
  const { listOne, listTwo } = s.split("\n").reduce(
    (sum: { listOne: number[]; listTwo: number[] }, next: string) => {
      const { first, second } = fetchLocationIds(next);
      return {
        listOne: [...sum.listOne, first],
        listTwo: [...sum.listTwo, second],
      };
    },
    { listOne: [], listTwo: [] }
  );

  const multiples = new Map<number, number>();
  listTwo.forEach((next) => {
    multiples.set(next, 1 + (multiples.get(next) ?? 0));
  });

  return listOne.reduce((sum, next) => {
    return sum + next * (multiples.get(next) ?? 0);
  }, 0);
};

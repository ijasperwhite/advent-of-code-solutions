type Location = {
  x: number;
  y: number;
};

export const toLocation = (s: string): Location => {
  const match = s.match(/\d+/g);
  if (!match) throw new Error("invalid input");
  return {
    x: Number(match[1]),
    y: Number(match[0]),
  };
};

export const calculateSize = (start: Location, end: Location): number => {
  const xDiff = Math.max(start.x, end.x) - Math.min(start.x, end.x) + 1;
  const yDiff = Math.max(start.y, end.y) - Math.min(start.y, end.y) + 1;
  return xDiff * yDiff;
};

export const partOne = (s: string) => {
  const locations = s.split("\n").map(toLocation);
  let max = 0;
  for (let i = 0; i < locations.length; i++) {
    for (let j = i + 1; j < locations.length; j++) {
      const size = calculateSize(locations[i], locations[j]);
      if (size > max) max = size;
    }
  }

  return max;
};

export const partTwo = (s: string) => {
  return 0;
};

type Input = {
  curr: boolean[];
  target: boolean[];
  buttons: number[][];
};
export const toInput = (s: string): Input => {
  const matchTarget = s.match(/\.|\#/g);
  const matchButtons = s.match(/\((.*?)\)/g);
  return {
    curr: matchTarget?.map((i) => false) ?? [],
    target: matchTarget?.map((i) => (i === "." ? false : true)) ?? [],
    buttons:
      matchButtons?.map((i) => (i.match(/\d+/g) ?? []).map(Number)) ?? [],
  };
};

export const partOne = (s: string) => {
  const rows = s.split("\n").map(toInput);
  const results = rows.map((r) => {
    // try using a bfs
    const queue = [];
    while (queue.length > 0) {
      return;
    }

    return 0;
  });
  return results.reduce((sum, next) => sum + next);
};

export const partTwo = (s: string) => {
  return 0;
};

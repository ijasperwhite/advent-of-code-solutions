type Input = {
  curr: number[];
  target: number[];
  buttons: number[][];
};
export const toInput = (s: string): Input => {
  const matchTarget = s.match(/\.|\#/g);
  const matchButtons = s.match(/\((.*?)\)/g);
  const curr = matchTarget?.map((i) => 0) ?? [];
  const b = matchButtons?.map((i) => (i.match(/\d+/g) ?? []).map(Number)) ?? [];
  return {
    curr,
    target: matchTarget?.map((i) => (i === "." ? 0 : 1)) ?? [],
    buttons: b.map((it) =>
      it.reduce((prev, next) => {
        const step = [...prev];
        step[next] = 1;
        return step;
      }, curr)
    ),
  };
};

const getNextCurr = (curr: number[], button: number[]): number[] => {
  const result = [...curr];
  for (let i = 0; i < curr.length; i++) {
    result[i] = (curr[i] + button[i]) % 2;
  }
  return result;
};

export const isAtTarget = (curr: number[], target: number[]): boolean => {
  for (let i = 0; i < curr.length; i++) {
    if (curr[i] !== target[i]) return false;
  }
  return true;
};

export const partOne = (s: string) => {
  const rows = s.split("\n").map(toInput);
  const results = rows.map((r) => {
    // try using a bfs
    const buttons = r.buttons;
    const queue = [];
    queue.push(r.curr);
    let n = 0;
    let size = 1;
    while (queue.length > 0) {
      n++;
      while (size > 0) {
        const next = [...queue.shift()!];
        for (let b of buttons) {
          const nextCurr = getNextCurr(next, b);
          if (isAtTarget(nextCurr, r.target)) {
            return n;
          }
          queue.push(nextCurr);
        }
        size--;
      }
      size = queue.length;
    }
    return n;
  });
  return results.reduce((sum, next) => sum + next, 0);
};

export const partTwo = (s: string) => {
  return 0;
};

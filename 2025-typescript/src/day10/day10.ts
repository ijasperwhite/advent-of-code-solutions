type Input = {
  curr: number[];
  target: number[];
  output: number[];
  buttons: number[][];
};

type Result = {
  count: number;
  button: number[];
  output: number[];
};

export const toInput = (s: string): Input => {
  const matchTarget = s.match(/\.|\#/g);
  const matchButtons = s.match(/\((.*?)\)/g);
  const matchOutput = s.match(/\{(.*?)\}/g);

  const curr = matchTarget?.map((i) => 0) ?? [];
  const b = matchButtons?.map((i) => (i.match(/\d+/g) ?? []).map(Number)) ?? [];
  return {
    curr,
    target: matchTarget?.map((i) => (i === "." ? 0 : 1)) ?? [],
    output:
      matchOutput?.map((i) => i.match(/\d+/g)?.map(Number) ?? []).flat() ?? [],
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

const getNextOutput = (output: number[], button: number[]): number[] => {
  const result = [...output];
  for (let i = 0; i < output.length; i++) {
    result[i] = output[i] + button[i];
  }
  return result;
};

export const isAtTarget = (curr: number[], target: number[]): boolean => {
  for (let i = 0; i < curr.length; i++) {
    if (curr[i] !== target[i]) return false;
  }
  return true;
};

export const subsetsBitmask = (nums: number[][]) => {
  const n = nums.length;
  const result = [];
  for (let mask = 0; mask < 1 << n; mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) subset.push(nums[i]);
    }
    result.push(subset);
  }
  return result;
};

export const toButtonCombinations = (b: number[][]) => {
  const subsets = subsetsBitmask(b);
  const result: Result[] = subsets.map((subset) => {
    const none = b[0].map((_) => 0);
    if (subset.length === 0) {
      return { button: none, count: 0, output: none };
    }
    if (subset.length === 1) {
      return { button: subset[0], count: 1, output: subset[0] };
    }
    const multi = subset.reduce(
      (prev, next) => {
        return {
          button: getNextCurr(prev.button, next),
          count: prev.count + 1,
          output: getNextOutput(prev.output, next),
        };
      },
      { button: none, count: 0, output: none }
    );
    return multi;
  });
  return result.filter((i) => i.button.some((j) => 1 === j));
};

export const partOne = (s: string) => {
  const rows = s.split("\n").map(toInput);
  const results = rows.map((r) => {
    const { target, buttons } = r;
    let min = buttons.length + 1;

    const combo = toButtonCombinations(buttons);
    for (let i = 0; i < combo.length; i++) {
      if (isAtTarget(combo[i].button, target) && combo[i].count < min) {
        min = combo[i].count;
      }
    }
    return min;
  });
  return results.reduce((sum, next) => sum + next, 0);
};

export const partTwo = (s: string) => {
  const rows = s.split("\n").map(toInput);
  const results = rows.map((r) => {
    let { buttons, output } = r;
    const target = output.map((a) => a % 2);
    let min = buttons.length + 1;
    let minFinalButton: Result;

    const combo = toButtonCombinations(buttons);
    for (let i = 0; i < combo.length; i++) {
      if (isAtTarget(combo[i].button, target) && combo[i].count < min) {
        min = combo[i].count;
        minFinalButton = combo[i];
      }
    }
    const remainingOutput = output.map((a, b) => a - minFinalButton.output[b]);
    console.log(remainingOutput);
    return 0;
  });
  return 0;
};

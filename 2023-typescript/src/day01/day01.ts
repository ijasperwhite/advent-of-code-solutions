// PART ONE

const getValueOne = (s: string) => {
  const x = s.match(/\d/g) ?? [];
  return Number(x[0] + x[x.length - 1]);
};

export const solveOne = (s: string): number =>
  s.split("\n").reduce((curr, next) => curr + getValueOne(next), 0);

// PART TWO

const reverseString = (s: string) => s.split("").reverse().join("");

export const words = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const getNumberStringFromDigit = (s: string) => {
  const digit = s.match(/\d/g);
  return digit !== null ? digit[0] : "";
};

const getNumberStringFromWord = (s: string, checkList: string[]) => {
  return checkList.reduce((prev, curr, index) => {
    if (prev !== "") return prev;
    const temp = s.replace(curr, "");
    if (temp.length < s.length) {
      return String(index + 1);
    }
    return "";
  }, "");
};

export const getNumberString = (s: string, checkList: string[]): string => {
  return (
    [...new Array(s.length)]
      .map((_, i) => {
        const result1 = getNumberStringFromDigit(s.slice(i, i + 1));
        if (result1 !== "") return result1;
        const result2 = getNumberStringFromWord(s.slice(0, i + 1), checkList);
        if (result2 !== "") return result2;
        return null;
      })
      .find((e) => e !== null) ?? ""
  );
};

const getValueTwo = (s: string): number => {
  const first = getNumberString(s, words);
  const last = getNumberString(reverseString(s), words.map(reverseString));
  return Number(first + last);
};

export const solveTwo = (s: string): number =>
  s.split("\n").reduce((prev, curr) => prev + getValueTwo(curr), 0);

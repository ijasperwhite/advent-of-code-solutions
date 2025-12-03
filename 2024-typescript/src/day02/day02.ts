export const stringToReport = (s: string): number[] => {
  const match = s.match(/\d+/g);
  if (!match) throw new Error("no match found!");
  return match.map(Number);
};

const isReportSafe = (report: number[]): boolean => {
  const result = report.reduce(
    (sum, _, index) => {
      // exit if unsafe
      if (!sum.isSafe) return sum;
      /// check if increasing or decreasing
      if (index === 0) {
        return {
          isSafe: true,
          isIncreasing: report[0] < report[report.length - 1],
        };
      }
      // check valid next step
      const nextStep = Math.abs(report[index - 1] - report[index]);
      if (nextStep > 3 || nextStep === 0) {
        return { ...sum, isSafe: false };
      }
      // check if invalid increasing
      if (sum.isIncreasing && report[index - 1] > report[index]) {
        return { ...sum, isSafe: false };
      }
      // check if invalid decreasing
      if (!sum.isIncreasing && report[index - 1] < report[index]) {
        return { ...sum, isSafe: false };
      }

      return sum;
    },
    { isSafe: true, isIncreasing: true }
  );
  return result.isSafe;
};

export const partOne = (s: string) => {
  return s
    .split("\n")
    .map(stringToReport)
    .reduce((total, report) => {
      if (isReportSafe(report)) return total + 1;
      return total;
    }, 0);
};

export const getReportSubsets = (values: number[]): number[][] => {
  return values.map((_, i) => [...values.slice(0, i), ...values.slice(i + 1)]);
};

export const partTwo = (s: string) => {
  return s
    .split("\n")
    .map(stringToReport)
    .reduce((total, report) => {
      if (isReportSafe(report)) return total + 1;

      const someSubsetSafe = getReportSubsets(report).reduce(
        (isSubsetSafe, nextSubset) => {
          if (isSubsetSafe) return true;
          return isReportSafe(nextSubset);
        },
        false
      );
      if (someSubsetSafe) return total + 1;
      return total;
    }, 0);
};

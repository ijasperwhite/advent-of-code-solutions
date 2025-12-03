import {
  applyMapping,
  formatInput,
  getDestMap,
  getSeedRows,
  nextList,
  nextRow,
  solveOne,
  solveTwo,
  toRow,
} from "../solutions/day05";
import { exampleOne, exampleTwo } from "../input-examples/day05-examples";
import { puzzle } from "../input-puzzles/day05-puzzle";

describe("day05", () => {
  test("toRow", () => {
    const input = "    0 15 37";
    const expected = {
      dest: 0,
      source: 15,
      range: 37,
    };
    const actual = toRow(input);
    expect(actual).toEqual(expected);
  });

  test("getDestMap", () => {
    const allowed = [99, 15];
    const input = [
      { dest: 50, source: 98, range: 2 },
      { dest: 30, source: 13, range: 3 },
    ];
    const expected = new Map<number, number>([
      [99, 51],
      [15, 32],
    ]);
    const actual = getDestMap(allowed, input);

    expect(actual).toEqual(expected);
  });

  test("nextList", () => {
    const list = [1, 2, 3, 4, 5];
    const map = new Map<number, number>([
      [1, 50],
      [3, 51],
      [4, 30],
      [99, 100],
    ]);
    const expected = [50, 2, 51, 30, 5];
    const actual = nextList(list, map);

    expect(actual).toEqual(expected);
  });

  test("formatInput", () => {
    const input = `soil-to-fertilizer map:
    0 15 37
    37 52 2
    39 0 15`;
    const actual = formatInput(input);
    const expected = [
      { dest: 0, source: 15, range: 37 },
      { dest: 37, source: 52, range: 2 },
      { dest: 39, source: 0, range: 15 },
    ];
    expect(actual).toEqual(expected);
  });

  describe("solveOne", () => {
    test("example", () => {
      const input = exampleOne;
      const expected = 35;
      const actual = solveOne(input);
      console.log("pt1 result", actual, "to be", expected);

      expect(actual).toEqual(expected);
    });
    test("puzzle", () => {
      const input = puzzle;
      const expected = 3374647;
      const actual = solveOne(input);
      console.log("pt1 result", actual, "to be", expected);

      expect(actual).toEqual(expected);
    });
  });

  describe("solveTwo", () => {
    describe("nextRow", () => {
      test("nextRow - overlap 3", () => {
        const prev = { source: 75, dest: 75, range: 10 };
        const curr = { source: 81, dest: 20, range: 3 };
        const actual = nextRow(prev, curr);
        const expected = [
          { source: 20, dest: 20, range: 3 },
          { source: 75, dest: 75, range: 5 },
          { source: 84, dest: 84, range: 2 },
        ];

        expect(actual).toEqual(expected);
      });

      test("nextRow - no overlap", () => {
        const prev = { source: 79, dest: 79, range: 14 };
        const curr = { source: 50, dest: 98, range: 2 };
        const actual = nextRow(prev, curr);
        const expected = [{ source: 79, dest: 79, range: 14 }];

        expect(actual).toEqual(expected);
      });

      test("nextRow - overlap middle", () => {
        const prev = { source: 75, dest: 75, range: 10 };
        const curr = { source: 70, dest: 2, range: 30 };
        const actual = nextRow(prev, curr);
        const expected = [{ source: 2, dest: 2, range: 10 }];

        expect(actual).toEqual(expected);
      });

      test("nextRow - keep left, map mid, drop right", () => {
        const prev = { source: 75, dest: 75, range: 7 };
        const curr = { source: 80, dest: 2, range: 30 };
        const actual = nextRow(prev, curr);
        const expected = [
          { source: 75, dest: 75, range: 5 },
          { source: 2, dest: 2, range: 2 },
        ];

        expect(actual).toEqual(expected);
      });

      test("nextRow - drop left, map mid, keep right", () => {
        // FIX
        const prev = { source: 75, dest: 75, range: 10 };
        const curr = { source: 70, dest: 2, range: 8 };
        const actual = nextRow(prev, curr);
        const expected = [
          { source: 2, dest: 2, range: 3 },
          { source: 77, dest: 77, range: 7 },
        ];

        expect(actual).toEqual(expected);
      });
    });

    test("should apply first mapping", () => {
      const prev = [
        { dest: 79, source: 79, range: 14 },
        { dest: 55, source: 55, range: 13 },
      ];
      const curr = [
        { dest: 50, source: 98, range: 2 },
        { dest: 52, source: 50, range: 48 },
      ];

      const actual = applyMapping(prev, curr);
      const expected = 1;

      expect(actual).toEqual(expected);
    });

    test("getSeedRows", () => {
      const input = "seeds: 79 3 55 2";
      const actual = getSeedRows(input);
      const expected = [
        { source: 79, dest: 79, range: 3 },
        { source: 55, dest: 55, range: 2 },
      ];

      expect(actual).toEqual(expected);
    });
    test("exampleOne", () => {
      const input = exampleOne;
      const expected = 46;
      const actual = solveTwo(input);
      console.log("pt1 result", actual, "to be", expected);

      expect(actual).toEqual(expected);
    });

    test("puzzle", () => {
      const expected = 1;
      const actual = solveTwo(puzzle);
      console.log("pt1 result", actual, "to be", expected);

      expect(actual).toEqual(expected);
    });
  });
});

import { getNextNodes, getNodes, solveOne, solveTwo } from "../solutions/day10";
import { exampleOne, exampleTwo } from "../input-examples/day10-examples";
import { puzzle } from "../input-puzzles/day10-puzzle";

describe("day10", () => {
  describe("getNodes", () => {
    test("should return the start location (1,1)", () => {
      const actual = getNodes(exampleOne.split("\n").reverse());
      const expected = [
        {
          connected: [
            { x: 2, y: 1 },
            { x: 1, y: 2 },
          ],
          location: { x: 1, y: 1 },
          symbol: "L",
        },
        {
          connected: [
            { x: 1, y: 1 },
            { x: 3, y: 1 },
          ],
          location: { x: 2, y: 1 },
          symbol: "-",
        },
        {
          connected: [
            { x: 2, y: 1 },
            { x: 3, y: 2 },
          ],
          location: { x: 3, y: 1 },
          symbol: "J",
        },
        {
          connected: [
            { x: 1, y: 1 },
            { x: 1, y: 3 },
          ],
          location: { x: 1, y: 2 },
          symbol: "|",
        },
        {
          connected: [
            { x: 3, y: 1 },
            { x: 3, y: 3 },
          ],
          location: { x: 3, y: 2 },
          symbol: "|",
        },
        { connected: [], location: { x: 1, y: 3 }, symbol: "S" },
        {
          connected: [
            { x: 1, y: 3 },
            { x: 3, y: 3 },
          ],
          location: { x: 2, y: 3 },
          symbol: "-",
        },
        {
          connected: [
            { x: 2, y: 3 },
            { x: 3, y: 2 },
          ],
          location: { x: 3, y: 3 },
          symbol: "7",
        },
      ];
      expect(actual).toMatchObject(expected);
    });
  });

  describe("getNextNodes", () => {
    test("should return two nodes when current node is the start", () => {
      const curr = {
        symbol: "S",
        location: { x: 0, y: 0 },
        connected: [
          { x: 1, y: 0 },
          { x: 0, y: 1 },
        ],
      };
      const nodes = [
        {
          symbol: "S",
          location: { x: 0, y: 0 },
          connected: [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
          ],
        },
        {
          connected: [
            { x: 0, y: 2 },
            { x: 0, y: 0 },
          ],
          location: { x: 0, y: 1 },
          symbol: "|",
        },
        {
          connected: [
            { x: 2, y: 0 },
            { x: 0, y: 0 },
          ],
          location: { x: 1, y: 0 },
          symbol: "-",
        },
      ];
      const actual = getNextNodes(curr, null, nodes);
      const expected = [
        {
          connected: [
            { x: 0, y: 2 },
            { x: 0, y: 0 },
          ],
          location: { x: 0, y: 1 },
          symbol: "|",
        },
        {
          connected: [
            { x: 2, y: 0 },
            { x: 0, y: 0 },
          ],
          location: { x: 1, y: 0 },
          symbol: "-",
        },
      ];

      expect(actual).toEqual(expected);
    });

    test("should return one nodes when visited is not empty", () => {
      const curr = {
        symbol: "S",
        location: { x: 0, y: 0 },
        connected: [
          { x: 1, y: 0 },
          { x: 0, y: 1 },
        ],
      };
      // const visited = new Set(["1_0"]);
      const prev = {
        connected: [
          { x: 2, y: 0 },
          { x: 0, y: 0 },
        ],
        location: { x: 1, y: 0 },
        symbol: "-",
      };
      const nodes = [
        {
          symbol: "S",
          location: { x: 0, y: 0 },
          connected: [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
          ],
        },
        {
          connected: [
            { x: 0, y: 2 },
            { x: 0, y: 0 },
          ],
          location: { x: 0, y: 1 },
          symbol: "|",
        },
        {
          connected: [
            { x: 2, y: 0 },
            { x: 0, y: 0 },
          ],
          location: { x: 1, y: 0 },
          symbol: "-",
        },
      ];
      const actual = getNextNodes(curr, prev, nodes);
      const expected = [
        {
          connected: [
            { x: 0, y: 2 },
            { x: 0, y: 0 },
          ],
          location: { x: 0, y: 1 },
          symbol: "|",
        },
      ];

      expect(actual).toEqual(expected);
    });
  });
  describe("pt1", () => {
    describe("solveOne", () => {
      test("solveOne example one", () => {
        const actual = solveOne(exampleOne);
        const expected = 4;

        expect(actual).toEqual(expected);
      });

      test("solveOne example two", () => {
        const actual = solveOne(exampleTwo);
        const expected = 8;

        expect(actual).toEqual(expected);
      });

      test("solveOne puzzle", () => {
        const actual = solveOne(puzzle);
        const expected = 6613;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("pt2", () => {
    describe("solveTwo", () => {
      test("solveTwo example", () => {
        const actual = solveTwo(exampleOne);
        const expected = 4;

        expect(actual).toEqual(expected);
      });

      test("solveTwo puzzle", () => {
        const actual = solveTwo(puzzle);
        const expected = 6903;

        expect(actual).toEqual(expected);
      });
    });
  });
});

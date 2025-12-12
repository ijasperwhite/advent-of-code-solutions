import { describe, it, expect } from "vitest";
import {
  isAtTarget,
  partOne,
  partTwo,
  subsetsBitmask,
  toButtonCombinations,
  toInput,
} from "./day10";
import { fileContents } from "../utils/utils";

describe("Day 10", () => {
  describe("toInput", () => {
    it("should return a target and buttons", () => {
      const input =
        "[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}";
      const result = toInput(input);
      expect(result).toEqual({
        target: [0, 0, 0, 1, 0],
        curr: [0, 0, 0, 0, 0],
        output: [7, 5, 12, 7, 2],
        buttons: [
          [1, 0, 1, 1, 1],
          [0, 0, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 0, 0],
          [0, 1, 1, 1, 1],
        ],
      });
    });
  });

  describe("isAtTarget", () => {
    it("should return true", () => {
      const result = isAtTarget([1, 0, 1], [1, 0, 1]);
      expect(result).toBe(true);
    });
    it("should return false", () => {
      const result = isAtTarget([1, 0, 0], [1, 0, 1]);
      expect(result).toBe(false);
    });
  });

  describe("subsetsBitmask", () => {
    it("should return all subsets", () => {
      const input = [
        [1, 0, 1, 1, 1],
        [0, 0, 1, 1, 0],
        [1, 0, 0, 0, 1],
      ];
      const result = subsetsBitmask(input);
      expect(result).toEqual([
        [],
        [[1, 0, 1, 1, 1]],
        [[0, 0, 1, 1, 0]],
        [
          [1, 0, 1, 1, 1],
          [0, 0, 1, 1, 0],
        ],
        [[1, 0, 0, 0, 1]],
        [
          [1, 0, 1, 1, 1],
          [1, 0, 0, 0, 1],
        ],
        [
          [0, 0, 1, 1, 0],
          [1, 0, 0, 0, 1],
        ],
        [
          [1, 0, 1, 1, 1],
          [0, 0, 1, 1, 0],
          [1, 0, 0, 0, 1],
        ],
      ]);
    });
  });

  describe("toButtonCombinations", () => {
    it("should return button combinations", () => {
      const input = [
        [1, 0, 1, 1, 1],
        [0, 0, 1, 1, 0],
        [1, 0, 0, 0, 1],
      ];
      const result = toButtonCombinations(input);
      expect(result).toEqual([
        {
          button: [1, 0, 1, 1, 1],
          output: [1, 0, 1, 1, 1],
          count: 1,
        },
        {
          button: [0, 0, 1, 1, 0],
          output: [0, 0, 1, 1, 0],
          count: 1,
        },
        {
          button: [1, 0, 0, 0, 1],
          output: [1, 0, 2, 2, 1],
          count: 2,
        },
        {
          button: [1, 0, 0, 0, 1],
          output: [1, 0, 0, 0, 1],
          count: 1,
        },
        {
          button: [0, 0, 1, 1, 0],
          output: [2, 0, 1, 1, 2],
          count: 2,
        },
        {
          button: [1, 0, 1, 1, 1],
          output: [1, 0, 1, 1, 1],
          count: 2,
        },
      ]);
    });
  });

  describe("Part 1", () => {
    it("should return result for example for part 1", () => {
      const input = fileContents("day10/example.txt");
      const result = partOne(input);
      expect(result).toBe(7);
    });

    it("should return result for input", () => {
      const input = fileContents("day10/input.txt");
      const result = partOne(input);
      expect(result).toBe(466);
    });
  });

  describe("Part 2", () => {
    it("should return result for example for part 2", () => {
      const input = fileContents("day10/example.txt");
      const result = partTwo(input);
      expect(result).toBe(33);
    });

    it("should return result for input", () => {
      const input = fileContents("day10/input.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });
  });
});

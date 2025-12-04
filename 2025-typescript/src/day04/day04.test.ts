import { describe, it, expect } from "vitest";
import { countPaper, generateArray, partOne, partTwo } from "./day04";
import { fileContents } from "../utils/utils";

describe("Day 04", () => {
  describe("generateArray", () => {
    it("should generate an array", () => {
      const input = "@...\n@@.@\n.@@@\n@@@.";
      const result = generateArray(input);
      expect(result).toEqual([
        ["@", ".", ".", "."],
        ["@", "@", ".", "@"],
        [".", "@", "@", "@"],
        ["@", "@", "@", "."],
      ]);
    });
  });
  describe("countPaper", () => {
    it("should return the total count for paper when in the middle", () => {
      const input = [
        ["@", ".", ".", "."],
        ["@", "@", ".", "@"],
        [".", "@", "@", "@"],
        ["@", "@", "@", "."],
      ];
      const result = countPaper(input, { x: 1, y: 1 });
      expect(result).toEqual(4);
    });

    it("should return the total count for paper when on the edge", () => {
      const input = [
        ["@", ".", ".", "."],
        ["@", "@", ".", "@"],
        [".", "@", "@", "@"],
        ["@", "@", "@", "."],
      ];
      const result = countPaper(input, { x: 3, y: 1 });
      expect(result).toEqual(2);
    });
  });

  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day04/example.txt");
      const result = partOne(input);
      expect(result).toBe(13);
    });

    it("should return result for input", () => {
      const input = fileContents("day04/input.txt");
      const result = partOne(input);
      expect(result).toBe(1505);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day04/example.txt");
      const result = partTwo(input);
      expect(result).toBe(43);
    });

    it("should return result for input", () => {
      const input = fileContents("day04/input.txt");
      const result = partTwo(input);
      expect(result).toBe(9182);
    });
  });
});

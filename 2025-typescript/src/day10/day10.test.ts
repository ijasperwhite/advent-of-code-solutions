import { describe, it, expect } from "vitest";
import { partOne, partTwo, toInput } from "./day10";
import { fileContents } from "../utils/utils";

describe("Day 10", () => {
  describe("toInput", () => {
    it("should return a target and buttons", () => {
      const input =
        "[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}";
      const result = toInput(input);
      expect(result).toEqual({ target: [false, false, false, true, false] });
    });
  });

  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day10/example.txt");
      const result = partOne(input);
      expect(result).toBe(0);
    });

    it("should return result for input", () => {
      const input = fileContents("day10/input.txt");
      const result = partOne(input);
      expect(result).toBe(0);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day10/example.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });

    it("should return result for input", () => {
      const input = fileContents("day10/input.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });
  });
});

import { describe, it, expect } from "vitest";
import { explore, partOne, partTwo } from "./day07";
import { fileContents } from "../utils/utils";

describe("Day 07", () => {
  describe("explore", () => {
    it("should explore a simple list", () => {
      const result = explore(
        ["...S...", ".......", "..^....", "......."],
        2,
        0
      );
      expect(result).toBe(1);
    });

    it("should explore a simple list part 2", () => {
      const result = explore(
        ["...S...", ".......", "..^.^..", "......."],
        4,
        0
      );
      expect(result).toBe(1);
    });

    it("should explore a simple list part 3", () => {
      const input = [
        "...S...",
        ".......",
        "...^...",
        ".......",
        "..^.^..",
        ".......",
      ];
      const result = explore(input, 3, 0);
      expect(result).toBe(3);
    });
  });
  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day07/example.txt");
      const result = partOne(input);
      expect(result).toBe(21);
    });

    it("should return result for input", () => {
      const input = fileContents("day07/input.txt");
      const result = partOne(input);
      expect(result).toBe(1490);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day07/example.txt");
      const result = partTwo(input);
      expect(result).toBe(40);
    });

    it("should return result for input", () => {
      const input = fileContents("day07/input.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });
  });
});

import { describe, it, expect } from "vitest";
import { partOne, partTwo } from "./day03";
import { fileContents } from "../utils/utils";

describe("Day 03", () => {
  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day03/example.txt");
      const result = partOne(input);
      expect(result).toBe(0);
    });

    it("should return result for input", () => {
      const input = fileContents("day03/input.txt");
      const result = partOne(input);
      expect(result).toBe(0);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day03/example.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });

    it("should return result for input", () => {
      const input = fileContents("day03/input.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });
  });
});

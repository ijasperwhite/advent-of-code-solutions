import { describe, it, expect } from "vitest";
import { calculateSize, partOne, partTwo, toLocation } from "./day09";
import { fileContents } from "../utils/utils";

describe("Day 09", () => {
  describe("toLocation", () => {
    it("should return a location with x and y", () => {
      const result = toLocation("11,7");
      expect(result).toEqual({ x: 7, y: 11 });
    });
  });

  describe("calculateSize", () => {
    it("should return the distance when diff is 1", () => {
      const result = calculateSize({ x: 7, y: 3 }, { x: 2, y: 3 });
      expect(result).toBe(6);
    });
    it("should return the distance when diff is greater than 1", () => {
      const result = calculateSize({ x: 2, y: 5 }, { x: 11, y: 1 });
      expect(result).toBe(50);
    });
  });
  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day09/example.txt");
      const result = partOne(input);
      expect(result).toBe(50);
    });

    it("should return result for input", () => {
      const input = fileContents("day09/input.txt");
      const result = partOne(input);
      expect(result).toBe(0);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day09/example.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });

    it("should return result for input", () => {
      const input = fileContents("day09/input.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });
  });
});

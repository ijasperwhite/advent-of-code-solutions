import { describe, it, expect } from "vitest";
import { getValuesOrSymbols, partOne, partTwo } from "./day06";
import { fileContents } from "../utils/utils";

describe("Day 06", () => {
  describe("getValuesOrSymbols", () => {
    it("should return list of numbers", () => {
      const result = getValuesOrSymbols("55 66 789 12");
      expect(result).toEqual([55, 66, 789, 12]);
    });

    it("should return list of string", () => {
      const result = getValuesOrSymbols("* + * *");
      expect(result).toEqual(["*", "+", "*", "*"]);
    });

    it("should return empty list", () => {
      const result = getValuesOrSymbols("? - & %");
      expect(result).toEqual([]);
    });
  });

  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day06/example.txt");
      const result = partOne(input);
      expect(result).toBe(4277556);
    });

    it("should return result for input", () => {
      const input = fileContents("day06/input.txt");
      const result = partOne(input);
      expect(result).toBe(5877594983578);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day06/example.txt");
      const result = partTwo(input);
      expect(result).toBe(3263827);
    });

    it("should return result for input", () => {
      const input = fileContents("day06/input.txt");
      const result = partTwo(input);
      expect(result).toBe(11159825706149);
    });
  });
});

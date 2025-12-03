import { describe, it, expect } from "vitest";
import { getCrossOrNull, getWordOrNull, partOne, partTwo } from "./day04";
import { fileContents } from "../utils/utils";

describe("Day 04", () => {
  describe("getWordOrNull", () => {
    const input = [
      ["A", "B", "C", "D", "E"],
      ["F", "G", "H", "I", "J"],
      ["K", "L", "M", "N", "O"],
      ["P", "Q", "R", "S", "T"],
      ["U", "V", "W", "X", "Y"],
    ];
    it("should return word for scalar and length", () => {
      const result = getWordOrNull(input, { x: 2, y: 2 }, { x: 1, y: 1 }, 3);
      expect(result).toEqual("MSY");
    });
    it("should return word for scalar and length pt2", () => {
      const result = getWordOrNull(input, { x: 2, y: 2 }, { x: -1, y: 0 }, 3);
      expect(result).toEqual("MHC");
    });
    it("should return null for scalar and length pt2", () => {
      const result = getWordOrNull(input, { x: 1, y: 1 }, { x: -1, y: 0 }, 3);
      expect(result).toEqual(null);
    });
  });

  describe("getCrossOrNull", () => {
    const input = [
      ["A", "B", "C", "D", "E"],
      ["F", "G", "H", "I", "J"],
      ["K", "L", "M", "N", "O"],
      ["P", "Q", "R", "S", "T"],
      ["U", "V", "W", "X", "Y"],
    ];
    it("should return 2 values that are the cross", () => {
      const result = getCrossOrNull(input, { x: 2, y: 2 });
      expect(result).toEqual(["IMQ", "GMS"]);
    });

    it("should return null", () => {
      const result = getCrossOrNull(input, { x: 0, y: 2 });
      expect(result).toEqual(null);
    });
  });

  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day04/example.txt");
      const result = partOne(input);
      expect(result).toBe(18);
    });

    it("should return result for input", () => {
      const input = fileContents("day04/input.txt");
      const result = partOne(input);
      expect(result).toBe(2575);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day04/example.txt");
      const result = partTwo(input);
      expect(result).toBe(9);
    });

    it("should return result for input", () => {
      const input = fileContents("day04/input.txt");
      const result = partTwo(input);
      expect(result).toBe(2041);
    });
  });
});

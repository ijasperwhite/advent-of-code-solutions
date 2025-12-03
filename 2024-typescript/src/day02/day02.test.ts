import { describe, it, expect, test } from "vitest";
import { getReportSubsets, partOne, partTwo, stringToReport } from "./day02";
import { fileContents } from "../utils/utils";

describe("Day 02", () => {
  describe("stringToReport", () => {
    test("should return a list of numbers from a given string", () => {
      const input = "1 23 456";
      const result = stringToReport(input);
      expect(result).toEqual([1, 23, 456]);
    });
  });

  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day02/example.txt");
      const result = partOne(input);
      expect(result).toBe(2);
    });

    it("should return result for input", () => {
      const input = fileContents("day02/input.txt");
      const result = partOne(input);
      expect(result).toBe(463);
    });
  });

  describe("getReportSubsets", () => {
    it("should return subset rows", () => {
      const input = [1, 3, 2, 4, 5];
      const result = getReportSubsets(input);
      expect(result).toEqual([
        [3, 2, 4, 5],
        [1, 2, 4, 5],
        [1, 3, 4, 5],
        [1, 3, 2, 5],
        [1, 3, 2, 4],
      ]);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day02/example.txt");
      const result = partTwo(input);
      expect(result).toBe(4);
    });

    it("should return result for input", () => {
      const input = fileContents("day02/input.txt");
      const result = partTwo(input);
      expect(result).toBe(514);
    });
  });
});

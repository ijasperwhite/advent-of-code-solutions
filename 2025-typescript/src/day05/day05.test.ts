import { describe, it, expect } from "vitest";
import { isFresh, partOne, partTwo, toRangeOrId } from "./day05";
import { fileContents } from "../utils/utils";

describe("Day 05", () => {
  describe("toRangeOrId", () => {
    it("should return a single number", () => {
      const result = toRangeOrId("55");
      expect(result).toEqual(55);
    });
    it("should return null", () => {
      const result = toRangeOrId("");
      expect(result).toEqual(null);
    });
    it("should return a range", () => {
      const result = toRangeOrId("50-66");
      expect(result).toEqual({ first: 50, last: 66 });
    });
  });

  describe("isFresh", () => {
    it("should return true when id is within a range", () => {
      const result = isFresh(55, [
        { first: 1, last: 10 },
        { first: 40, last: 60 },
      ]);
      expect(result).toEqual(true);
    });
    it("should return false when id is not within a range", () => {
      const result = isFresh(15, [
        { first: 1, last: 10 },
        { first: 40, last: 60 },
      ]);
      expect(result).toEqual(false);
    });
  });

  describe("Part 1", () => {
    it("should return result for example part one", () => {
      const input = fileContents("day05/example.txt");
      const result = partOne(input);
      expect(result).toBe(3);
    });

    it("should return result for input part one", () => {
      const input = fileContents("day05/input.txt");
      const result = partOne(input);
      expect(result).toBe(613);
    });
  });

  describe("Part 2", () => {
    it("should return result for example part two", () => {
      const input = fileContents("day05/example.txt");
      const result = partTwo(input);
      expect(result).toBe(14);
    });

    it("should return result for input part two", () => {
      const input = fileContents("day05/input.txt");
      const result = partTwo(input);
      expect(result).toBe(336495597913098);
    });
  });
});

import { describe, it, expect } from "vitest";
import { fetchLocationIds, partOne, partTwo } from "./day00";
import { fileContents } from "../utils/utils";

describe("Day 0", () => {
  describe("Part 1", () => {
    it("should return first and second location ids", () => {
      const result = fetchLocationIds("61949   77417");
      expect(result).toEqual({ first: 61949, second: 77417 });
    });

    it("should return result for example", () => {
      const input = fileContents("day00/example.txt");
      const result = partOne(input);
      expect(result).toBe(11);
    });

    it("should return result for input", () => {
      const input = fileContents("day00/input.txt");
      const result = partOne(input);
      expect(result).toBe(1151792);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day00/example.txt");
      const result = partTwo(input);
      expect(result).toBe(31);
    });

    it("should return result for input", () => {
      const input = fileContents("day00/input.txt");
      const result = partTwo(input);
      expect(result).toBe(21790168);
    });
  });
});

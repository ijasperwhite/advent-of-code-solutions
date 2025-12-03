import { describe, it, expect } from "vitest";
import {
  getInvalidIds,
  getProductIds,
  partOne,
  partTwo,
  splitString,
} from "./day02";
import { fileContents } from "../utils/utils";

describe("Day 02", () => {
  describe("getProductIds", () => {
    it("should return a list of product ids", () => {
      const input = "11-22,95-115,998-1012";
      const result = getProductIds(input, true);
      expect(result).toEqual([
        { first: 11, last: 22, isPartOne: true },
        { first: 95, last: 115, isPartOne: true },
        { first: 998, last: 1012, isPartOne: true },
      ]);
    });
  });

  describe("getInvalidIds", () => {
    it("should return number of invalid ids", () => {
      const result = getInvalidIds({
        first: 446443,
        last: 446449,
        isPartOne: true,
      });
      expect(result).toEqual([446446]);
    });

    it("should return number of invalid ids pt 2", () => {
      const result = getInvalidIds({ first: 11, last: 22, isPartOne: true });
      expect(result).toEqual([11, 22]);
    });

    it("should return number of invalid ids pt 3", () => {
      const result = getInvalidIds({
        first: 998,
        last: 1012,
        isPartOne: false,
      });
      expect(result).toEqual([999, 1010]);
    });

    it("should return number of invalid ids pt 3", () => {
      const result = getInvalidIds({
        first: 824824821,
        last: 824824827,
        isPartOne: false,
      });
      expect(result).toEqual([824824824]);
    });

    it("should return number of invalid ids pt 4", () => {
      const result = getInvalidIds({
        first: 565653,
        last: 565659,
        isPartOne: false,
      });
      expect(result).toEqual([565656]);
    });
  });

  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day02/example.txt");
      const result = partOne(input);
      expect(result).toBe(1227775554);
    });

    it("should return result for input", () => {
      const input = fileContents("day02/input.txt");
      const result = partOne(input);
      expect(result).toBe(23701357374);
    });
  });

  describe("splitString", () => {
    it("should return strings of size 3", () => {
      const input = "123";
      const result = splitString(input, 1);
      expect(result).toEqual(["1", "2", "3"]);
    });
    it("should return strings of size 3", () => {
      const input = "123123123";
      const result = splitString(input, 3);
      expect(result).toEqual(["123", "123", "123"]);
    });

    it("should return strings of size 5", () => {
      const input = "123451234512345";
      const result = splitString(input, 5);
      expect(result).toEqual(["12345", "12345", "12345"]);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day02/example.txt");
      const result = partTwo(input);
      expect(result).toBe(4174379265);
    });

    it("should return result for input", () => {
      const input = fileContents("day02/input.txt");
      const result = partTwo(input);
      expect(result).toBe(34284458938);
    });
  });
});

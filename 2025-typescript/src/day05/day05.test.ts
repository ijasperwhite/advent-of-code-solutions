import { describe, it, expect } from "vitest";
import {
  isFresh,
  mergeRangeNew,
  mergeRanges,
  partOne,
  partTwo,
  toRangeOrId,
} from "./day05";
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
    it("should return result for example", () => {
      const input = fileContents("day05/example.txt");
      const result = partOne(input);
      expect(result).toBe(3);
    });

    it("should return result for input", () => {
      const input = fileContents("day05/input.txt");
      const result = partOne(input);
      expect(result).toBe(613);
    });
  });

  describe("mergeRanges", () => {
    it("should add new range when no overlap", () => {
      const result = mergeRanges({ first: 5, last: 9 }, [
        { first: 1, last: 4 },
        { first: 10, last: 15 },
      ]);
      expect(result).toEqual([
        { first: 1, last: 4 },
        { first: 5, last: 9 },
        { first: 10, last: 15 },
      ]); // done
    });

    it("should not add new range when inside existing one", () => {
      const result = mergeRanges({ first: 2, last: 3 }, [
        { first: 1, last: 4 },
        { first: 10, last: 15 },
      ]);
      expect(result).toEqual([
        { first: 1, last: 4 },
        { first: 10, last: 15 },
      ]); // done
    });

    it("should merge ranges when there is one overlap on new first", () => {
      const result = mergeRanges({ first: 4, last: 9 }, [
        { first: 1, last: 6 },
        { first: 10, last: 15 },
      ]);
      expect(result).toEqual([
        { first: 1, last: 9 },
        { first: 10, last: 15 },
      ]);
    });

    it("should merge ranges when there is one overlap on new last", () => {
      const result = mergeRanges({ first: 4, last: 9 }, [
        { first: 1, last: 3 },
        { first: 8, last: 15 },
      ]);
      expect(result).toEqual([
        { first: 1, last: 3 },
        { first: 4, last: 15 },
      ]);
    });

    it("should merge ranges when there is two overlap", () => {
      const result = mergeRanges({ first: 5, last: 9 }, [
        { first: 1, last: 2 },
        { first: 4, last: 6 },
        { first: 8, last: 11 },
      ]);
      expect(result).toEqual([
        { first: 1, last: 2 },
        { first: 4, last: 11 },
      ]);
    });
  });

  describe("mergeRangeNew", () => {
    it(" should return 2 when a<b", () => {
      const result = mergeRangeNew(
        { first: 8, last: 10 },
        { first: 15, last: 17 }
      );
      expect(result).toEqual([
        { first: 8, last: 10 },
        { first: 15, last: 17 },
      ]);
    });
    it(" should return 2 when a>b", () => {
      const result = mergeRangeNew(
        { first: 8, last: 10 },
        { first: 4, last: 6 }
      );
      expect(result).toEqual([
        { first: 8, last: 10 },
        { first: 4, last: 6 },
      ]);
    });

    it(" should return 1 when a>b", () => {
      const result = mergeRangeNew(
        { first: 2, last: 10 },
        { first: 4, last: 6 }
      );
      expect(result).toEqual([{ first: 2, last: 10 }]);
    });
    it(" should return 1 when a>>b", () => {
      const result = mergeRangeNew(
        { first: 5, last: 10 },
        { first: 4, last: 6 }
      );
      expect(result).toEqual([{ first: 4, last: 10 }]);
    });
    it(" should return 1 when a<b", () => {
      const result = mergeRangeNew(
        { first: 4, last: 6 },
        { first: 2, last: 10 }
      );
      expect(result).toEqual([{ first: 2, last: 10 }]);
    });
    it(" should return 1 when a<<b", () => {
      const result = mergeRangeNew(
        { first: 4, last: 6 },
        { first: 5, last: 10 }
      );
      expect(result).toEqual([{ first: 4, last: 10 }]);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day05/example.txt");
      const result = partTwo(input);
      expect(result).toBe(14);
    });

    it("should return result for input", () => {
      const input = fileContents("day05/input.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
      // too low 309930569780640
      // too low 309930569780555
      // too low 85737278392197
      // not     242052446985560
    });
  });
});

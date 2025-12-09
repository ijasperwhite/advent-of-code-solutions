import { describe, it, expect } from "vitest";
import {
  addCircuit,
  getAllShortest,
  getBatterShortestDistance,
  partOne,
  partTwo,
  toBattery,
  toDistance,
} from "./day08";
import { fileContents } from "../utils/utils";

describe("Day 08", () => {
  describe("toBattery", () => {
    it("should return a batter for provided string", () => {
      const result = toBattery("31026,22961,51059");
      expect(result).toEqual({ x: 31026, y: 22961, z: 51059 });
    });
  });

  describe("toDistance", () => {
    it("should return distance between two batteries", () => {
      const result = toDistance(
        { x: 162, y: 817, z: 812 },
        { x: 425, y: 690, z: 689 }
      );
      expect(result).toEqual(316);
    });
  });

  describe("getBatteryShortestDistance", () => {
    it("should return shortest distance for a battery when lower is 0", () => {
      const start = { x: 162, y: 817, z: 812 };
      const all = [
        { x: 57, y: 618, z: 57 },
        { x: 906, y: 360, z: 560 },
        { x: 162, y: 817, z: 812 },
        { x: 592, y: 479, z: 940 },
        { x: 352, y: 342, z: 300 },
        { x: 425, y: 690, z: 689 },
        { x: 984, y: 92, z: 344 },
      ];
      const result = getBatterShortestDistance(start, all, 0, []);
      expect(result).toEqual({
        start,
        end: { x: 425, y: 690, z: 689 },
        distance: 316,
      });
    });

    it("should return shortest distance for a battery when lower is 316", () => {
      const start = { x: 162, y: 817, z: 812 };
      const all = [
        { x: 57, y: 618, z: 57 },
        { x: 906, y: 360, z: 560 },
        { x: 162, y: 817, z: 812 },
        { x: 592, y: 479, z: 940 },
        { x: 352, y: 342, z: 300 },
        { x: 425, y: 690, z: 689 },
        { x: 984, y: 92, z: 344 },
      ];
      const result = getBatterShortestDistance(start, all, 316, []);
      expect(result).toEqual({
        start,
        end: { x: 592, y: 479, z: 940 },
        distance: 561,
      });
    });
  });

  describe("getAllShortest", () => {
    it("should return all shortest", () => {
      const all = [
        { x: 57, y: 618, z: 57 },
        { x: 906, y: 360, z: 560 },
        { x: 162, y: 817, z: 812 },
        { x: 592, y: 479, z: 940 },
        { x: 352, y: 342, z: 300 },
        { x: 425, y: 690, z: 689 },
        { x: 984, y: 92, z: 344 },
      ];
      const result = getAllShortest(all, 0, []);
      expect(result).toEqual([]);
    });
  });

  describe("addCircuit", () => {
    it("should add the new circuit to new item", () => {
      const result = addCircuit(
        {
          start: { x: 12, y: 15, z: 30 },
          end: { x: 10, y: 40, z: 32 },
          distance: 555,
        },
        []
      );
      expect(result).toEqual([new Set(["12,15,30", "10,40,32"])]);
    });
    it("should add the new circuit to existing item", () => {
      const result = addCircuit(
        {
          start: { x: 42, y: 76, z: 9 },
          end: { x: 12, y: 15, z: 30 },
          distance: 555,
        },
        [new Set(["2,5,90", "16,55,66"]), new Set(["12,15,30", "10,40,32"])]
      );
      expect(result).toEqual([
        new Set(["2,5,90", "16,55,66"]),
        new Set(["12,15,30", "10,40,32", "42,76,9"]),
      ]);
    });
  });

  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day08/example.txt");
      const result = partOne(input, 10);
      expect(result).toBe(40);
    });

    it("should return result for input", () => {
      const input = fileContents("day08/input.txt");
      const result = partOne(input, 1000);
      expect(result).toBe(0);
      // 49980 to low
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day08/example.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });

    it("should return result for input", () => {
      const input = fileContents("day08/input.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });
  });
});

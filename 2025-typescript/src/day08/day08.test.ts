import { describe, it, expect } from "vitest";
import { partOne, partTwo, toBattery, toDistance } from "./day08";
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
      expect(result).toEqual(316.90219311326956);
    });
  });

  describe("Part 1", () => {
    it("should return result for example part one", () => {
      const input = fileContents("day08/example.txt");
      const result = partOne(input, 10);
      expect(result).toBe(40);
    });

    it("should return result for input part one", () => {
      const input = fileContents("day08/input.txt");
      const result = partOne(input, 1000);
      expect(result).toBe(84968);
    });
  });

  describe("Part 2", () => {
    it("should return result for example for part two", () => {
      const input = fileContents("day08/example.txt");
      const result = partTwo(input);
      expect(result).toBe(25272);
    });

    it("should return result for input for part two", () => {
      const input = fileContents("day08/input.txt");
      const result = partTwo(input);
      expect(result).toBe(8663467782);
    });
  });
});

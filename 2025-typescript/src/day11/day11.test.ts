import { describe, it, expect } from "vitest";
import { partOne, partTwo, toNode } from "./day11";
import { fileContents } from "../utils/utils";

describe("Day 11", () => {
  describe("toLineNode", () => {
    it("should return a line node object", () => {
      const result = toNode("ccc: ddd eee fff");
      expect(result).toEqual({ curr: "ccc", edges: ["ddd", "eee", "fff"] });
    });
  });
  describe("Part 1", () => {
    it("should return result for example for part one", () => {
      const input = fileContents("day11/example.txt");
      const result = partOne(input);
      expect(result).toBe(5);
    });

    it("should return result for input for part one", () => {
      const input = fileContents("day11/input.txt");
      const result = partOne(input);
      expect(result).toBe(477);
    });
  });

  describe("Part 2", () => {
    it("should return result for example for part two", () => {
      const input = fileContents("day11/example_two.txt");
      const result = partTwo(input);
      expect(result).toBe(2);
    });

    it("should return result for input for part two", () => {
      const input = fileContents("day11/input_two.txt");
      const result = partTwo(input);
      expect(result).toBe(383307150903216);
    });
  });
});

import { describe, it, expect } from "vitest";
import {
  executeInstruction,
  getComputerInstructions,
  partOne,
  partTwo,
} from "./day03";
import { fileContents } from "../utils/utils";
import test from "node:test";

describe("Day 03", () => {
  describe("getComputerInstructions", () => {
    it("should return a computer instruction from string", () => {
      const input = "_not_mul(51,5)+muhDhf484mul(458,78)dw";
      const result = getComputerInstructions(input);
      expect(result).toEqual(["mul(51,5)", "mul(458,78)"]);
    });

    it("should get mul, do and don't instructions", () => {
      const input =
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
      const result = getComputerInstructions(input);
      expect(result).toEqual([
        "mul(2,4)",
        "don't()",
        "mul(5,5)",
        "mul(11,8)",
        "do()",
        "mul(8,5)",
      ]);
    });
  });

  describe("executeInstruction", () => {
    it("it should multiple values together", () => {
      const input = "mul(5,10)";
      const result = executeInstruction(input);
      expect(result).toEqual(50);
    });
  });

  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day03/example.txt");
      const result = partOne(input);
      expect(result).toBe(161);
    });

    it("should return result for input", () => {
      const input = fileContents("day03/input.txt");
      const result = partOne(input);
      expect(result).toBe(175700056);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input =
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
      const result = partTwo(input);
      expect(result).toBe(48);
    });

    it("should return result for input", () => {
      const input = fileContents("day03/input.txt");
      const result = partTwo(input);
      expect(result).toBe(71668682);
    });
  });
});

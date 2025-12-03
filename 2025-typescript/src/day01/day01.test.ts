import { describe, it, expect } from "vitest";
import { getNextDial, getNextTurn, partOne, partTwo } from "./day01";
import { fileContents } from "../utils/utils";

describe("Day 01", () => {
  describe("getNextTurn", () => {
    it("should return positive for right turn", () => {
      const input = "R15";
      const result = getNextTurn(input);
      expect(result).toBe(15);
    });

    it("should return negative for right turn", () => {
      const input = "L25";
      const result = getNextTurn(input);
      expect(result).toBe(-25);
    });
  });

  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day01/example.txt");
      const result = partOne(input);
      expect(result).toBe(3);
    });

    it("should return result for input", () => {
      const input = fileContents("day01/input.txt");
      const result = partOne(input);
      expect(result).toBe(1154);
    });
  });

  describe("Part 2", () => {
    describe("getNextDial", () => {
      it("should return when dial is above zero", () => {
        const result = getNextDial(50, 1000);
        expect(result).toEqual({ dial: 50, counter: 10 });
      });

      it("should return when dial is below zero", () => {
        const result = getNextDial(50, -300);
        expect(result).toEqual({ dial: 50, counter: 3 });
      });
    });

    it("should return result for example", () => {
      const input = fileContents("day01/example.txt");
      const result = partTwo(input);
      expect(result).toBe(6);
    });

    it("should return result for input", () => {
      const input = fileContents("day01/input.txt");
      const result = partTwo(input);
      expect(result).toBe(6819);
    });
  });
});

import { describe, it, expect } from "vitest";
import { partOne, partTwo, search } from "./day03";
import { fileContents } from "../utils/utils";

describe("Day 03", () => {
  describe("search", () => {
    describe("example one", () => {
      it("return the highest number for length 1", () => {
        const input = "818181911112111";
        const result = search(input, 1);
        expect(result).toEqual("9");
      });
      it("return the highest number for length 2", () => {
        const input = "818181911112111";
        const result = search(input, 2);
        expect(result).toEqual("92");
      });
      it("return the highest number for length 3", () => {
        const input = "818181911112111";
        const result = search(input, 3);
        expect(result).toEqual("921");
      });
    });
    describe("example two", () => {
      it("return the highest number for length 1", () => {
        const input = "234234234234278";
        const result = search(input, 1);
        expect(result).toEqual("8");
      });
      it("return the highest number for length 2", () => {
        const input = "234234234234278";
        const result = search(input, 2);
        expect(result).toEqual("78");
      });
      it("return the highest number for length 3", () => {
        const input = "234234234234278";
        const result = search(input, 3);
        expect(result).toEqual("478");
      });
    });

    describe("example three", () => {
      it("return the highest number for length 1", () => {
        const input = "811111111111119";
        const result = search(input, 1);
        expect(result).toEqual("9");
      });
      it("return the highest number for length 2", () => {
        const input = "811111111111119";
        const result = search(input, 2);
        expect(result).toEqual("89");
      });
      it("return the highest number for length 3", () => {
        const input = "811111111111119";
        const result = search(input, 3);
        expect(result).toEqual("819");
      });
    });
  });

  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day03/example.txt");
      const result = partOne(input);
      expect(result).toBe(357);
    });

    it("should return result for input part 1", () => {
      const input = fileContents("day03/input.txt");
      const result = partOne(input);
      expect(result).toBe(17095);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day03/example.txt");
      const result = partTwo(input);
      expect(result).toBe(3121910778619);
    });

    it("should return result for input", () => {
      const input = fileContents("day03/input.txt");
      const result = partTwo(input);
      expect(result).toBe(168794698570517);
    });
  });
});

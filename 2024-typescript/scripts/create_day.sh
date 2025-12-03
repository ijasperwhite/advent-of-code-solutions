#!/bin/bash

# Ensure the script receives exactly one argument
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <day_number>"
  exit 1
fi

# Get input argument
x="$1"

# Check if input is a number
if ! [[ "$x" =~ ^[0-9]+$ ]]; then
  echo "Error: Input must be a number."
  exit 1
fi

# Check length of number
if [ "${#x}" -eq 1 ]; then
  x="0$x"
elif [ "${#x}" -eq 2 ]; then
  x="$x"
else
  echo "Error: Input must be 1 or 2 digits only."
  exit 1
fi

# Define directory
dir="src/day${x}"

# Create directory
mkdir -p "$dir"

# Create files
touch "$dir/example.txt"
touch "$dir/input.txt"
touch "$dir/problem.txt"
touch "$dir/day${x}.ts"
touch "$dir/day${x}.test.ts"

echo "Created files in $dir:"
echo "- example.txt"
echo "- input.txt"
echo "- problem.txt"
echo "- day${x}.ts"
echo "- day${x}.test.ts"

cat <<EOF >> "$dir/day${x}.ts"
export const partOne = (s: string) => {
  return 0;
};

export const partTwo = (s: string) => {
  return 0;
};

EOF

cat <<EOF >> "$dir/day${x}.test.ts"
import { describe, it, expect } from "vitest";
import { partOne, partTwo } from "./day${x}";
import { fileContents } from "../utils/utils";

describe("Day ${x}", () => {
  describe("Part 1", () => {
    it("should return result for example", () => {
      const input = fileContents("day${x}/example.txt");
      const result = partOne(input);
      expect(result).toBe(0);
    });

    it("should return result for input", () => {
      const input = fileContents("day${x}/input.txt");
      const result = partOne(input);
      expect(result).toBe(0);
    });
  });

  describe("Part 2", () => {
    it("should return result for example", () => {
      const input = fileContents("day${x}/example.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });

    it("should return result for input", () => {
      const input = fileContents("day${x}/input.txt");
      const result = partTwo(input);
      expect(result).toBe(0);
    });
  });
});
EOF
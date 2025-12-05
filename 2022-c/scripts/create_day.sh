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
touch "$dir/day${x}.c"

echo "Created files in $dir:"
echo "- example.txt"
echo "- input.txt"
echo "- problem.txt"
echo "- day${x}.c"

cat <<EOF >> "$dir/day${x}.c"
#include <stdio.h>
#include <assert.h>

int P1_EXAMPLE_RESULT = 0;
int P1_INPUT_RESULT = 0;

int P2_EXAMPLE_RESULT = 0;
int P2_INPUT_RESULT = 0;

void test_equal(int expected, int actual, const char *test_name)
{
    if (expected == actual)
    {
        printf("✓ %s\n", test_name);
    }
    else
    {
        printf("✗ %s: expected %d, got %d\n", test_name, expected, actual);
    }
}

int main()
{
    test_equal(P1_EXAMPLE_RESULT, 1, "Day${x} part 1 example result");
    test_equal(P1_INPUT_RESULT, 0, "Day${x} part 1 input result");

    test_equal(P2_EXAMPLE_RESULT, 0, "Day${x} part 2 example result");
    test_equal(P2_INPUT_RESULT, 0, "Day${x} part 2 input result");

    printf("All tests passed!\n");
    return 0;
}


EOF

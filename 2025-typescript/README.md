# advent-of-code-2025-typescript

## Useful links

- [Advent of code about](https://adventofcode.com/2025/about)
- [Advent of code subreddit](https://www.reddit.com/r/adventofcode/)

## Getting started

To install dev dependencies run:

```
npm install
```

## Starting a new day

Quickly set up the files needed to write your code for a new day by running script `scripts/create_day.sh`

Command:

```bash
npm run create:day -- 7
```

Output:

```txt
> advent-of-code-2025-typescript@1.0.0 create:day
> ./scripts/create_day.sh 7

Created files in src/day07:
- example.txt
- input.ts
- day07.ts
- day07.test.ts
```

If like me, you work offline on the train down on thursday, you can paste the text for the problem into `problem.txt`.
Advent of code will provide an `example` and an `input` for each of a day. Copy and paste the contents of these files into `example.txt` and `input.txt`.
The example solution is generally provided, while the input you must calculate the answer.

All `problem.txt`, `example.txt` and `input.txt` files are ignored by git, as per the Advent of Code stats puzzle inputs can not be redistributed https://adventofcode.com/2024/about.

## Testing your result

Once you are ready to check that your code works, you can put the result for the example case into your part1/part2 example these case and run the tests for the current day:

Run tests for a specific day:

```bash
npm run test day01
```

If this passes it is likely your part two test will be correct. Copy the received output from the failed input test into advent of code and submit your answer.

```
- Expected
+ Received

- 0
+ 1151792 <== your answer
```

**NOTE:** Advent of code input files are generated per user, so your results might be different. Therefore just because developer A got `1122` for a problem does not mean that developer B will get the same from their input, there might get result `3344`.

## Advent of code FAQs

See source: https://adventofcode.com/2025/about

### Should I use AI to solve Advent of Code puzzles?

No. If you send a friend to the gym on your behalf, would you expect to get stronger? Advent of Code puzzles are designed to be interesting for humans to solve - no consideration is made for whether AI can or cannot solve a puzzle. If you want practice prompting an AI, there are almost certainly better exercises elsewhere designed with that in mind.

### Can I copy/redistribute part of Advent of Code?

Please don't. Advent of Code is free to use, not free to copy. If you're posting a code repository somewhere, please don't include parts of Advent of Code like the puzzle text or your inputs. If you're making a website, please don't make it look like Advent of Code or name it something similar.

### Why was this puzzle so easy / hard?

The difficulty and subject matter varies throughout each event. Very generally, the puzzles get more difficult over time, but your specific skill set will make each puzzle significantly easier or harder for you than someone else. Making puzzles is tricky.

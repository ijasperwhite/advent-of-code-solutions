// PART ONE

type Row = {
  dest: number;
  source: number;
  range: number;
};

export const toRow = (s: string): Row => {
  const n = s.match(/\d+/g)!!;
  return {
    dest: Number(n[0]),
    source: Number(n[1]),
    range: Number(n[2]),
  };
};

export const getDestMap = (
  allowed: number[],
  rows: Row[]
): Map<number, number> => {
  const map = new Map<number, number>();
  rows.forEach((r) => {
    const fil = allowed.filter((a) => a >= r.source && a <= r.source + r.range);
    [...new Array(fil.length)].forEach((_, i) => {
      map.set(fil[i], r.dest + fil[i] - r.source);
    });
  });
  return map;
};

export const nextList = (
  values: number[],
  map: Map<number, number>
): number[] => {
  let final: number[] = [];
  values.forEach((e) => {
    if (map.has(e)) {
      final.push(map.get(e)!!);
      return;
    }
    final.push(e);
  });
  return final;
};

export const formatInput = (s: string) => {
  return s
    .split("\n")
    .filter((_, i) => i > 0)
    .map(toRow);
};

export const solveOne = (s: string): number => {
  const rounds = s.split("\n\n");
  const seeds = rounds[0].match(/\d+/g)?.map(Number)!!;
  const result: number[] = [...new Array(rounds.length - 1)].reduce(
    (prev, _, i) => {
      const rows = formatInput(rounds[i + 1]);
      const map = getDestMap(prev, rows);
      const next = nextList(prev, map);
      return next;
    },
    seeds
  );
  return Math.min(...result);
};

// PART TWO

export const getSeedRows = (s: string): Row[] => {
  const output: Row[] = [];
  const ranges = s.match(/\d+\s\d+/g);
  ranges?.forEach((e) => {
    const split = e.split(" ");
    const start = Number(split[0]);
    const count = Number(split[1]);
    output.push({ source: start, dest: start, range: count });
  });
  return output;
};

export const nextRow = (prev: Row, curr: Row): Row[] => {
  if (
    prev.source < curr.source &&
    prev.source + prev.range > curr.source + curr.range
  ) {
    // if mapping apply's to inner bound
    return [
      { source: curr.dest, dest: curr.dest, range: curr.range }, // mapped
      {
        source: prev.source,
        dest: prev.source,
        range: curr.source - prev.source - 1,
      }, // mapped left
      {
        source: curr.source + curr.range,
        dest: curr.source + curr.range,
        range: prev.range - (curr.source - prev.source) - 2,
      }, // mapped right
    ];
  } else if (
    prev.source >= curr.source &&
    prev.source + prev.range <= curr.source + curr.range
  ) {
    // the prev is within curr, return 1 item
    return [{ source: curr.dest, dest: curr.dest, range: prev.range }]; // mapped middle
  } else if (
    prev.source < curr.source &&
    prev.source + prev.range >= curr.source &&
    prev.source + prev.range < curr.source + curr.range
  ) {
    // keep left, map mid, drop right
    return [
      {
        // unmapped values
        source: prev.source,
        dest: prev.source,
        range: curr.source - prev.source,
      },
      {
        // mapped values right
        source: curr.dest,
        dest: curr.dest,
        range: prev.source + prev.range - curr.source,
      },
    ];
  } else if (
    prev.source > curr.source &&
    curr.source + curr.range >= prev.source &&
    prev.source + prev.range > curr.source + curr.range
  ) {
    // drop left, map mid, keep right
    return [
      {
        // mapped
        source: curr.dest,
        dest: curr.dest,
        range: curr.source + curr.range - prev.source,
      },
      {
        // unmapped values
        source: curr.source + curr.range - 1,
        dest: curr.source + curr.range - 1,
        range: prev.source + prev.range - (curr.source + curr.range),
      },
    ];
    return [];
  } else {
    // no overlap
    return [{ source: prev.dest, dest: prev.dest, range: prev.range }];
  }
};

export const applyMapping = (prevRows: Row[], currRows: Row[]): Row[][] => {
  return prevRows.map((p) => {
    // only apply to first filter?
    return currRows.flatMap((c) => {
      const n = nextRow(p, c);
      return n;
    });
  });
  // once this is done we clean up the overlaps ?
};

export const solveTwo = (s: string): number => {
  const rounds = s.split("\n\n");
  const seedRows = getSeedRows(rounds[0]);
  const result: Row[] = [...new Array(rounds.length - 1)].reduce(
    (prev, _, i) => {
      const rows = formatInput(rounds[i + 1]);
      const next = applyMapping(prev, rows);
      return next;
    },
    seedRows
  );
  const sorted = result
    .filter((a) => a.range > 1)
    .sort((a, b) => a.dest - b.dest);
  console.log(sorted);
  return Math.min(...result.map((a) => a.source));
};

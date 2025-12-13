type Node = {
  curr: string;
  edges: string[];
};

export const toNode = (s: string): Node => {
  const match = s.match(/\w{3}/g);
  if (!match) throw new Error("error here");
  return {
    curr: String(match[0]),
    edges: match.slice(1, match.length).map(String),
  };
};

export const partOne = (s: string) => {
  const nodes: string[] = [];
  const edges = new Map<string, string[]>();
  s.split("\n").forEach((i) => {
    const node = toNode(i);
    nodes.push(node.curr);
    edges.set(node.curr, node.edges);
  });

  const stack: string[] = [];
  stack.push(nodes[nodes.findIndex((i) => i === "you")]);
  let counter = 0;

  while (stack.length > 0) {
    const next = stack.pop()!;
    const nextEdges = edges.get(next)!;
    nextEdges.forEach((i) => (i === "out" ? counter++ : stack.push(i)));
  }

  return counter;
};

export const partTwo = (s: string) => {
  const nodes: string[] = [];
  const edges = new Map<string, string[]>();
  s.split("\n").forEach((i) => {
    const node = toNode(i);
    nodes.push(node.curr);
    edges.set(node.curr, node.edges);
  });

  const cache = new Map<string, number>();

  const explore = (
    node: string,
    fftPass: boolean,
    dacPass: boolean
  ): number => {
    console.log("processing", fftPass, dacPass);
    if (cache.has(node)) {
      return cache.get(node)!;
    }
    if (node === "out") {
      console.log("new ending");
      if (fftPass && dacPass) {
        return 1;
      }
      return 0;
    }
    const next = edges.get(node)!;
    return next
      .map((nextNode) => {
        if (cache.has(nextNode)) {
          return cache.get(nextNode)!;
        }
        fftPass = fftPass ? fftPass : nextNode === "fft";
        dacPass = dacPass ? dacPass : nextNode === "dac";
        const key = explore(nextNode, fftPass, dacPass);
        cache.set(nextNode, key);
        return key;
      })
      .reduce((sum, next) => sum + next);
  };

  const x = explore("svr", false, false);
  console.log(cache);
  return x;
};

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
  const stack: string[] = [];
  stack.push(nodes[nodes.findIndex((i) => i === "you")]);
  let counter = 0;

  while (stack.length > 0) {
    const next = stack.pop()!;
    const nextEdges = edges.get(next)!;
    nextEdges.forEach((i) => (i === "out" ? counter++ : stack.push(i)));
  }

  return 0;
};

const createSignalChain = (nodes, track) =>
  nodes.reduce((acc, node) => acc.connect(node), track);

export { createSignalChain };

const createSignalChain = (nodes, track) =>
  nodes.reduce((acc, node) => acc.connect(node), track);

function modifySignalChain({ track, fixed, signalChain }) {
  const newChain = signalChain.reduce(
    (acc, next) => [...acc, ...next.nodes],
    []
  );

  createSignalChain([...newChain, ...fixed], track);
}

export { createSignalChain, modifySignalChain };

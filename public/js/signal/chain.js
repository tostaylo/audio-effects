const createSignalChain = (nodes, track) =>
  nodes.reduce((acc, node) => acc.connect(node), track);

function modifySignalChain({ track, fixed, signalChain }) {
  console.log({ signalChain });
  const newChain = signalChain.reduce(
    (acc, next) => [...acc, ...next.nodes],
    []
  );

  console.log({ newChain });

  createSignalChain([...newChain, ...fixed], track);
}

export { createSignalChain, modifySignalChain };

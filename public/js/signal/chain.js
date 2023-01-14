const createSignalChain = ({ nodes, track }) =>
  nodes.reduce((acc, node) => acc.connect(node), track);

function modifySignalChain({ track, fixed, signalChain }) {
  const newChain = signalChain.reduce(
    (acc, next) => [...acc, ...next.nodes],
    []
  );

  createSignalChain({ nodes: [...newChain, ...fixed], track });
}

function disconnectSignalChain({ signalChainStore, fixed }) {
  const reversedStore = [...signalChainStore.getState()].reverse();
  const reversedFixed = [...fixed].reverse();
  [...reversedFixed].forEach((node) => node.disconnect());
  [...reversedStore].forEach((node) => {
    const reversed = [...node.nodes].reverse();
    reversed.forEach((node) => node.disconnect());
  });
}

export { createSignalChain, modifySignalChain, disconnectSignalChain };

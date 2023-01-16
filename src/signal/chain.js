const createSignalChain = ({ nodes, track }) =>
  nodes.reduce((acc, node) => acc.connect(node), track);

function modifySignalChain({ track, signalChain }) {
  const nodes = signalChain.reduce(
    (acc, next) => (next.nodes ? [...acc, ...next.nodes] : [...acc, next]),
    []
  );

  createSignalChain({ nodes, track });
}

function disconnectSignalChain({ signalChainStore }) {
  const reversedStore = [...signalChainStore].reverse();
  [...reversedStore].forEach((node) => {
    if (node.nodes) {
      const reversed = [...node.nodes].reverse();
      reversed.forEach((node) => node.disconnect());
    } else {
      node.disconnect();
    }
  });
}

export { createSignalChain, modifySignalChain, disconnectSignalChain };

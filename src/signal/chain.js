// some nodes have a nodes property which is the reason for the conditionals
const createSignalChain = ({ nodes, track }) =>
  nodes.reduce(
    (acc, node) =>
      node.nodes
        ? createSignalChain({ nodes: node.nodes, track })
        : acc.connect(node),
    track
  );

function modifySignalChain({ track, signalChain }) {
  const nodes = signalChain.reduce(
    (acc, next) => (next.nodes ? [...acc, ...next.nodes] : [...acc, next]),
    []
  );

  createSignalChain({ nodes, track });
}

function disconnectSignalChain({ signalChain }) {
  const reversedStore = [...signalChain].reverse();
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

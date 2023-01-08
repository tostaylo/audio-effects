function signalChainNode(data, pos) {
  return {
    pos,
    type: data?.type,
    nodes: data?.nodes,
  };
}

export { signalChainNode as default };

function signalChainNode(data, pos) {
  return {
    id: data?.id,
    type: data?.type,
    nodes: data?.nodes,
    pos,
  };
}

export { signalChainNode as default };

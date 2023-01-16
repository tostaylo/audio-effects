function signalChainNode({ id, type, nodes }, pos) {
  return {
    id,
    type,
    nodes,
    pos,
  };
}

export { signalChainNode as default };

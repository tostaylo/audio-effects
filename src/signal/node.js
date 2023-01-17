function signalChainNode({ id, type, nodes, params }, pos) {
  return {
    id,
    type,
    nodes,
    pos,
    params,
  };
}

export { signalChainNode as default };

function audioGraphNode(data, pos) {
  return {
    pos,
    type: data?.type,
    nodes: data?.nodes,
  };
}

export { audioGraphNode as default };

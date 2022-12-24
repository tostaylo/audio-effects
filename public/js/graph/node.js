function audioGraphNode(node, pos) {
  return {
    pos,
    type: node?.type,
  };
}

export { audioGraphNode as default };

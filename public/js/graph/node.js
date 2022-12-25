function audioGraphNode(node, pos) {
  return {
    pos,
    type: node?.type,
    node,
  };
}

export { audioGraphNode as default };

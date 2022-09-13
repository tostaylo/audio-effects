function audioGraphNode(node, pos) {
  return {
    pos,
    type: node?.name,
  };
}

export default audioGraphNode;

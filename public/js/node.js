function node(audioNode, pos) {
  return {
    pos,
    type: audioNode?.name,
  };
}

export default node;

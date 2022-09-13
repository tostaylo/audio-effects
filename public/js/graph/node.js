const audioNodeNames = {
  reverb: 'reverb',
  gain: 'gain',
  convolver: 'convolver',
};

function audioGraphNode(node, pos) {
  return {
    pos,
    type: node?.type,
  };
}

export { audioGraphNode as default, audioNodeNames };

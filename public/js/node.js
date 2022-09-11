function getNodeType(node) {
  switch (node.constructor) {
    case GainNode: {
      return 'Gain';
    }
    case ConvolverNode: {
      return 'Convolver';
    }
  }
}

function node(audioNode, pos) {
  return {
    pos,
    type: getNodeType(audioNode),
  };
}

export default node;

// need to create interface for a node which allows connecting, disconnecting, keeping track of where the node is in the signal chain

function graphReducer(graph = [], action) {
  switch (action.type) {
    case 'connect':
      return [
        ...graph.slice(0, action.node.pos),
        action.node,
        ...graph.slice(action.node.pos),
      ];
    case 'disconnect':
      return graph
        .filter((node) => node.pos !== action.pos)
        .map((node, idx) => ({ ...node, pos: idx }));
    default:
      return graph;
  }
}

export default graphReducer;

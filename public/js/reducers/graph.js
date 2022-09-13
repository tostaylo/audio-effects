import { GRAPH } from '../actions';

function graphReducer(graph = [], action) {
  switch (action.type) {
    case GRAPH.CONNECT:
      return [
        ...graph.slice(0, action.node.pos),
        action.node,
        ...graph.slice(action.node.pos),
      ];
    case GRAPH.DISCONNECT:
      return graph
        .filter((node) => node.pos !== action.node.pos)
        .map((node, idx) => ({ ...node, pos: idx }));
    default:
      return graph;
  }
}

export default graphReducer;

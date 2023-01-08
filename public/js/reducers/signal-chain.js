import { SIGNALCHAIN } from '../actions';

// TODO: Rename to SignalChain Reducer

function signalChainReducer(signalChain = [], action) {
  switch (action.type) {
    case SIGNALCHAIN.CONNECT:
      return [
        ...signalChain.slice(0, action.node.pos),
        action.node,
        ...signalChain.slice(action.node.pos),
      ];
    case SIGNALCHAIN.DISCONNECT:
      return signalChain
        .filter((node) => node.pos !== action.node.pos)
        .map((node, idx) => ({ ...node, pos: idx }));
    default:
      return signalChain;
  }
}

export default signalChainReducer;

/* eslint-disable no-case-declarations */
import { SIGNALCHAIN } from '../actions';

function sortByPositionAsc(signalChain) {
  return [...signalChain].sort((a, b) => a.pos - b.pos);
}

function signalChainReducer(signalChain = [], action) {
  switch (action.type) {
    case SIGNALCHAIN.CONNECT:
      const newLongerChain = [
        ...signalChain.slice(0, action.node.pos),
        action.node,
        ...signalChain.slice(action.node.pos),
      ];

      return sortByPositionAsc(newLongerChain);
    case SIGNALCHAIN.DISCONNECT:
      const filteredChain = signalChain
        .filter((node) => node.pos !== action.pos)
        .map((node) => ({ ...node, pos: node.pos }));

      return sortByPositionAsc(filteredChain);
    default:
      return signalChain;
  }
}

export default signalChainReducer;

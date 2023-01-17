import { signalChainNode } from '../index';

export const signalChainNodes = {
  reverb: (pos) =>
    signalChainNode({ type: 'reverb', id: 'reverb-fasf', nodes: [] }, pos),
  gain: (pos) =>
    signalChainNode(
      { type: 'gain', id: 'gain-adlfasf', nodes: [], params: ['gain'] },
      pos
    ),
  convolver: (pos) =>
    signalChainNode(
      { type: 'convolver', id: 'convolver-adlf', nodes: [] },
      pos
    ),
  fuzz: (pos) =>
    signalChainNode({ type: 'fuzz', id: 'fuzz-ad34f', nodes: [] }, pos),
};

import { signalChainNode } from '../index';

export const signalChainNodes = {
  reverb: (pos?: number) =>
    signalChainNode({ type: 'reverb', id: 'reverb-fasf', nodes: [] }, pos),
  gain: (pos?: number) =>
    signalChainNode({ type: 'gain', id: 'gain-adlfasf', nodes: [] }, pos),
  convolver: (pos?: number) =>
    signalChainNode(
      { type: 'convolver', id: 'convolver-adlf', nodes: [] },
      pos
    ),
  fuzz: (pos?: number) =>
    signalChainNode({ type: 'fuzz', id: 'fuzz-ad34f', nodes: [] }, pos),
};

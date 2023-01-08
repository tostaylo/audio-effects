import { signalChainNode } from '../signal';
import { SIGNALCHAIN } from '../actions';
import signalChainStore from './signal-chain';

const audioNodeNames = {
  reverb: 'reverb',
  gain: 'gain',
  convolver: 'convolver',
  fuzz: 'fuzz',
};

describe('signalChainStore', () => {
  test('given no audio nodes, should initalize to an empty array', () => {
    expect(signalChainStore.getState()).toEqual([]);
  });

  test('given an empty store, when a CONNECT action is dispatched, should contain one audio node', () => {
    // arrange
    const gainNode = signalChainNode({ type: audioNodeNames.gain }, 0);
    const connect = {
      type: SIGNALCHAIN.CONNECT,
      node: gainNode,
    };

    // act
    signalChainStore.dispatch(connect);

    // assert
    expect(signalChainStore.getState()).toHaveLength(1);
    expect(signalChainStore.getState()).toEqual([gainNode]);
  });
});

import { signalChainNodes } from '../signal/fixtures/signalChainNodes';
import { SIGNALCHAIN } from '../actions';
import signalChainStore from './signal-chain';

describe('signalChainStore', () => {
  test('given no audio nodes, should initalize to an empty array', () => {
    expect(signalChainStore.getState()).toEqual([]);
  });

  test('given an empty store, when a CONNECT action is dispatched, should contain one audio node', () => {
    // arrange
    const connect = {
      type: SIGNALCHAIN.CONNECT,
      node: signalChainNodes.gain(0),
    };

    // act
    signalChainStore.dispatch(connect);

    // assert
    expect(signalChainStore.getState()).toHaveLength(1);
    expect(signalChainStore.getState()).toEqual([signalChainNodes.gain(0)]);
  });
});

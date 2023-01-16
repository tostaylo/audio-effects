import { signalChainNodes } from '../signal/fixtures/signalChainNodes';
import { SIGNALCHAIN } from '../actions';
import { createStore } from 'redux';
import { signalChainReducer } from '../reducers';

describe('signalChainStore', () => {
  test('given no audio nodes, should initalize to an empty array', () => {
    const store = createStore(signalChainReducer);
    expect(store.getState()).toEqual([]);
  });

  test('given an empty store, when a CONNECT action is dispatched, should contain one audio node', () => {
    const store = createStore(signalChainReducer);

    const connect = {
      type: SIGNALCHAIN.CONNECT,
      node: signalChainNodes.gain(0),
    };

    store.dispatch(connect);

    expect(store.getState()).toHaveLength(1);
    expect(store.getState()).toEqual([signalChainNodes.gain(0)]);
  });

  test('given an empty store, it can handle multiple CONNECTS and DISCONNECTS, showing the correct effects in the store in the correct order', () => {
    const store = createStore(signalChainReducer);

    const gainNode = signalChainNodes.gain(0);
    const reverbNode = signalChainNodes.reverb(1);
    const convolverNode = signalChainNodes.convolver(2);
    const fuzzNode = signalChainNodes.fuzz(3);

    [reverbNode, gainNode, fuzzNode, convolverNode].forEach((effectNode) => {
      store.dispatch({
        type: SIGNALCHAIN.CONNECT,
        node: effectNode,
      });
    });

    expect(store.getState()).toEqual([
      gainNode,
      reverbNode,
      convolverNode,
      fuzzNode,
    ]);

    store.dispatch({
      type: SIGNALCHAIN.DISCONNECT,
      pos: convolverNode.pos,
    });

    expect(store.getState()).toEqual([gainNode, reverbNode, fuzzNode]);

    store.dispatch({
      type: SIGNALCHAIN.CONNECT,
      node: convolverNode,
    });

    expect(store.getState()).toEqual([
      gainNode,
      reverbNode,
      convolverNode,
      fuzzNode,
    ]);

    store.dispatch({
      type: SIGNALCHAIN.DISCONNECT,
      pos: reverbNode.pos,
    });

    store.dispatch({
      type: SIGNALCHAIN.DISCONNECT,
      pos: fuzzNode.pos,
    });

    expect(store.getState()).toEqual([gainNode, convolverNode]);
    expect(store.getState()).not.toEqual([reverbNode, convolverNode]);
  });
});

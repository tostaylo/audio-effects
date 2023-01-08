import signalChainReducer from './signal-chain.js';
import { signalChainNode } from '../signal';
import { SIGNALCHAIN } from '../actions';

const audioNodeNames = {
  reverb: 'reverb',
  gain: 'gain',
  convolver: 'convolver',
  fuzz: 'fuzz',
};

describe('signalChainReducer', () => {
  test('given initial empty signalChain we can connect one node', () => {
    // arrange
    const initialsignalChain = [];
    const gainNode = signalChainNode({ type: audioNodeNames.gain }, 0);

    // act
    const newsignalChain = signalChainReducer(initialsignalChain, {
      type: SIGNALCHAIN.CONNECT,
      node: gainNode,
    });

    // assert
    expect(newsignalChain).toHaveLength(1);
    expect(newsignalChain[0].type).toBe(audioNodeNames.gain);
    expect(newsignalChain[0].pos).toEqual(0);
  });

  test('given initial signalChain with one node we can connect another node', () => {
    // arrange
    const gainNode = signalChainNode({ type: audioNodeNames.gain }, 0);
    const initialsignalChain = [gainNode];

    const reverbNode = signalChainNode({ type: audioNodeNames.reverb }, 1);

    // act
    const newsignalChain = signalChainReducer(initialsignalChain, {
      type: SIGNALCHAIN.CONNECT,
      node: reverbNode,
    });

    // assert
    expect(newsignalChain).toHaveLength(2);
    expect(newsignalChain[0].pos).toEqual(0);
    expect(newsignalChain[1].pos).toEqual(1);
  });

  test('given initial signalChain with two nodes we can disconnect the correct node', () => {
    // arrange
    const gainNode = signalChainNode({ type: audioNodeNames.gain }, 0);
    const reverbNode = signalChainNode({ type: audioNodeNames.reverb }, 1);

    const initialsignalChain = [gainNode, reverbNode];

    // act
    const newsignalChain = signalChainReducer(initialsignalChain, {
      type: SIGNALCHAIN.DISCONNECT,
      node: gainNode,
    });

    // assert
    expect(newsignalChain).toHaveLength(1);
    expect(newsignalChain[0].type).toBe(audioNodeNames.reverb);
    expect(newsignalChain[0].pos).toEqual(0);
  });

  test('given initial signalChain with three nodes we can disconnect the correct node', () => {
    // arrange
    const gainNode = signalChainNode({ type: audioNodeNames.gain }, 0);
    const reverbNode = signalChainNode({ type: audioNodeNames.reverb }, 1);
    const convolverNode = signalChainNode(
      { type: audioNodeNames.convolver },
      2
    );

    const initialsignalChain = [gainNode, reverbNode, convolverNode];

    // act
    const newsignalChain = signalChainReducer(initialsignalChain, {
      type: SIGNALCHAIN.DISCONNECT,
      node: reverbNode,
    });

    // assert
    expect(newsignalChain).toHaveLength(2);
    expect(newsignalChain[0].type).toBe(audioNodeNames.gain);
    expect(newsignalChain[1].type).toBe('convolver');
    expect(newsignalChain[0].pos).toEqual(0);
    expect(newsignalChain[1].pos).toEqual(1);
  });
});

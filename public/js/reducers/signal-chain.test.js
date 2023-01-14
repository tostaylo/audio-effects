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
  test('given initial empty graph we can connect one node', () => {
    // arrange
    const initialGraph = [];
    const gainNode = signalChainNode({ type: audioNodeNames.gain }, 0);

    // act
    const newGraph = signalChainReducer(initialGraph, {
      type: SIGNALCHAIN.CONNECT,
      node: gainNode,
    });

    // assert
    expect(newGraph).toHaveLength(1);
    expect(newGraph[0].type).toBe(audioNodeNames.gain);
    expect(newGraph[0].pos).toEqual(0);
  });

  test('given initial graph with one node we can connect another node', () => {
    // arrange
    const gainNode = signalChainNode({ type: audioNodeNames.gain }, 0);
    const initialGraph = [gainNode];

    const reverbNode = signalChainNode({ type: audioNodeNames.reverb }, 1);

    // act
    const newGraph = signalChainReducer(initialGraph, {
      type: SIGNALCHAIN.CONNECT,
      node: reverbNode,
    });

    // assert
    expect(newGraph).toHaveLength(2);
    expect(newGraph[0].pos).toEqual(0);
    expect(newGraph[1].pos).toEqual(1);
  });

  test('given initial graph with two nodes we can disconnect the correct node', () => {
    // arrange
    const gainNode = signalChainNode({ type: audioNodeNames.gain }, 0);
    const reverbNode = signalChainNode({ type: audioNodeNames.reverb }, 1);

    const initialGraph = [gainNode, reverbNode];

    // act
    const newGraph = signalChainReducer(initialGraph, {
      type: SIGNALCHAIN.DISCONNECT,
      pos: 0,
    });

    // assert
    expect(newGraph).toHaveLength(1);
    expect(newGraph[0].type).toBe(audioNodeNames.reverb);
    expect(newGraph[0].pos).toEqual(0);
  });

  test('given initial graph with three nodes we can disconnect the correct node', () => {
    // arrange
    const gainNode = signalChainNode({ type: audioNodeNames.gain }, 0);
    const reverbNode = signalChainNode({ type: audioNodeNames.reverb }, 1);
    const convolverNode = signalChainNode(
      { type: audioNodeNames.convolver },
      2
    );

    const initialGraph = [gainNode, reverbNode, convolverNode];

    // act
    const newGraph = signalChainReducer(initialGraph, {
      type: SIGNALCHAIN.DISCONNECT,
      pos: 1,
    });

    // assert
    expect(newGraph).toHaveLength(2);
    expect(newGraph[0].type).toBe(audioNodeNames.gain);
    expect(newGraph[1].type).toBe('convolver');
    expect(newGraph[0].pos).toEqual(0);
    expect(newGraph[1].pos).toEqual(1);
  });
});

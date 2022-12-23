import graphReducer from './graph.js';
import { audioGraphNode } from '../graph';
import { audioNodeNames } from '../graph/node';
import { GRAPH } from '../actions';

describe('graphReducer', () => {
  test('given initial empty graph we can connect one node', () => {
    // arrange
    const initialGraph = [];
    const gainNode = audioGraphNode({ type: audioNodeNames.gain }, 0);

    // act
    const newGraph = graphReducer(initialGraph, {
      type: GRAPH.CONNECT,
      node: gainNode,
    });

    // assert
    expect(newGraph).toHaveLength(1);
    expect(newGraph[0].type).toBe(audioNodeNames.gain);
  });

  test('given initial graph with one node we can connect another node', () => {
    // arrange
    const gainNode = audioGraphNode({ type: audioNodeNames.gain }, 0);
    const initialGraph = [gainNode];

    const reverbNode = audioGraphNode({ type: audioNodeNames.reverb }, 0);

    // act
    const newGraph = graphReducer(initialGraph, {
      type: GRAPH.CONNECT,
      node: reverbNode,
    });

    // assert
    expect(newGraph).toHaveLength(2);
  });

  test('given initial graph with two nodes we can disconnect the correct node', () => {
    // arrange
    const gainNode = audioGraphNode({ type: audioNodeNames.gain }, 0);
    const reverbNode = audioGraphNode({ type: audioNodeNames.reverb }, 1);

    const initialGraph = [gainNode, reverbNode];

    // act
    const newGraph = graphReducer(initialGraph, {
      type: GRAPH.DISCONNECT,
      node: gainNode,
    });

    // assert
    expect(newGraph).toHaveLength(1);
    expect(newGraph[0].type).toBe(audioNodeNames.reverb);
  });

  test('given initial graph with three nodes we can disconnect the correct node', () => {
    // arrange
    const gainNode = audioGraphNode({ type: audioNodeNames.gain }, 0);
    const reverbNode = audioGraphNode({ type: audioNodeNames.reverb }, 1);
    const convolverNode = audioGraphNode({ type: audioNodeNames.convolver }, 2);

    const initialGraph = [gainNode, reverbNode, convolverNode];

    // act
    const newGraph = graphReducer(initialGraph, {
      type: GRAPH.DISCONNECT,
      node: reverbNode,
    });

    // assert
    expect(newGraph).toHaveLength(2);
    expect(newGraph[0].type).toBe(audioNodeNames.gain);
    expect(newGraph[1].type).toBe('convolver');
  });
});

import graphReducer from './graphReducer.js';
import { audioGraphNode } from '../graph';
import { audioNodeNames } from '../graph/node';

describe('graphReducer', () => {
  test('given initial empty graph we can connect one node', () => {
    const initialGraph = [];
    const gainNode = audioGraphNode({ type: audioNodeNames.gain }, 0);
    const newGraph = graphReducer(initialGraph, {
      type: 'connect',
      node: gainNode,
    });

    expect(newGraph).toHaveLength(1);
    expect(newGraph[0].type).toBe(audioNodeNames.gain);
  });

  test('given initial graph with one node we can connect another node', () => {
    const gainNode = audioGraphNode({ type: audioNodeNames.gain }, 0);
    const initialGraph = [gainNode];

    const reverbNode = audioGraphNode({ type: audioNodeNames.reverb }, 0);

    const newGraph = graphReducer(initialGraph, {
      type: 'connect',
      node: reverbNode,
    });

    expect(newGraph).toHaveLength(2);
  });

  test('given initial graph with two nodes we can disconnect the correct node', () => {
    const gainNode = audioGraphNode({ type: audioNodeNames.gain }, 0);
    const reverbNode = audioGraphNode({ type: audioNodeNames.reverb }, 1);

    const initialGraph = [gainNode, reverbNode];

    const newGraph = graphReducer(initialGraph, {
      type: 'disconnect',
      node: gainNode,
    });

    expect(newGraph).toHaveLength(1);
    expect(newGraph[0].type).toBe(audioNodeNames.reverb);
  });

  test('given initial graph with three nodes we can disconnect the correct node', () => {
    const gainNode = audioGraphNode({ type: audioNodeNames.gain }, 0);
    const reverbNode = audioGraphNode({ type: audioNodeNames.reverb }, 1);
    const convolverNode = audioGraphNode({ type: audioNodeNames.convolver }, 2);

    const initialGraph = [gainNode, reverbNode, convolverNode];

    const newGraph = graphReducer(initialGraph, {
      type: 'disconnect',
      node: reverbNode,
    });

    expect(newGraph).toHaveLength(2);
    expect(newGraph[0].type).toBe(audioNodeNames.gain);
    expect(newGraph[1].type).toBe('convolver');
  });
});

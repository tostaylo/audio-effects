import { audioGraphNode } from '../graph';
import { GRAPH } from '../actions';
import graphStore from './graph';

const audioNodeNames = {
  reverb: 'reverb',
  gain: 'gain',
  convolver: 'convolver',
  fuzz: 'fuzz',
};

describe('graphStore', () => {
  test('given no audio nodes, should initalize to an empty array', () => {
    expect(graphStore.getState()).toEqual([]);
  });

  test('given an empty store, when a CONNECT action is dispatched, should contain one audio node', () => {
    // arrange
    const gainNode = audioGraphNode({ type: audioNodeNames.gain }, 0);
    const connect = {
      type: GRAPH.CONNECT,
      node: gainNode,
    };

    // act
    graphStore.dispatch(connect);

    // assert
    expect(graphStore.getState()).toHaveLength(1);
    expect(graphStore.getState()).toEqual([gainNode]);
  });
});

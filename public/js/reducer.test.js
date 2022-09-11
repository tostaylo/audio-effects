import graphReducer from './reducer.js';
import node from './node';

describe('graphReducer', () => {
  test('given initial empty graph we can connect one node', () => {
    const initialGraph = [];
    const gainNode = node({ name: 'gain node' }, 0);
    const newGraph = graphReducer(initialGraph, {
      type: 'connect',
      node: gainNode,
    });
    expect(newGraph).toHaveLength(1);
  });
});

// Continue test driven development
// Think of API interfaces usability and discoverability
// 1 problem at a time
// rename files and put in directories.
// next step is to decide on an interface that maps graph state to web audio context. make it testable and decoupled from web audio context as much as possible. think layers and adapters.
// Decide what all my custom audio node needs to hold to represent an audio node completely and how it will easily be able used to create web context audio nodes. Feels very class based and object oriented to me. But how could it be functional? Componnent based. Think React. maybe just maps?

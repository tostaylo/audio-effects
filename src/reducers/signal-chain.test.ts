import signalChainReducer from './signal-chain';
import { signalChainNodes } from '../signal/fixtures/signalChainNodes';
import { SIGNALCHAIN } from '../actions/index';

describe('signalChainReducer', () => {
  test('given initial empty graph we can connect one node with the correct properites attached', () => {
    // arrange
    const initialGraph = [];

    // act
    const newGraph = signalChainReducer(initialGraph, {
      type: SIGNALCHAIN.CONNECT,
      node: signalChainNodes.gain(0),
    });

    const firstSignal = newGraph[0];
    // assert
    expect(newGraph).toHaveLength(1);

    expect(firstSignal.type).toBeTruthy();
    expect(firstSignal.type).toEqual(signalChainNodes.gain().type);

    expect(firstSignal.nodes).toBeTruthy();
    expect(firstSignal.nodes).toEqual(signalChainNodes.gain().nodes);

    expect(firstSignal.id).toBeTruthy();
    expect(firstSignal.id).toEqual(signalChainNodes.gain().id);

    expect(firstSignal.pos).toBeGreaterThan(-1);
    expect(firstSignal.pos).toEqual(0);
  });

  test('given initial graph with one node we can connect another node', () => {
    // arrange
    const initialGraph = [signalChainNodes.gain(0)];

    // act
    const newGraph = signalChainReducer(initialGraph, {
      type: SIGNALCHAIN.CONNECT,
      node: signalChainNodes.reverb(1),
    });

    // assert
    expect(newGraph).toHaveLength(2);
    expect(newGraph[0].pos).toEqual(0);
    expect(newGraph[1].pos).toEqual(1);
  });

  test('given initial graph with two nodes we can disconnect the correct node', () => {
    // arrange
    const initialGraph = [signalChainNodes.gain(0), signalChainNodes.reverb(1)];

    // act
    const newGraph = signalChainReducer(initialGraph, {
      type: SIGNALCHAIN.DISCONNECT,
      pos: 0,
    });

    // assert
    expect(newGraph).toHaveLength(1);
    expect(newGraph[0].type).toBe(signalChainNodes.reverb().type);
    expect(newGraph[0].pos).toEqual(1);
  });

  test('given initial graph with three nodes we can disconnect the correct node', () => {
    // arrange
    const gainNode = signalChainNodes.gain(0);
    const convolverNode = signalChainNodes.convolver(2);

    const initialGraph = [gainNode, signalChainNodes.reverb(1), convolverNode];

    // act
    const newGraph = signalChainReducer(initialGraph, {
      type: SIGNALCHAIN.DISCONNECT,
      pos: 1,
    });

    // assert
    expect(newGraph).toHaveLength(2);
    expect(newGraph[0].type).toBe(gainNode.type);
    expect(newGraph[1].type).toBe(convolverNode.type);
    expect(newGraph[0].pos).toEqual(gainNode.pos);
    expect(newGraph[1].pos).toEqual(convolverNode.pos);
  });
});

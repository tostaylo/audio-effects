import { signalChainNodes } from '../signal/fixtures/signalChainNodes';

describe('signalChainNode', () => {
  test('initializes with all properties', () => {
    const gainNode = signalChainNodes.gain(0);

    expect(gainNode.params).toEqual(['gain']);
    expect(gainNode.id).toEqual('gain-adlfasf');
    expect(gainNode.type).toEqual('gain');
    expect(gainNode.pos).toEqual(0);
    expect(gainNode.nodes).toEqual([]);
  });
});

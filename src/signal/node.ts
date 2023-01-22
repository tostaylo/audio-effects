export type SignalChainNode = {
  id: string;
  type: string;
  nodes: AudioNode[];
  pos: number;
};

function signalChainNode(
  { id, type, nodes }: { id: string; type: string; nodes: AudioNode[] },
  pos: number
): SignalChainNode {
  return {
    id,
    type,
    nodes,
    pos,
  };
}

export { signalChainNode as default };

export default function Fuzz(audioContext) {
  const waveShaperNode = new WaveShaperNode(audioContext, {
    curve: 1,
    oversample: '4x',
  });

  return waveShaperNode;
}

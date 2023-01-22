export default function Gain(
  audioContext: AudioContext,
  options = { gain: 2 }
): AudioNode[] {
  const gainNode = new GainNode(audioContext, options);

  return [gainNode];
}

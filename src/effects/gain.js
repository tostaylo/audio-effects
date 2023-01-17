export default function Gain(audioContext, options = { gain: 2 }) {
  const gainNode = new GainNode(audioContext, options);

  return [gainNode];
}

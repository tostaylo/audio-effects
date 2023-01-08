export default function Gain(audioContext, options = { gain: 20 }) {
  const gainNode = new GainNode(audioContext, options);

  return [gainNode];
}

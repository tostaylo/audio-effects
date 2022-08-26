export default function Gain(audioContext, options = {}) {
  const gainNode = new GainNode(audioContext, options);

  return gainNode;
}

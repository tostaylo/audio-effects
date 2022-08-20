export default function Gain(audioContext) {
  const gainNode = audioContext.createGain();

  return gainNode;
}

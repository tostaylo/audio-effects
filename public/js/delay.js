export default function Delay(audioContext) {
  const delayNode = audioContext.createDelay(1.0);

  return delayNode;
}

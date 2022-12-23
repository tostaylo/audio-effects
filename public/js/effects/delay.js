export default function Delay(audioContext) {
  const delayNode = audioContext.createDelay(5.0);

  return delayNode;
}

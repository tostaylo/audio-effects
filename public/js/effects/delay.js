export default function Delay(audioContext, delay = 0.5) {
  const delayNode = audioContext.createDelay(delay);

  delayNode.delayTime.value = 0.5;

  return [delayNode];
}

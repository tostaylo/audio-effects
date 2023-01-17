export default function Delay(audioContext, delay = 0.2) {
  const delayNode = audioContext.createDelay();

  delayNode.delayTime.value = delay;

  return [delayNode];
}

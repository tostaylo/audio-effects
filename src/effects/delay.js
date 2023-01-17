export default function Delay(audioContext, delay = 5.0) {
  const delayNode = audioContext.createDelay();

  delayNode.delayTime.value = delay;

  return [delayNode];
}

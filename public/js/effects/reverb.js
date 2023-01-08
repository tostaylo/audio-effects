export default async function Reverb(audioContext) {
  const reverb = new ConvolverNode(audioContext);

  const response = await fetch('sounds/vocal-duo.wav');
  const buffer = await response.arrayBuffer();

  reverb.buffer = await audioContext.decodeAudioData(buffer);

  return [reverb];
}

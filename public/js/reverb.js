//assign a variable to the createConvolver method
// fetch a wav doc and apply the arrayBuffer method to it
// use the decodeAudioData on the manipulated wav and apply the result as the value of the buffer property of createConvolver
// return end product to acheive reverb effect
export default async function Reverb(audioContext) {
  let reverb = new ConvolverNode(audioContext);

  const response = await fetch('vocal_duo.wav');
  const buffer = await response.arrayBuffer();

  reverb.buffer = await audioContext.decodeAudioData(buffer);

  return reverb;
}

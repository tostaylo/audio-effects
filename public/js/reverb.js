//assign a variable to the createConvolver method
// fetch a wav doc and apply the arrayBuffer method to it
// use the decodeAudioData on the manipulated wav and apply the result as the value of the buffer property of createConvolver
// return end product to acheive reverb effect
export default function Reverb(audioContext) {
  let reverb = audioContext.createConvolver();

  fetch('../vocal_duo.wav')
    .then((response) => response.arrayBuffer())
    .then((data) => {
      audioContext.decodeAudioData(data, (result) => {
        reverb.buffer = result;
      });
    });

  return reverb;
}

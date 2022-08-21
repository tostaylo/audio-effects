// write out a button on the index.html file
// use dom.js and events.js to turn off and on the reverb
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

import createTrack from './track.js';

async function initialize() {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const audioElement = document.querySelector('audio');
  const track = createTrack(audioContext, audioElement);
  const fixed = [analyser, audioContext.destination];

  return { audioContext, fixed, track, audioElement, analyser };
}

export { initialize };

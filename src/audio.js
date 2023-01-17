import createTrack from './track.js';

async function initialize() {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const audioElement = document.querySelector('audio');
  const track = createTrack(audioContext, audioElement);

  return { audioContext, track, audioElement, analyser };
}

export { initialize };

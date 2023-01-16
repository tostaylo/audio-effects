import createTrack from './track.js';
import waveformVisualizer from './dom/visualizer.js';

async function initialize() {
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const audioElement = document.querySelector('audio');
  const track = createTrack(audioContext, audioElement);
  const fixed = [analyser, audioContext.destination];

  waveformVisualizer(analyser);

  return { audioContext, fixed, track, audioElement };
}

export { initialize };

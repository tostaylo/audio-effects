import createTrack from './track.js';
import waveformVisualizer from './dom/visualizer.js';

let track;
let audioContext;
let fixed = [];
let audioElement;

async function initialize() {
  audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  audioElement = document.querySelector('audio');
  track = createTrack(audioContext, audioElement);
  fixed = [analyser, audioContext.destination];

  waveformVisualizer(analyser);

  return { audioContext, fixed, track, audioElement };
}

export { initialize as default };

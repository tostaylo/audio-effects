import createTrack from './track.js';
import waveformVisualizer from './dom/visualizer.js';
import { modifySignalChain } from './signal/chain';
import signalChainStore from './stores/signal-chain';

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

signalChainStore.subscribe(() => {
  console.log({ store: signalChainStore.getState() }, 'store has changed');
  modifySignalChain({
    track,
    fixed,
    signalChain: signalChainStore.getState(),
  });
});

export { initialize as default };

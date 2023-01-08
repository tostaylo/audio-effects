// import DOM from './dom/dom.js';
import * as Effects from './effects/index';
import createTrack from './track.js';
import waveformVisualizer from './dom/visualizer.js';
import { createSignalChain } from './signal/chain';

let track;
let signalChain = [];
let audioContext;
let fixed = [];
let audioElement;

export default async function initialize() {
  audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  audioElement = document.querySelector('audio');
  track = createTrack(audioContext, audioElement);
  fixed = [analyser, audioContext.destination];

  // audioEffectNode rename maybe
  // does gain have to be the first in the graph for distortion to work?
  // const gainNodes = Effects.Gain(audioContext, { gain: 20 });

  // const gainNode = signalChainNode({ type: 'Gain', nodes: gainNodes }, 0);

  // const connectGainNode = {
  //   type: SIGNALCHAIN.CONNECT,
  //   node: gainNode,
  // };

  waveformVisualizer(analyser);
}

const createButton = document.getElementById('create');
createButton.addEventListener('click', () => {
  signalChain = [];

  createSignalChain(fixed, track);

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  audioElement.play();
});

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => {
  track.disconnect();
});

const domEffects = document.querySelectorAll('input[type=checkbox]');

domEffects.forEach((effect) => {
  effect.addEventListener('change', async (event) => {
    track.disconnect();

    const { effect, active } = event.target.dataset;

    if (active === 'false') {
      console.log({ effect });
      const newNodes = await Effects[effect](audioContext);
      console.log({ newNodes });

      signalChain = [...newNodes, ...signalChain];
      console.log(signalChain);

      createSignalChain([...signalChain, ...fixed], track);
      return;
    } else {
      // filter out signal chain for effect and then reconnect
    }
  });
});

initialize();

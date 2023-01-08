// import DOM from './dom/dom.js';
import * as Effects from './effects/index';
import createTrack from './track.js';
import waveformVisualizer from './dom/visualizer.js';
import { createSignalChain } from './signal/chain';

let track;
let signalChain = [];
let audioContext;
let fixed = [];

export default async function initialize() {
  audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const audioElement = document.querySelector('audio');
  track = createTrack(audioContext, audioElement);
  fixed = [analyser, audioContext.destination];

  // audioEffectNode rename maybe
  // does gain have to be the first in the graph for distortion to work?
  // const gainNodes = Effects.Gain(audioContext, { gain: 20 });

  // const gainNode = signalChainNode({ type: 'Gain', nodes: gainNodes }, 0);

  // const connectGainNode = {
  //   type: GRAPH.CONNECT,
  //   node: gainNode,
  // };

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

  waveformVisualizer(analyser);
}

const domEffects = document.querySelectorAll('input[type=checkbox]');

domEffects.forEach((effect) => {
  effect.addEventListener('change', async (event) => {
    track.disconnect();

    const { effect, active } = event.target.dataset;
    if (active === 'false') {
      console.log(effect);
      const newNodes = await Effects[effect](audioContext);
      console.log(newNodes, effect);

      // const delayNodes = Effects.Delay(audioContext);
      // const webAudioDelayNode = delayNodes[0];

      signalChain = [...newNodes, ...signalChain];
      console.log(signalChain);
      // track.connect(webAudioDelayNode);
      // webAudioDelayNode.connect(audioContext.destination);
      // console.log(signalChain);
      createSignalChain([...signalChain, ...fixed], track);

      // const gainNodes = Effects.Gain(audioContext);
      // const webAudioGainNode = gainNodes[0];
      // signalChain.push(webAudioGainNode);

      // track.connect(webAudioGainNode);
      // webAudioGainNode.connect(audioContext.destination);
      // signalChain.push(audioContext.destination);
    }
  });
});

initialize();

//  const gainNodes = Effects.Gain(audioContext, { gain: 20 });
//   const webAudioGainNode = gainNodes[0];
//   signalChain.push(webAudioGainNode);

//   track.connect(webAudioGainNode);
//   webAudioGainNode.connect(audioContext.destination);

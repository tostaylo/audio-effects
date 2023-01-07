// import DOM from './dom/dom.js';
import * as Effects from './effects/index';
import createTrack from './track.js';
// import { createTrackGraph } from './graph/track';
// import waveformVisualizer from './dom/visualizer.js';
// import { audioGraphNode } from './graph/index';
// import { GRAPH } from './actions/index';
// import graphStore from './stores/graph';

// let num = 0;
let track;
let signalChain = [];
let audioContext;

export default async function initialize() {
  // const analyser = audioContext.createAnalyser();
  audioContext = new AudioContext();
  const audioElement = document.querySelector('audio');
  track = createTrack(audioContext, audioElement);

  // audioEffectNode rename maybe
  // does gain have to be the first in the graph for distortion to work?
  // const gainNodes = Effects.Gain(audioContext, { gain: 20 });

  // const gainNode = audioGraphNode({ type: 'Gain', nodes: gainNodes }, 0);

  // const connectGainNode = {
  //   type: GRAPH.CONNECT,
  //   node: gainNode,
  // };

  const createButton = document.getElementById('create');
  createButton.addEventListener('click', () => {
    const gainNodes = Effects.Gain(audioContext, { gain: 20 });
    const webAudioGainNode = gainNodes[0];
    signalChain.push(webAudioGainNode);

    track.connect(webAudioGainNode);
    webAudioGainNode.connect(audioContext.destination);
    signalChain.push(audioContext.destination);

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    audioElement.play();
  });

  const disconnectButton = document.getElementById('disconnect');
  disconnectButton.addEventListener('click', () => {
    signalChain[0].disconnect();
    signalChain = [signalChain[signalChain.length - 1]];
    console.log(signalChain);
    track.connect(audioContext.destination);
  });

  const reconnectButton = document.getElementById('reconnect');
  reconnectButton.addEventListener('click', () => {
    const delayNodes = Effects.Delay(audioContext);
    const webAudioDelayNode = delayNodes[0];

    signalChain = [webAudioDelayNode, ...signalChain];
    console.log(signalChain);
    track.connect(webAudioDelayNode);
    webAudioDelayNode.connect(audioContext.destination);
  });

  const stopButton = document.getElementById('stop');
  stopButton.addEventListener('click', () => {
    track.disconnect();
  });

  // waveformVisualizer(analyser);

  // createTrackGraphFromStore(audioContext, analyser);

  // DOM({
  //   // nodes,
  //   // createTrackGraph: () => {
  //   //   graphStore.dispatch(connectGainNode);
  //   // },
  //   // audioContext,
  //   // audioElement,
  // });
}

initialize();

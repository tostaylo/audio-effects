import { configureStore } from '@reduxjs/toolkit';
import DOM from './dom.js';
import Reverb from './reverb.js';
import Distortion from './distortion.js';
import Gain from './gain.js';
import createTrack from './track.js';
import waveformVisualizer from './visualizer.js';
import impulseResponse from './impulse-response.js';
import graphReducer from './reducer.js';
import node from './node.js';

const createGraph = (nodes, track) =>
  nodes.reduce((acc, node) => acc.connect(node), track);

export default async function initialize() {
  const audioContext = new AudioContext();
  const audioElement = document.querySelector('audio');

  const track = createTrack(audioContext, audioElement);

  const convolver = await impulseResponse(audioContext);
  const analyser = audioContext.createAnalyser();

  waveformVisualizer(analyser);

  const distortionNode = Distortion(audioContext);

  const preAmpGainNode = Gain(audioContext);
  const postAmpGainNode = Gain(audioContext, { gain: 2 });
  const reverbNode = await Reverb(audioContext);

  const store = configureStore({ reducer: graphReducer });
  console.log(postAmpGainNode, convolver);
  store.dispatch({ type: 'connect', node: node(preAmpGainNode, 0) });
  store.dispatch({ type: 'connect', node: node(postAmpGainNode, 1) });
  store.dispatch({ type: 'connect', node: node(reverbNode, 2) });
  console.log(store.getState());
  store.dispatch({ type: 'disconnect', pos: 0 });
  console.log(store.getState());

  const nodes = [
    preAmpGainNode,
    distortionNode,
    convolver,
    reverbNode,
    postAmpGainNode,
    analyser,
    audioContext.destination,
  ];

  const createButton = document.getElementById('create');
  createButton.addEventListener('click', () => {
    createGraph(nodes, track);

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    audioElement.play();
  });

  const modifyButton = document.getElementById('modify');
  modifyButton.addEventListener('click', () => {
    const newNodes = [...nodes.slice(2)];

    nodes.reverse().forEach((node) => node.disconnect());

    createGraph(newNodes, track);
  });

  DOM({ gainNode: preAmpGainNode, distortionNode }, audioContext);
}

initialize();

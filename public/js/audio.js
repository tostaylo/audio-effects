import DOM from './dom.js';
import Reverb from './reverb.js';
import Distortion from './distortion.js';
import Gain from './gain.js';
import createTrack from './track.js';
import waveformVisualizer from './visualizer.js';
import impulseResponse from './impulse-response.js';
import { configureStore } from '@reduxjs/toolkit';

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 };
    case 'counter/decremented':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = configureStore({ reducer: counterReducer });

console.log(store);

function getNodeType(node) {
  switch (node.constructor) {
    case GainNode: {
      return 'Gain';
    }
  }
}

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

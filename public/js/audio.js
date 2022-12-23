import DOM from './dom/dom.js';
import Reverb from './effects/reverb.js';
import Compressor from './effects/compressor.js';
import Delay from './effects/delay.js';
import Distortion from './effects/distortion.js';
import Gain from './effects/gain.js';
import createTrack from './track.js';
import waveformVisualizer from './dom/visualizer.js';
import impulseResponse from './effects/impulse-response.js';
import Fuzz from './effects/fuzz.js';

const createGraph = (nodes, track) =>
  nodes.reduce((acc, node) => acc.connect(node), track);

export default async function initialize() {
  const audioContext = new AudioContext();
  const audioElement = document.querySelector('audio');

  const track = createTrack(audioContext, audioElement);

  const convolver = await impulseResponse(audioContext);
  const analyser = audioContext.createAnalyser();

  const delayNode = Delay(audioContext);
  const distortionNode = Distortion(audioContext);
  const fuzzNodes = Fuzz(audioContext, track);

  const preAmpGainNode = Gain(audioContext);
  const postAmpGainNode = Gain(audioContext, { gain: 2 });
  const reverbNode = await Reverb(audioContext);
  const compressorNode = await Compressor(audioContext, {
    threshold: -40,
    knee: 30,
    attack: 1,
    release: 1,
    ratio: 15,
  });

  const nodes = [
    // preAmpGainNode,
    ...fuzzNodes,
    // postAmpGainNode,
    analyser,
    audioContext.destination,
  ];

  waveformVisualizer(analyser);

  const createButton = document.getElementById('create');
  createButton.addEventListener('click', () => {
    createGraph(nodes, track);

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    audioElement.play();
  });

  const modifyButton = document.getElementById('modify');
  // modifyButton.addEventListener('click', () => {
  //   const newNodes = [...nodes.slice(2)];

  //   nodes.reverse().forEach((node) => node.disconnect());

  //   createGraph(newNodes, track);
  // });

  // DOM({ gainNode: preAmpGainNode, distortionNode }, audioContext);
}

initialize();

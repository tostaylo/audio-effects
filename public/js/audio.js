import DOM from './dom/dom.js';
import * as Effects from './effects/index';
import createTrack from './track.js';
import { createTrackGraph } from './graph/track';
import waveformVisualizer from './dom/visualizer.js';

export default async function initialize() {
  const audioContext = new AudioContext();
  const audioElement = document.querySelector('audio');

  const track = createTrack(audioContext, audioElement);

  const analyser = audioContext.createAnalyser();

  const { Fuzz, Gain } = Effects;

  // TODO: nodes should be an array of wrapped nodes.
  // Each node will contain the audio api object and metadata.
  const nodes = [
    Gain(audioContext),
    ...Fuzz(audioContext, track),
    analyser,
    audioContext.destination,
  ];

  waveformVisualizer(analyser);

  DOM({
    nodes,
    createTrackGraph: () => createTrackGraph(nodes, track),
    audioContext,
    audioElement,
  });
}

initialize();

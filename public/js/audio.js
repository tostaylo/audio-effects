import DOM from './dom/dom.js';
import * as Effects from './effects/index';
import createTrack from './track.js';
import { createTrackGraph } from './graph/track';
import waveformVisualizer from './dom/visualizer.js';

import { audioGraphNode } from './graph/index';
import { GRAPH } from './actions/index';
import graphStore from './stores/graph';

export default async function initialize() {
  const audioContext = new AudioContext();
  const audioElement = document.querySelector('audio');

  const track = createTrack(audioContext, audioElement);

  const analyser = audioContext.createAnalyser();

  // TODO: nodes should be an array of wrapped nodes.
  // Each node will contain the audio api object and metadata.
  const nodes = [analyser, audioContext.destination];

  getNodesOnClick(audioContext, track);

  createTrackGraphFromStore(audioContext, analyser, track);

  waveformVisualizer(analyser);

  DOM({
    nodes,
    createTrackGraph: () => createTrackGraph(nodes, track),
    audioContext,
    audioElement,
  });
}

initialize();

function getNodesOnClick(audioContext, track) {
  const input = document.getElementById('fuzz');
  input.addEventListener('change', () => {
    const effect = input.dataset.effect;

    const fuzz = Effects.Fuzz(audioContext, track);
    const node = audioGraphNode({ type: effect, audioNode: fuzz }, 0);
    console.log(node);

    if (input.checked) {
      const connect = {
        type: GRAPH.CONNECT,
        node,
      };
      graphStore.dispatch(connect);
    } else {
      const disconnect = {
        type: GRAPH.DISCONNECT,
        node,
      };
      graphStore.dispatch(disconnect);
    }
  });
}

function createTrackGraphFromStore(audioContext, analyser, track) {
  graphStore.subscribe(() => {
    console.log(graphStore.getState());
    const nodes = graphStore
      .getState()
      .reduce(
        (accumulator, next) => [
          ...accumulator,
          ...Effects[next.type](audioContext, track),
        ],
        []
      );

    graphStore
      .getState()
      .reverse()
      .forEach((node) =>
        node.node.audioNode.forEach((node) => node.disconnect())
      );

    createTrackGraph([...nodes, analyser, audioContext], track);
  });
}

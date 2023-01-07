import DOM from './dom/dom.js';
import * as Effects from './effects/index';
import createTrack from './track.js';
import { createTrackGraph } from './graph/track';
import waveformVisualizer from './dom/visualizer.js';
import { audioGraphNode } from './graph/index';
import { GRAPH } from './actions/index';
import graphStore from './stores/graph';

let num = 0;
let track;

export default async function initialize() {
  const audioContext = new AudioContext();
  const audioElement = document.querySelector('audio');

  track = createTrack(audioContext, audioElement);

  const analyser = audioContext.createAnalyser();

  // audioEffectNode rename maybe
  // does gain have to be the first in the graph for distortion to work?
  const gainNodes = Effects.Gain(audioContext, { gain: 20 });

  const gainNode = audioGraphNode({ type: 'Gain', nodes: gainNodes }, 0);

  const connectGainNode = {
    type: GRAPH.CONNECT,
    node: gainNode,
  };

  // getNodesOnClick(audioContext, track);

  waveformVisualizer(analyser);

  createTrackGraphFromStore(audioContext, analyser);

  DOM({
    // nodes,
    createTrackGraph: () => {
      graphStore.dispatch(connectGainNode);
    },
    audioContext,
    audioElement,
  });

  getNodesOnClick(audioContext, gainNodes, analyser);
}

initialize();

function getNodesOnClick(audioContext, gainNodes, analyser) {
  const input = document.getElementById('fuzz');
  input.addEventListener('change', () => {
    const effect = input.dataset.effect;
    console.log('fuzz check');
    // const fuzz = Effects.Fuzz(audioContext, track);
    // const node = audioGraphNode({ type: effect, audioNode: fuzz }, 0);

    // DistortionNodes[0].disconnect();

    const distortionNodes = Effects.Distortion(audioContext);

    const distortionNode = audioGraphNode(
      { type: 'Distortion', nodes: distortionNodes },
      1
    );
    const connectDistortionNode = {
      type: GRAPH.CONNECT,
      node: distortionNode,
    };

    graphStore.dispatch(connectDistortionNode);

    if (input.checked) {
      // const connect = {
      //   type: GRAPH.CONNECT,
      //   node,
      // };
      // graphStore.dispatch(connect);
    } else {
      // const disconnect = {
      //   type: GRAPH.DISCONNECT,
      //   node,
      // };
      // graphStore.dispatch(disconnect);
    }
  });
}

function createTrackGraphFromStore(audioContext, analyser) {
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

    console.log(nodes);
    console.log(graphStore.getState(), 'graph store get state');

    // graphStore.getState()?[0].nodes?[0].disconnect();
    // graphStore
    //   .getState()
    //   .reverse()
    //   .forEach((audioGraphNode) =>
    //     audioGraphNode.nodes.reverse().forEach((node) => node.disconnect())
    //   );

    if (num < 1) {
      num = 1;
      createTrackGraph([...nodes, analyser, audioContext.destination], track);
    } else {
      createTrackGraph([...nodes, audioContext.destination], track);
    }
  });
}

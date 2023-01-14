// import DOM from './dom/dom.js';
import * as Effects from './effects/index';
import createTrack from './track.js';
import waveformVisualizer from './dom/visualizer.js';
import { createSignalChain, modifySignalChain } from './signal/chain';
import { signalChainNode } from './signal';
import { SIGNALCHAIN } from './actions';
import signalChainStore from './stores/signal-chain';

let track;
let audioContext;
let fixed = [];
let audioElement;

export default async function initialize() {
  audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  audioElement = document.querySelector('audio');
  track = createTrack(audioContext, audioElement);
  fixed = [analyser, audioContext.destination];

  waveformVisualizer(analyser);
}

const createButton = document.getElementById('create');
createButton.addEventListener('click', () => {
  // TODO: empty store

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
    // track.disconnect();
    // disconnect everything.
    const reversedStore = [...signalChainStore.getState()].reverse();
    const reversedFixed = [...fixed].reverse();
    [...reversedFixed].forEach((node) => node.disconnect());
    [...reversedStore].forEach((node) => {
      const reversed = [...node.nodes].reverse();
      reversed.forEach((node) => node.disconnect());
    });

    const { effect, active, pos, id } = event.target.dataset;

    if (active === 'false') {
      const newNodes = await Effects[effect](audioContext);
      const position = signalChainStore.getState().length;

      const node = signalChainNode(
        { id, type: effect, nodes: newNodes },
        position
      );
      const connect = {
        type: SIGNALCHAIN.CONNECT,
        node,
      };

      signalChainStore.dispatch(connect);

      modifySignalChain({
        track,
        fixed,
        signalChain: signalChainStore.getState(),
      });

      event.target.dataset.active = 'true';
      event.target.dataset.pos = position;

      return;
    } else {
      const disconnect = {
        type: SIGNALCHAIN.DISCONNECT,
        pos: Number(pos),
      };

      signalChainStore.dispatch(disconnect);

      modifySignalChain({
        track,
        fixed,
        signalChain: signalChainStore.getState(),
      });

      event.target.dataset.active = 'false';
      event.target.dataset.pos = '';

      signalChainStore.getState().forEach((storeEffect) => {
        document.querySelector(`[data-id=${storeEffect.id}]`).dataset.pos =
          storeEffect.pos;
      });

      console.log({ store: signalChainStore.getState() });
    }
  });
});

initialize();

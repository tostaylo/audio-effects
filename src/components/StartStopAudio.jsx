import { h } from 'preact';
import { Button } from './Button';
import { createSignalChain } from '../signal/chain';
import { useSignalChainStore } from '../stores/SignalChainProvider';

function startAudio({ audioContext, audioElement, signalChain, track }) {
  // TODO: empty store

  createSignalChain({ nodes: signalChain, track });

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  audioElement.play();
}

function stopAudio({ track }) {
  track.disconnect();
}

export function StartStopAudio({ audioElement, audioContext, track }) {
  const { store } = useSignalChainStore();
  return (
    <div>
      <Button
        onClick={() =>
          startAudio({ audioContext, audioElement, signalChain: store, track })
        }
      >
        Start Audio
      </Button>

      <Button onClick={() => stopAudio({ track })}>Stop Audio</Button>
    </div>
  );
}

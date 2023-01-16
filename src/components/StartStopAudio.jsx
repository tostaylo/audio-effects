import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button } from './Button';
import { SignalChainOperator } from '../signal/chain';
import { useSignalChainStore } from '../stores/SignalChainProvider';

function startAudio({ audioContext, audioElement, signalChain, track }) {
  SignalChainOperator.connect({ nodes: signalChain, track });

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  audioElement.play();
}

export function StartStopAudio({ audioElement, audioContext, track }) {
  const { store } = useSignalChainStore();
  const [isPlaying, setPlaying] = useState(false);

  return (
    <div>
      {!isPlaying ? (
        <Button
          onClick={() => {
            startAudio({
              audioContext,
              audioElement,
              signalChain: store,
              track,
            });
            setPlaying(true);
          }}
        >
          Start Audio
        </Button>
      ) : (
        <Button
          onClick={() => {
            audioContext.suspend();
            setPlaying(false);
          }}
        >
          Stop Audio
        </Button>
      )}
    </div>
  );
}

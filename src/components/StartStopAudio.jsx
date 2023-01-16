import { h } from 'preact';
import { Button } from './Button';
import { createSignalChain } from '../signal/chain';

function startAudio({ audioContext, audioElement, fixed, track }) {
  // TODO: empty store

  createSignalChain({ nodes: fixed, track });

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  audioElement.play();
}

function stopAudio({ track }) {
  track.disconnect();
}

export function StartStopAudio({ audioElement, audioContext, fixed, track }) {
  console.log('should not fire if context is updated');
  return (
    <div>
      <Button
        onClick={() => startAudio({ audioContext, audioElement, fixed, track })}
      >
        Start Audio
      </Button>

      <Button onClick={() => stopAudio({ track })}>Stop Audio</Button>
    </div>
  );
}

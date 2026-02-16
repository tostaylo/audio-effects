import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Button } from '../system/Button';
import { SignalChainOperator } from '../../signal/chain';
import { useSignalChainStore } from '../../stores/SignalChainProvider';
import { signalChainStore } from '../../stores';
import { switchToGuitar, switchToFile } from '../../audio/source-manager';

async function startAudio({ audioContext, audioElement, signalChain, track, mode, sourceManager, setSourceManager, setError }) {
  let activeSource;

  try {
    if (mode === 'guitar') {
      activeSource = await switchToGuitar(audioContext, sourceManager);
      // Update the source manager with the new guitar input
      setSourceManager({ ...sourceManager, currentSource: activeSource });
    } else {
      activeSource = switchToFile(sourceManager);
      setSourceManager({ ...sourceManager, currentSource: activeSource });
      audioElement.play();
    }

    SignalChainOperator.connect({ nodes: signalChain, track: activeSource });

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    setError(null);
  } catch (err) {
    throw err;
  }
}

export function StartStopAudio({ audioElement, audioContext, track }) {
  const { store } = useSignalChainStore();
  const [mode, setMode] = useState(signalChainStore.getState().audioSource.mode);

  useEffect(() => {
    const unsubscribe = signalChainStore.subscribe(() => {
      setMode(signalChainStore.getState().audioSource.mode);
    });
    return unsubscribe;
  }, []);
  const [isPlaying, setPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [sourceManager, setSourceManager] = useState({
    currentSource: null,
    guitarInput: null,
    audioFileTrack: track,
  });

  const handleStartAudio = async () => {
    try {
      await startAudio({
        audioContext,
        audioElement,
        signalChain: store,
        track,
        mode,
        sourceManager,
        setSourceManager,
        setError,
      });
      setPlaying(true);
    } catch (err) {
      setError(err.message);
      setPlaying(false);
    }
  };

  const handleStopAudio = () => {
    if (mode === 'file') {
      audioElement.pause();
    }
    audioContext.suspend();
    setPlaying(false);
  };

  return (
    <div>
      {error && (
        <div className="text-red-400 p-2 mb-2 text-sm">
          {error}
        </div>
      )}
      {!isPlaying ? (
        <Button onClick={handleStartAudio}>
          Start Audio
        </Button>
      ) : (
        <Button onClick={handleStopAudio}>
          Stop Audio
        </Button>
      )}
    </div>
  );
}

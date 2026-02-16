import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { SignalChainOperator } from '../../signal/chain';
import { useSignalChainStore } from '../../stores/SignalChainProvider';
import { signalChainStore } from '../../stores';
import { switchToGuitar, switchToFile } from '../../audio/source-manager';

async function startAudio({
  audioContext,
  audioElement,
  signalChain,
  mode,
  sourceManager,
  setSourceManager,
  setError,
}: {
  audioContext: AudioContext;
  audioElement: HTMLAudioElement;
  signalChain: any;
  mode: string;
  sourceManager: any;
  setSourceManager: (_manager: any) => void;
  setError: (_error: string | null) => void;
}) {
  let activeSource;

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
}

type Props = {
  audioElement: HTMLAudioElement;
  audioContext: AudioContext;
  track: any;
  onPlayingChange?: (_isPlaying: boolean) => void;
};

export function StartStopAudio({
  audioElement,
  audioContext,
  track,
  onPlayingChange,
}: Props) {
  const { store } = useSignalChainStore();
  const [mode, setMode] = useState(
    signalChainStore.getState().audioSource.mode
  );
  const [selectedTrack, setSelectedTrack] = useState(
    signalChainStore.getState().audioSource.selectedTrack
  );

  useEffect(() => {
    const unsubscribe = signalChainStore.subscribe(() => {
      const state = signalChainStore.getState().audioSource;
      setMode(state.mode);
      setSelectedTrack(state.selectedTrack);
    });
    return unsubscribe;
  }, []);

  // Update audio element src when selected track changes
  useEffect(() => {
    if (audioElement && mode === 'file') {
      const wasPlaying = !audioElement.paused;
      audioElement.src = selectedTrack;
      if (wasPlaying) {
        audioElement.play().catch((err) => {
          console.error('Failed to play audio after track change:', err);
        });
      }
    }
  }, [selectedTrack, audioElement, mode]);
  const [isPlaying, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceManager, setSourceManager] = useState({
    currentSource: null,
    guitarInput: null,
    audioFileTrack: track,
  });

  // Notify parent when playing state changes
  useEffect(() => {
    if (onPlayingChange) {
      onPlayingChange(isPlaying);
    }
  }, [isPlaying, onPlayingChange]);

  const handleStartAudio = async () => {
    try {
      await startAudio({
        audioContext,
        audioElement,
        signalChain: store,
        mode,
        sourceManager,
        setSourceManager,
        setError,
      });
      setPlaying(true);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
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
        <div className="mb-4 p-3 bg-red-900/30 border-2 border-red-500 rounded-xl text-red-400 text-sm font-semibold shadow-lg shadow-red-900/20">
          ⚠ {error}
        </div>
      )}
      {!isPlaying ? (
        <button
          onClick={handleStartAudio}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold text-lg rounded-xl border-2 border-green-400 shadow-xl shadow-green-500/50 transition-all duration-200 hover:shadow-green-400/60 hover:scale-[1.02] active:scale-[0.98]"
        >
          ▶ Start Audio
        </button>
      ) : (
        <button
          onClick={handleStopAudio}
          className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-lg rounded-xl border-2 border-red-400 shadow-xl shadow-red-500/50 transition-all duration-200 hover:shadow-red-400/60 hover:scale-[1.02] active:scale-[0.98]"
        >
          ■ Stop Audio
        </button>
      )}
    </div>
  );
}

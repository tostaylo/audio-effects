import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { signalChainStore } from '../../stores';
import { InputModeToggle } from './InputModeToggle';
import { TrackSelector } from './TrackSelector';
import { StartStopAudio } from './StartStopAudio';
import { WebAudioInit } from '../../types';

type Props = {
  track: WebAudioInit['track'];
  audioContext: AudioContext;
  audioElement: HTMLAudioElement;
};

export function AudioControls({ track, audioContext, audioElement }: Props) {
  const [mode, setMode] = useState(
    signalChainStore.getState().audioSource.mode
  );
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = signalChainStore.subscribe(() => {
      setMode(signalChainStore.getState().audioSource.mode);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="w-1/2 mb-8 p-5 border-2 border-gray-700 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl">
      <div className="border-b border-gray-700/50 pb-3 mb-5">
        <h2 className="text-sky-400 text-xl font-bold tracking-wide">
          Audio Source Controls
        </h2>
      </div>

      <div className="space-y-5">
        <InputModeToggle disabled={isPlaying} />

        {mode === 'file' && <TrackSelector disabled={isPlaying} />}

        <div className="pt-4 border-t border-gray-700/50">
          <StartStopAudio
            track={track}
            audioContext={audioContext}
            audioElement={audioElement}
            onPlayingChange={setIsPlaying}
          />
        </div>
      </div>
    </div>
  );
}

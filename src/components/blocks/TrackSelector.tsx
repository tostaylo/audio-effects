import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { signalChainStore } from '../../stores';
import { AUDIOSOURCE } from '../../actions';

const AVAILABLE_TRACKS = [
  {
    label: 'Audio Effects Sample',
    value: './sounds/audio-effects-sample-1.wav',
  },
  {
    label: 'Sampled Guitar Riff',
    value: './sounds/sampled-guitar-riff.mp3',
  },
];

type Props = {
  disabled?: boolean;
};

export function TrackSelector({ disabled = false }: Props) {
  const [selectedTrack, setSelectedTrack] = useState(
    signalChainStore.getState().audioSource.selectedTrack
  );

  useEffect(() => {
    const unsubscribe = signalChainStore.subscribe(() => {
      setSelectedTrack(signalChainStore.getState().audioSource.selectedTrack);
    });
    return unsubscribe;
  }, []);

  const handleTrackChange = (event: Event) => {
    if (!disabled) {
      const target = event.target as HTMLSelectElement;
      signalChainStore.dispatch({
        type: AUDIOSOURCE.SET_TRACK,
        track: target.value,
      });
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-400 text-sm mb-2">
        Select Audio Track:
      </label>
      <select
        value={selectedTrack}
        onChange={handleTrackChange}
        disabled={disabled}
        className="bg-gray-800 text-sky-400 p-2 rounded border border-gray-700 w-full max-w-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {AVAILABLE_TRACKS.map((track) => (
          <option key={track.value} value={track.value}>
            {track.label}
          </option>
        ))}
      </select>
    </div>
  );
}

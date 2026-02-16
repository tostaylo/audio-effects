import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { signalChainStore } from '../../stores';
import { AUDIOSOURCE } from '../../actions';

const AVAILABLE_TRACKS = [
  {
    label: 'Guitar Riff 1',
    value: './sounds/guitar-1.wav',
  },
  {
    label: 'Guitar Riff 2',
    value: './sounds/guitar-2.mp3',
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
    <div>
      <label className="block text-gray-300 text-xs font-semibold mb-2 tracking-wide uppercase">
        Audio Track
      </label>
      <select
        value={selectedTrack}
        onChange={handleTrackChange}
        disabled={disabled}
        className="w-full px-4 py-2.5 bg-gray-800/50 text-sky-400 font-semibold text-base rounded-xl border-2 border-gray-700 focus:border-sky-500 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600 hover:bg-gray-800 disabled:hover:border-gray-700 disabled:hover:bg-gray-800/50 shadow-sm hover:shadow-md cursor-pointer"
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

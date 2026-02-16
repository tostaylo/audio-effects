import AUDIOSOURCE from '../actions/audio-source';

type AudioSourceState = {
  mode: 'file' | 'guitar';
  isActive: boolean;
  selectedTrack: string;
};

const initialState: AudioSourceState = {
  mode: 'file',
  isActive: false,
  selectedTrack: './sounds/guitar-1.wav',
};

function audioSourceReducer(
  state: AudioSourceState = initialState,
  action: any
): AudioSourceState {
  switch (action.type) {
    case AUDIOSOURCE.SET_MODE:
      return { ...state, mode: action.mode };
    case AUDIOSOURCE.SET_TRACK:
      return { ...state, selectedTrack: action.track };
    default:
      return state;
  }
}

export default audioSourceReducer;

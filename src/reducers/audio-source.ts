import AUDIOSOURCE from '../actions/audio-source';

type AudioSourceState = {
  mode: 'file' | 'guitar';
  isActive: boolean;
};

const initialState: AudioSourceState = {
  mode: 'file',
  isActive: false,
};

function audioSourceReducer(
  state: AudioSourceState = initialState,
  action: any
): AudioSourceState {
  switch (action.type) {
    case AUDIOSOURCE.SET_MODE:
      return { ...state, mode: action.mode };
    default:
      return state;
  }
}

export default audioSourceReducer;

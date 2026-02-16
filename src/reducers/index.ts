import { combineReducers } from 'redux';
import signalChainReducer from './signal-chain';
import audioSourceReducer from './audio-source';

const rootReducer = combineReducers({
  signalChain: signalChainReducer,
  audioSource: audioSourceReducer,
});

export { rootReducer, signalChainReducer };
export default rootReducer;

import { createStore } from 'redux';
import { signalChainReducer } from '../reducers';

const store = createStore(signalChainReducer);

export default store;

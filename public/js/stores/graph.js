import { createStore } from 'redux';
import { graphReducer } from '../reducers';

const store = createStore(graphReducer);

export default store;

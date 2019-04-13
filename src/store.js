import {
    createStore
} from 'redux';

import {
    loadStore,
    saveStore
} from './store/localStorage'

import reducers from './reducers'

const savedStore = loadStore();
export let store = createStore(reducers, (savedStore || {}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => {
    saveStore(store.getState());
})
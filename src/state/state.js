import {
    createStore
} from 'redux';
import {
    loadStore,
    saveStore
} from './localStorage'
import set from 'lodash.set';

// action creators
export function addCategory(name, description, address = []) {
    return {
        type: 'ADD_CATEGORY',
        name,
        description,
        address
    }
}
export function addTracker(name, description, address = [], trackerOptions) {
    return {
        type: 'ADD_TRACKER',
        name,
        description,
        address,
        trackerOptions
    }
}
export function addTrackerData(trackerAddress, value, dateTime, note) {
    return {
        type: 'ADD_TRACKER_DATA',
        trackerAddress,
        value,
        dateTime,
        note
    }
}
export function editCategoryTrackerData(updatedValues = {}) {
    return {
        type: 'EDIT_CATEGORY_TRACKER_DATA',
        updatedValues
    }
}

//reducer
function structure(state = {}, action) {
    const pushElementIntoCategory = (stateToPush, providedAction) => {
        let {
            type,
            address,
            trackerOptions,
            ...objectData
        } = providedAction;
        const uniqId = new Date().getTime();
        objectData.type = type == 'ADD_CATEGORY' ? 'category' : 'tracker';
        objectData.id = new Date().getTime();
        objectData.address = address ? [...address, {
            name: objectData.name,
            id: uniqId
        }] : [{
            name: objectData.name,
            id: uniqId
        }];
        objectData.data = {};
        objectData.options = trackerOptions ? trackerOptions : undefined;
        let addressToPush = address ? address.map(el => `['${el.name}']`).join('.data') + '.data' : '';
        set(stateToPush, addressToPush + `[${providedAction.name}]`, objectData)
        return stateToPush;
    }
    const pushDataIntoTracker = (stateToPush, providedAction) => {
        let {
            trackerAddress,
            ...objectData
        } = providedAction
        const timeStamp = new Date().getTime();
        let addressToPush = trackerAddress.map(el => `['${el.name}']`).join('.data') + '.data';
        set(stateToPush, addressToPush + `[${new Date().getTime()}]`, objectData);
    }
    const editItem = (stateToPush, newValues) => {
        const timeStamp = new Date().getTime();
        let addressToPush = newValues.address.map(el => `['${el.name}']`).join('.data');
        set(stateToPush, addressToPush, {
            ...newValues,
            lastModificationTime: timeStamp
        });
    }
    let newDataState;
    switch (action.type) {
        case 'ADD_CATEGORY':
        case 'ADD_TRACKER':
            newDataState = {
                ...state.data
            }
            pushElementIntoCategory(newDataState, action);
            return {
                ...state,
                data: newDataState
            };
        case 'EDIT_CATEGORY_TRACKER_DATA':
            newDataState = {
                ...state.data
            }
            editItem(newDataState, action.updatedValues);
            return {
                ...state,
                data: newDataState
            };
        default:
            return state;
    }
}

//store
const initialState = {
    data: {},
    system: [],
    user: []
}
const savedStore = loadStore();
export let store = createStore(structure, (savedStore || initialState), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => {
    saveStore(store.getState());
})
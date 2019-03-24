import {
    createStore
} from 'redux';
import {
    loadStore,
    saveStore
} from './localStorage'
import set from 'lodash.set';
import unset from 'lodash.unset'

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
export function removeCategoryTracker(id, address) {
    return {
        type: 'REMOVE_CATEGORY_TRACKER',
        id,
        address
    }
}

export function removeTrackerData(address, entryName) {
    return {
        type: 'REMOVE_TRACKER_DATA',
        address,
        entryName
    }
}

export function editTrackerEntry(address, entryId, updatedValues = {}) {
    return {
        type: 'EDIT_TRACKER_ENTRY',
        address,
        entryId,
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
    const removeElementFromStructure = (stateToPush, providedAction) => {
        let addressToRemoveFrom = providedAction.address.map(el => `['${el.name}']`).join('.data');
        if (providedAction.entryName) {
            addressToRemoveFrom += `.data[${providedAction.entryName}]`;
        }
        unset(stateToPush, addressToRemoveFrom);
    }
    const pushDataIntoTracker = (stateToPush, providedAction) => {
        let {
            trackerAddress,
            value,
            dateTime,
            note
        } = providedAction;
        const timeStamp = new Date().getTime();
        let addressToPush = trackerAddress.map(el => `['${el.name}']`).join('.data') + '.data';
        set(stateToPush, addressToPush + `[${timeStamp}]`, {
            value,
            dateTime,
            note
        });
    }
    const editItem = (stateToPush, newValues) => {
        const timeStamp = new Date().getTime();
        let addressToPush = newValues.address.map(el => `['${el.name}']`).join('.data');
        set(stateToPush, addressToPush, {
            ...newValues,
            lastModificationTime: timeStamp
        });
    }

    const editTrackerEntry = (stateToPush, providedAction) => {
        const timeStamp = new Date().getTime();
        let addressToPush = providedAction.address.map(el => `['${el.name}']`).join('.data') + `.data[${providedAction.entryId}]`;
        console.log(addressToPush);
        set(stateToPush, addressToPush, {
            ...providedAction.updatedValues,
            lastModificationTime: timeStamp
        });
    }

    let newDataState = {
        ...state.data
    };

    switch (action.type) {
        case 'ADD_CATEGORY':
        case 'ADD_TRACKER':
            pushElementIntoCategory(newDataState, action);
            break;
        case 'EDIT_CATEGORY_TRACKER_DATA':
            editItem(newDataState, action.updatedValues);
            break;
        case 'REMOVE_CATEGORY_TRACKER':
            removeElementFromStructure(newDataState, action);
            break;
        case 'ADD_TRACKER_DATA':
            pushDataIntoTracker(newDataState, action);
            break;
        case 'REMOVE_TRACKER_DATA':
            removeElementFromStructure(newDataState, action);
            break;
        case 'EDIT_TRACKER_ENTRY':
            editTrackerEntry(newDataState, action)
            // console.log(action);
            break;
        default:
            return state;
    }

    return {
        ...state,
        data: newDataState
    };

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
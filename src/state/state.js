import {
    createStore
} from 'redux';
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


//reducer
function structure(state = {}, action) {
    const pushElementIntoCategory = (stateToPush, providedAction) => {
        let addressToPush = providedAction.address ? providedAction.address.map(el => `['${el.name}']`).join('.data') + '.data' : '';
        set(stateToPush, addressToPush + `[${providedAction.name}]`, {
            name: providedAction.name,
            description: providedAction.description,
            type: providedAction.type == 'ADD_CATEGORY' ? 'category' : 'tracker',
            id: new Date().getTime(),
            address: providedAction.address ? [...providedAction.address, {
                name: providedAction.name,
                id: new Date().getTime()
            }] : [{
                name: providedAction.name,
                id: new Date().getTime()
            }],
            options: providedAction.type == 'ADD_TRACKER' ? providedAction.trackerOptions : undefined,
            data: {}
        })
        return stateToPush;
    }
    const pushDataIntoTracker = (stateToPush, providedAction) => {

    }
    switch (action.type) {
        case 'ADD_CATEGORY':
        case 'ADD_TRACKER':
            let newState = {
                ...state
            };
            let newDataState = {
                ...newState.data
            }
            pushElementIntoCategory(newDataState, action);
            newState.data = newDataState;
            return newState;
        default:
            return state;
    }
}

//store
const initialState = {
    data: {
        'Default category': {
            type: 'category',
            name: 'Default category',
            id: new Date().getTime(),
            address: [{
                name: 'Default category',
                id: new Date().getTime()
            }],
            data: {
                'nudna categoria': {
                    type: 'category',
                    name: 'nudna categoria',
                    id: new Date().getTime() + 1,
                    address: [{
                            name: 'Default category',
                            id: new Date().getTime()
                        },
                        {
                            name: 'nudna categoria',
                            id: new Date().getTime() + 1
                        }
                    ],
                    data: {}
                },
                waga: {
                    type: 'tracker',
                    name: 'waga',
                    id: new Date().getTime() + 2,
                    address: [{
                            name: 'Default category',
                            id: new Date().getTime()
                        },
                        {
                            name: 'waga',
                            id: new Date().getTime() + 2
                        }
                    ],
                    data: {}
                }
            }
        }
    },
    system: [],
    user: []
}
export let store = createStore(structure, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
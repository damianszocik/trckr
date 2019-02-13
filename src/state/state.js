import {
    createStore
} from 'redux';

// action creators

export function addCategory(name, category) {
    return {
        type: 'ADD_CATEGORY',
        name,
        category
    }
}
export function addTracker(name, category) {
    return {
        type: 'ADD_TRACKER',
        name,
        category
    }
}


//reducer
function structure(state = {}, action) {
    const pushElementIntoCategory = (stateToPush, providedAction) => {
        if (providedAction.category != 'main-category') {
            stateToPush.forEach((el) => {
                if (el.type == 'category' && el.name == providedAction.category) {
                    el.data.push({
                        name: providedAction.name,
                        type: providedAction.type == 'ADD_CATEGORY' ? 'category' : 'tracker',
                        data: []
                    })
                } else if (el.type == 'category' && el.data.length) {
                    pushElementIntoCategory(el.data, providedAction);
                }
            });
        } else {
            stateToPush.push({
                name: providedAction.name,
                type: providedAction.type == 'ADD_CATEGORY' ? 'category' : 'tracker',
                data: []
            })
        }
    }
    switch (action.type) {
        case 'ADD_CATEGORY':
        case 'ADD_TRACKER':
            let newState = {
                ...state
            };
            let newDataState = [...newState.data]
            pushElementIntoCategory(newDataState, action);
            newState.data = newDataState;
            return newState;
        default:
            return state;
    }
}

//store
const initialState = {
    data: [{
        type: 'category',
        name: 'Default category',
        data: [{
            type: 'category',
            name: 'nudna categoria',
            data: []
        }]
    }],
    system: [],
    user: []
}
export let store = createStore(structure, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
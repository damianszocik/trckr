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
function structure(state = [], action) {
    switch (action.type) {
        case 'ADD_CATEGORY':
            if (!action.category) {
                return [...state, {
                    name: action.name,
                    type: 'category',
                    data: []
                }]
            } else {
                let newState = [...state];
                newState.forEach((obj) => {
                    if (obj.type == 'category' && obj.name == action.category) {
                        obj.data.push({
                            name: action.name,
                            type: 'category',
                            data: []
                        })
                    }
                })
                return newState
            }

        case 'ADD_TRACKER':
            let newState = [...state];
            newState.forEach((obj) => {
                if (obj.type == 'category' && obj.name == action.category) {
                    obj.data.push({
                        name: action.name,
                        type: 'tracker',
                        data: []
                    })
                }
            })
            return newState
        default:
            return state;
    }
}

//store
const initialState = [{
    type: 'category',
    name: 'Default category',
    data: [{
        type: 'category',
        name: 'nudna categoria',
        data: []
    }]
}]
export let store = createStore(structure, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
import {
    createStore
} from 'redux';

// action creators

export function addCategory(name, category, address = []) {
    console.log(address)
    return {
        type: 'ADD_CATEGORY',
        name,
        category,
        address
    }
}
export function addTracker(name, category, address = []) {
    console.log(address)

    return {
        type: 'ADD_TRACKER',
        name,
        category,
        address
    }
}


//reducer
function structure(state = {}, action) {
    const pushElementIntoCategory = (stateToPush, providedAction) => {
        console.log(providedAction.address);
        if (providedAction.category != 'main-category') {
            stateToPush.forEach((el) => {
                if (el.type == 'category' && el.name == providedAction.category) {
                    el.data.push({
                        name: providedAction.name,
                        type: providedAction.type == 'ADD_CATEGORY' ? 'category' : 'tracker',
                        id: new Date().getTime(),
                        address: [...providedAction.address, {
                            name: providedAction.name,
                            id: new Date().getTime()
                        }],
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
                id: new Date().getTime(),
                address: [{
                    name: providedAction.name,
                    id: new Date().getTime()
                }],
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
        id: new Date().getTime(),
        address: [{
            name: 'Default category',
            id: new Date().getTime()
        }],
        data: [{
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
            data: []
        }]
    }],
    system: [],
    user: []
}
export let store = createStore(structure, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
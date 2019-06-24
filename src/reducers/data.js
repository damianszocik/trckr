import set from 'lodash.set';
import unset from 'lodash.unset'

export const data = (state = {}, action) => {

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
        objectData.data = '';
        if (trackerOptions) {
            objectData.options = trackerOptions;
        }
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
        set(stateToPush, addressToPush, {
            ...providedAction.updatedValues,
            lastModificationTime: timeStamp
        });
    }

    let newState = {
        ...state
    };

    switch (action.type) {
        case 'OVERWRITE_STORE_DATA':
            return {
                ...action.data
            };
        case 'ADD_CATEGORY':
        case 'ADD_TRACKER':
            pushElementIntoCategory(newState, action);
            break;
        case 'EDIT_CATEGORY_TRACKER_DATA':
            editItem(newState, action.updatedValues);
            break;
        case 'REMOVE_CATEGORY_TRACKER':
            removeElementFromStructure(newState, action);
            break;
        case 'ADD_TRACKER_DATA':
            pushDataIntoTracker(newState, action);
            break;
        case 'REMOVE_TRACKER_DATA':
            removeElementFromStructure(newState, action);
            break;
        case 'EDIT_TRACKER_ENTRY':
            editTrackerEntry(newState, action);
            break;
        default:
            return state;
    }
    return newState;
}
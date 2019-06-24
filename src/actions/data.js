export function overwriteStoreData(data) {
    return {
        type: 'OVERWRITE_STORE_DATA',
        data
    }
}

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
export const saveStore = (store) => {
    try {
        const serializedStore = JSON.stringify(store);
        localStorage.setItem('trckrStore', serializedStore)
    } catch (error) {
        console.log(error)
    }
}

export const loadStore = () => {
    try {
        const serializedStore = localStorage.getItem('trckrStore');
        if (serializedStore == null) {
            return undefined;
        }
        return JSON.parse(serializedStore);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
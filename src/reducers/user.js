export const user = (state = {}, action) => {
    switch (action.type) {
        case 'SUCCESSFUL_LOGOUT':
            return {
                ...state, authUser: {}
            };
        case 'SUCCESSFUL_AUTH':
            return {
                ...state, authUser: action.user
            };
        case 'FAILED_AUTH':
            console.log(action.error)
            return {
                ...state
            };
        default:
            return {
                ...state
            };
    }
}
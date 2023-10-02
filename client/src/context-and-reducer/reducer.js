// Setting the initial state for the reducer

export const initialState = {
    total: 0,
    items: []
}

// Setting the state update for each action type

const storeReducer = (state, action) => {
    switch (action.type) {

        case "update price": 
            return {
                ...state,
                total: action.data
            }

        case "receive-cart-data":
            return {
                ...state,
                items: action.data
            }

        default: throw new Error(`Unrecognized action: ${action.type}`)
    }
}

export default storeReducer;
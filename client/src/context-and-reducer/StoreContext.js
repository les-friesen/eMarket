import { createContext, useReducer } from "react"; 
import reducer, { initialState } from "./reducer"; 

export const StoreContext = createContext(); 

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    //Receives updated Cart data from the server and puts it in global context.

    const receiveCartData = 
        (data) => {
            //Calling updatePrice function here will update the price total everytime new Cart data is received
            updatePrice(data.items)
            dispatch({
            type: "receive-cart-data",
            data: data.items 
        })}
    // Automatically calculates the total of the cart and stores it in global context
    const updatePrice = (items) => {
        let total = 0; 
        items.forEach( item => {

            if (item.price) { 
                // Remove $ from string and convert to number
                const updatedPrice = +item.price.replace(/\$/g,'');
    
                total += updatedPrice * item.quantity;
            }
        })
        dispatch({
            type: "update price",
            data: +total.toFixed(2)
        })
    }

    const value = {
        total: state.total,
        items: state.items,
        receiveCartData,
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}; 


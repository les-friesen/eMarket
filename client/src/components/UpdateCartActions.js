import styled from 'styled-components'; 
import { useState } from 'react';

// This component contains the input, button and logic for updating the quantity or removing items 
// from the cart, within the Cart.js component. 

const UpdateCartActions = ( {item, setCartUpdate} ) => {
    
// Putting the the item that is recieved as a prop from Cart.js into 
// a state so that the quantity can be mutable. 

    const [selectedItem, setSelectedItem] = useState(item)

// Updates quantity as input value is changed.  

    const handleChange = (event) => {
        setSelectedItem({...selectedItem, quantity: +event.target.value})
            } 

// When "Update quantity" is clicked, it will send a PATCH request to the server to
// update the cart in the database. 
// setCartUpdate is updated (this triggers the StoreContext to fetch the updated data from the cart) 

    const handleUpdate = (event) => {
        event.preventDefault();
        fetch(`/updateCartItem/${selectedItem._id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
                },
            body: JSON.stringify(selectedItem)
            })
                .then(res => res.json())
                .then(data => setCartUpdate(data)
                )
                .catch((error) => {
                    console.log(error); 
                })
            }

// When the "Remove item" button is clicked, this will send a DELETE request
// to the server to remove the item from the cart in the database.
// setCartUpdate is updated (this triggers the StoreContext to fetch the updated data from the cart) 

    const handleRemove = () => {
        fetch(`/removeCartItem/${selectedItem._id}`, {
            method: "DELETE"
            })
                .then(res => res.json())
                .then(data => setCartUpdate(data)
                )
                .catch((error) => { 
                    console.log(error); 
                })
            }
            
        return (
            <Wrapper>
                <form onSubmit={handleUpdate}>
                <label for="quantity">Select quantity</label>
                <input onChange={handleChange} defaultValue={selectedItem.quantity} type="number" id="quantity" name="quantity" min="0" max={selectedItem.numInStock} ></input>
                <Button name="add" type="submit">Update quantity</Button>
                </form>
                <Button name="remove" onClick={handleRemove}>Remove from cart</Button>
            </Wrapper>
        )
    }
    
    const Wrapper = styled.div`

    margin-top: 20px; 
    display:flex;
    flex-direction: row; 
    
    input {
        margin-left: 20px; 
    }
    
    input:invalid {
        border: solid red 2px; 
    }
    `; 
    
    const Button = styled.button`
    border-radius: 5px; 
    border: none; 
    background-color: #FFB700; 
    margin-left: 20px; 
    height: 25px; 
    &:hover {
    background-color: #000066;
    cursor: pointer;
    color:white;
    }
    transition: background-color 0.3s;
    `;
    
    export default UpdateCartActions; 

    // revised
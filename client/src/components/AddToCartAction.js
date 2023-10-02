import styled from 'styled-components'; 
import { useEffect, useContext } from 'react';
import { StoreContext } from '../context-and-reducer/StoreContext';

// This component contains the button, input field and functionality for adding an item
// to the cart from the ItemsDetails.js component. 

const AddToCartAction = ( {selectedItem, setSelectedItem, setCartUpdate, existingItem} ) => {

const { items } = useContext(StoreContext); 

// Sets the initial quantity to 1 (to match the default value of the input) 

useEffect(() => {
setSelectedItem({...selectedItem, quantity: 1})
}, [])

// Updates the quantity as the input value is changed

const handleChange = (event) => {
        setSelectedItem({...selectedItem, quantity: +event.target.value})
        }
        
// Updates the Cart. A POST request is sent to the database to update the cart collection.
// setCartUpdate is updated (this triggers the StoreContext to fetch the updated data from the cart)

const handleAdd = (event) => {
            event.preventDefault(); 
    
            fetch("/addToCart", {
                method: "POST",
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

// People can not select a larger quantity than numInStock minus what is already in their cart. 
// If this number is at zero, the button and input becomes disabled. 

    return (
        <Wrapper>
            <form onSubmit={handleAdd}>
            <label for="quantity">Select quantity</label>
            <input onChange={handleChange} 
                defaultValue={1} 
                type="number" 
                id="quantity" 
                name="quantity" 
                min="0" 
                max={existingItem ? selectedItem.numInStock - existingItem.quantity : selectedItem.numInStock} 
                disabled={ 
                    existingItem && selectedItem.numInStock - existingItem.quantity === 0 ? true
                    : selectedItem.numInStock === 0 ? true
                    : false }></input> 
            <Button name="add" type="submit" 
                    disabled={existingItem && selectedItem.numInStock - existingItem.quantity === 0 ? true
                    : selectedItem.numInStock === 0 ? true
                    : false }>Add to Cart</Button>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`

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
background: lightblue; 
margin-left: 20px; 
height: 25px; 
background-color: #FFB700;
&:hover {
    background-color: #000066;
    cursor: pointer;
    color:white;
    }
transition: background-color 0.3s;
`

export default AddToCartAction; 

// revsied
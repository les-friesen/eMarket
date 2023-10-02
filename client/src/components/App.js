import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsDetails from "./ItemsDetails";
import HomePage from "./HomePage";
import Cart from "./Cart";
import CheckOut from "./CheckOut";
import About from "./About";
import Items from "./Items";
import { useContext } from "react";
import { StoreContext } from "../context-and-reducer/StoreContext";
import NavBar from "./NavBar";
import ConfirmedPurchase from "./ConfirmedPurchase";
import GlobalStyle from "./GlobalStyle";


// Main component for the App, which shows all of the routes, and also where the
// data for the current cart is fetched everytime an update is made to the cart. 

const App = () => {

const { receiveCartData } = useContext(StoreContext)

// Declaring a state called cartUpdate. Everytime a change is made to the cart,
// this state will be updated. This is then added to the dependency
// array for fetching data from the Cart and updating the StoreContext. 
// setCartUpdate is passed as a prop to all components which will include
// actions for adding, updating or removing items from the cart.  

const [cartUpdate, setCartUpdate] = useState()

useEffect(() => {
  fetch('/cart')
    .then(res => res.json())
    .then(data => receiveCartData(data))
}, [cartUpdate]);

  return (
    <BrowserRouter>
    <GlobalStyle/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:itemId" element={<ItemsDetails setCartUpdate={setCartUpdate}   />} />
        <Route path="/checkout" element={<CheckOut setCartUpdate={setCartUpdate}/>} />
        <Route path="/cart" element={<Cart setCartUpdate={setCartUpdate}  />} />
        <Route path="/about" element={<About />} />
        <Route path="/confirmedPurchase/:orderId" element={<ConfirmedPurchase />} /> 
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

//revised

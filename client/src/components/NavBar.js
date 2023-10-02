import React from "react";
import styled from "styled-components";
import logo from "./assets/E-marketlogo.png";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from 'react-icons/ri';
import { useContext } from "react";
import { StoreContext } from "../context-and-reducer/StoreContext";

// A component for the Navigation bar at the top of the page. 

const NavBar = () => {

const {items} = useContext(StoreContext); 

// Declaring a variable for the total number of items in the cart to be displayed as a number 
// next to the cart icon. 

let totalQuantity = 0;

// Iterating through the items array to add the quantity of each item to the total. 
items.forEach(item => {
  totalQuantity += item.quantity 
})

  return (
    <NavbarWrapper>
      <Link to="/">
        <LogoImage src={logo} alt="E-Marketplace" />
      </Link>
      <NavigationBar>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/items">Browse</NavItem>
        <div className="cart"><NavItem to="/cart">  
          <RiShoppingCartLine size={25} /> 
          </NavItem>
          <div className={`number ${items.length === 0 ? "noitems" : ""}`}>{totalQuantity}</div>
          </div>
      </NavigationBar>
    </NavbarWrapper>
  );
};

const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px; 
  
  
  .cart {
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    justify-content: center;
  }

  .number {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    padding: 4px; 
    background-color: lightgreen;
    border-radius: 50%; 
    height: 6px; 
    font-size: 12px; 
    position: relative; 
    top: -14px; 
    left: -2px; 
  }

  .noitems {
    background-color: #FFB700;
  }
`;

const NavbarWrapper = styled.div`
  background-color: #000066;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 100px; 
  width: 100%; 
  margin:0;

`;

const NavItem = styled(Link)`
font-size: 22px;
color: white;

  text-decoration: none;
  margin-left: 20px;
  &:hover {
    color: #FFB700;
    border-bottom: #FFB700 0.125em solid;
  }
`;

const LogoImage = styled.img`
  height: 70px;
  display:flex;
  justify-content: center;
  margin-left: 10px;
  border: solid 4px #FFA200;
  border-radius:65%;
`;

export default NavBar;

import React, { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../context-and-reducer/StoreContext';
import UpdateCartActions from './UpdateCartActions';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import CartImage from './assets/CartImage.jpg';


const Cart = ({ setCartUpdate }) => {
  const navigate = useNavigate();

  const { items, total } = useContext(StoreContext);


  // leads to checkput page when btn clicked
  const handleCheckout = () => {
    navigate('/checkout');
    console.log('Checkout clicked!');
  };

  // it is to delele the whole items in the cart 
  //done by fetching  Delete method at backend
  const handleClearCart = () => {
    fetch('/clearCart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Cart cleared successfully!');
        //cart is set to empty array of items ,clear cart from client-side,  
        setCartUpdate([]);
      })
      .catch((error) => {
        console.error('Error clearing cart:', error);
      });
  };

  // table type container was set it to display the items in cart
  
  return (

    <Container>
        <BackgroundImage src={CartImage} alt="Cart Background" />
      <CartTitle>Your items</CartTitle>
    
      {items.length === 0 ? (
        <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
      ) : (
        <TableWrapper>
      <Table>
          <thead>
            <tr>
              <TH>Item</TH>
              <TH></TH>
              <TH>Quantity</TH>
              <TH></TH>
              <TH>Subtotal</TH>
            </tr>
          </thead>
        <tbody>
        {items.map((item) => (
          <CartItem key={item._id}>
            <TD>
              <ItemImage src={item.imageSrc} alt={item.name} />
            </TD>
            <TD>
              <ItemName>{item.name}</ItemName>
            </TD>
            <TD>
              <ItemQuantity>{item.quantity}</ItemQuantity>
            </TD>
            <TD>
              <UpdateDiv>
                <UpdateCartActions item={item} setCartUpdate={setCartUpdate} />
              </UpdateDiv>
            </TD>
            <TD>
              <SubtotalDiv>${((+item.price.replace(/\$/g, '')) * item.quantity).toFixed(2)}</SubtotalDiv>
            </TD>
          </CartItem> 
        ))}
      </tbody>
            <tfoot>
              <tr>
                <TD colSpan="4" style={{ textAlign: "right" }}>
                  <TotalLabel>Total:</TotalLabel>
                </TD>
                <TD>
                  <TotalPrice>${total.toFixed(2)}</TotalPrice>
                </TD>
              </tr>
            </tfoot>
          </Table>
          <ButtonsWrapper>
            <ClearCartButton onClick={handleClearCart}>
              <FaTrashAlt size={15} />
            </ClearCartButton>
            <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
          </ButtonsWrapper>
        </TableWrapper>
      )}
    </Container>
  );
};


const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  flex-direction: row;
`;

const ClearCartButton = styled.button`
  background-color: #c40000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  display: flex;
  flex-direction: flex-start;
  margin: 10px;

  &:hover {
    background-color: #000066;
    cursor: pointer;
    color: white;
  }
  transition: background-color 0.3s;
`;

const CheckoutButton = styled.button`
  background-color: #f0c14b;
  font-weight:bold;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin: 10px;
  font-size: 16px;
  display: flex;
  align-items:flex-end;
  &:hover {
    background-color: #000066;
    cursor: pointer;
    color: white;
  }
  transition: background-color 0.3s;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody {
    tr:nth-child(odd) {
      background-color: rgba(245, 245, 245, 0.8); 
    }

    tr:nth-child(even) {
      background-color: rgba(255, 255, 255, 0.8); 
    }
  }
`;
const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const TD = styled.td`
  width: 150px; 
  padding: 8px;
  border-bottom: 1px solid #ccc;
  text-align: center; 
  vertical-align: middle;

`;

const ItemName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  flex-grow: 1;

`;

const TableWrapper = styled.div`

`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  object-fit: cover;
`;
const Container = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width:1000px; 
  margin: 50px auto; 
`;

const UpdateDiv = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  flex-grow: 1;
  white-space: nowrap; 
`;

const SubtotalDiv = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: green;
  text-align: center; 
  white-space: nowrap;
`;

const TH = styled.th`
  text-align: center;
  padding:8px ;
  margin-left: 25px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  background-color: #f0c14b;; 
  color: #333; 
`;

const TotalLabel = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  color: #333;
`;

const CartTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CartItem = styled.tr`
  border-bottom: 1px solid #ccc;
  padding: 50px;
  &:last-child {
    border-bottom: none;
  }
`;

const ItemQuantity = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
  text-align: center; 
  white-space: nowrap; 
`;

const TotalPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: green;
`;

const EmptyCartMessage = styled.p`
  font-size: 18px;
  text-align: center;
`;

export default Cart;
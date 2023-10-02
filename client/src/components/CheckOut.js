import styled from "styled-components";
import { useState, useContext } from "react";
import ConfirmedPurchase from "./ConfirmedPurchase";
import { StoreContext } from "../context-and-reducer/StoreContext";
import { useNavigate } from "react-router-dom";

// components to enter payment details, shipping adress and to confirm purchase
const CheckOut = ({ setCartUpdate }) => {

  // useContext is used to access global state which is avalaible through Store context 
  const { items, total } = useContext(StoreContext);
  const navigate = useNavigate();

  // UseSate to manage the customerInfo state 

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    addressLine: "",
    province: "",
    country: "",
    postalCode: "",
    city: "",
    cardNumber: "",
    cardName: "",
    expirationDate: "",
    CVV: "",
  });

  //whenever a value input changes this will be called
  const handleChange = (value, name) => {
    setCustomerInfo({ ...customerInfo, [name]: value, total: total, items: items });
  };

   // it is to delele the whole items in the cart 
  //done by fetching  Delete method at backend
  const clearCart = () => {
    fetch("/clearCart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Cart cleared successfully!");
        setCartUpdate([]); // clear cart
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
      });
  };
// called form submitted
  const handleSubmit = (e) => {
    e.preventDefault();

//sending data format to backend
 // when a form is submitted , post requeest will be send the dats to backend

    fetch(`/createOrder`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...customerInfo, total, items }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        clearCart();
        navigate(`/confirmedPurchase/${data.orderData._id}`); 
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
  };
  

  return (
    <WrapperContainer>
      <CheckoutForm onSubmit={(e) => handleSubmit(e)}>

      <OrderSummarySection>
          <SectionTitle>Order Summary</SectionTitle>
          <Table>
            <thead>
              <tr>
                <TH>Item</TH>
                <TH>Quantity</TH>
                <TH>Price</TH>
                <TH>Subtotal</TH>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <SummaryItem key={item.itemId}>
                  <TD>
                
                      <ItemImage src={item.imageSrc} alt={item.name} />
                  
                  </TD>
                  <TD>
                    <ItemQuantity>{item.quantity}</ItemQuantity>
                  </TD>
                  <TD>
                    <ItemPrice>{item.price}</ItemPrice>
                  </TD>
                  <TD>
                    <ItemSubtotal>${((+item.price.replace(/\$/g, '')) * item.quantity).toFixed(2)}</ItemSubtotal>
                  </TD>

                </SummaryItem>
              ))}
            </tbody>
          </Table>
          <TotalContainer>
            <TotalLabel>Total</TotalLabel>
            <TotalAmount>${total.toFixed(2)}</TotalAmount>
          </TotalContainer>
        </OrderSummarySection>




        <CheckoutSection>
          <SectionTitle>Shipping Address</SectionTitle>
            <InputContainer>
              <InputLabel>First Name</InputLabel>
              <Input
                required
                name="firstName"
                type="text"
                placeholder="Your first name"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Last Name</InputLabel>
              <Input
                required
                name="lastName"
                type="text"
                placeholder="Your last name"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Email</InputLabel>
              <Input
                required
                name="email"
                type="email"
                placeholder="Your email"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Address Line</InputLabel>
              <Input
                required
                name="addressLine"
                type="text"
                placeholder="Your address"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Province</InputLabel>
              <Input
                required
                name="province"
                type="text"
                placeholder="Your province"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Country</InputLabel>
              <Input
                required
                name="country"
                type="text"
                placeholder="Your country"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>Postal Code</InputLabel>
              <Input
                required
                name="postalCode"
                type="text"
                placeholder="Your postal code"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel>City</InputLabel>
              <Input
                required
                name="city"
                type="text"
                placeholder="Your city"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </InputContainer>

            
        </CheckoutSection>

      

        <CheckoutSection>
        <SectionTitle>Payment Method</SectionTitle>
        <CheckoutSection>
          <SectionTitle>Credit Card Information</SectionTitle>
          <InputContainer>
            <InputLabel>Credit Card Number</InputLabel>
            <Input
              required
              name="cardNumber"
              type="text"
              maxLength="16"
              placeholder="Card number"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Cardholder Name</InputLabel>
            <Input
              required
              name="cardName"
              type="text"
              placeholder="Cardholder name"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Expiration Date</InputLabel>
            <Input
              required
              name="expirationDate"
              type="text"
              placeholder="MM/YY"
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </InputContainer>

          <InputContainer>
            <InputLabel>CVV</InputLabel>
            <CVVInput
              required
              name="CVV"
              type="password"
              maxLength="3"
              placeholder=""
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </InputContainer>

          <PaymentButtonContainer>
            <CheckoutButton type="submit">Pay Now</CheckoutButton>
          </PaymentButtonContainer>

        </CheckoutSection>
      </CheckoutSection>

      </CheckoutForm>
    </WrapperContainer>

    
  );
};

const WrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  background-color: #f5f5f5;
  min-height:850px;
`;

const CheckoutForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 80px;
`;


const SummaryItem = styled.tr`
border-bottom: 1px solid #ccc;
  padding: 50px;
  &:last-child {
    border-bottom: none;
  }
`;

const PaymentButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


const CheckoutSection = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-right: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const CVVInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100px; 
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 90%;
`;

const CheckoutButton = styled.button`
  cursor: pointer;
  padding: 10px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  &:hover {
    background-color: #000066;
    cursor: pointer;
    color:white;
    }
    transition: background-color 0.3s;
`;

const OrderSummarySection = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  width: 400px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  margin-top:30px;
  color: #333;
  border-bottom: 1px solid #ccc;
  font-size:20px;
  font-weight:bold;
  
`;

const Table = styled.table`
  width: 100%;

`;

const TH = styled.th`
  text-align: center;
  padding:8px ;
  margin-left: 25px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  background-color: #f0f0f0; 
  color: #333; 
`;


const TD = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ccc;
  text-align: center; 
  vertical-align: middle
`;


const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const ItemQuantity = styled.span`
  margin-right: 10px;
`;

const ItemPrice = styled.span`
  margin-right: 10px;
`;

const ItemSubtotal = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: black;
  text-align: center; 
  white-space: nowrap;

`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
  padding: 5px;
`;

const TotalLabel = styled.span``;

const TotalAmount = styled.span`
padding-right: 18px;
`



export default CheckOut;

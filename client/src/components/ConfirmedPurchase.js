import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import logo from "./assets/E-marketlogo.png";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";


const ConfirmationPage = () => {
  // extracting orderId from URL using Prams
  const { orderId } = useParams();

  //useState used to create the orderDetails , 
  //it has specifc order fetched from the backend
  const [orderDetails, setOrderDetails] = useState(null);

  //UseEffect help to fetch order details  by making get request 
  
  useEffect(() => {
    fetch(`/orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrderDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  }, [orderId]);

  if (!orderDetails) {
    return (
      <MainDiv>
        <CircularProgress />
      </MainDiv>
    );
  } else {
    return (
    <Div>
      <ConfirmationContainer>
        <Header>
          <Logo src={logo} alt="E-market" />
          <ThankYouMessage>Thank you for your order!</ThankYouMessage>
        </Header>
        <OrderDetailsContainer>
          <OrderTitle>Order Details</OrderTitle>
          <OrderInfo>Order ID: {orderDetails._id}</OrderInfo>
          <OrderInfo>
            Name: {orderDetails.firstName} {orderDetails.lastName}
          </OrderInfo>
          <OrderInfo>Email: {orderDetails.email}</OrderInfo>
          <OrderInfo>
            Shipping Address: {orderDetails.addressLine},{" "}
            {orderDetails.city}, {orderDetails.province},{" "}
            {orderDetails.country}, {orderDetails.postalCode}
          </OrderInfo>
        </OrderDetailsContainer>
        <OrderSummary>
          <ItemTable>
            <thead>
              <tr>
                <TH>Item </TH>
                <TH></TH>
                <TH>Quantity</TH>
                <TH>Subtotal</TH>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item) => (
                <CartItem key={item.itemId}>
                  <TD>
                    <ItemImageContainer>
                      <ItemImage src={item.imageSrc} />
                    </ItemImageContainer>
                  </TD>
                  <TD>
                    <ItemName> {item.name}</ItemName></TD>
                  <TD><ItemQuantity>{item.quantity} </ItemQuantity></TD>
                  <TD><ItemSubtotal>${((+item.price.replace(/\$/g, '')) * item.quantity).toFixed(2)}</ItemSubtotal></TD>
                </CartItem>
              ))}
            </tbody>
          </ItemTable>
          <GrandTotal>Total: ${orderDetails.total.toFixed(2)}</GrandTotal>
        </OrderSummary>
        <ConfirmationMessage>
          We're thrilled to have you as a valued customer. Your order is being processed with care. We will keep you
          updated throughout the shipment process and send you a confirmation email once your order is on its way.
        </ConfirmationMessage>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button>Continue Shopping</Button>
        </Link>
      </ConfirmationContainer>
      </Div>
    );
  }
};

const CartItem = styled.tr`
  border-bottom: 1px solid #ccc;
  padding: 50px;
  &:last-child {
    border-bottom: none;
  }
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 850px;
`;


const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ConfirmationContainer = styled.div`
  max-width: 500px;
  margin: 10px 20px;
  padding:20px;
  
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  height: 110px;
  border-radius: 50%;
`;

const ThankYouMessage = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  background-color: #f0f0f0; 
  padding:20px;
  font-weight:bold;
  background-color: lightblue;
`;

const OrderDetailsContainer = styled.div`
  margin-bottom: 40px;
  
`;

const OrderTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  font-weight:bold;
  
  padding:10px;
  background-color: #f0f0f0; 
`;

const OrderInfo = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
  
`;

const OrderSummary = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 20px;
  
`;

const ItemTable = styled.tr`
  width: 100%;
  border-collapse: collapse;
  padding: 10px;
`;

const TH = styled.th`
  text-align: center;
  padding:10px ;
  margin-left: 25px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;

  color: #333; /* Text color for the table header */
`;


const TD = styled.td`

  padding: 8px;
  border-bottom: 1px solid #ccc;
  text-align: center; /* Center the content inside the table cell */
  vertical-align: middle;

`;

const ItemQuantity = styled.span`
  margin-right: 10px;
`;
const ItemName = styled.span`
  margin-right: 10px;
`;

const ItemImageContainer = styled.div`
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 4px;
`;
const ItemSubtotal = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: black;
  text-align: center; 
  white-space: nowrap;

`;
const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GrandTotal = styled.p`
  font-weight: 600;
  text-align: right;
  padding-top: 10px;
  padding-right: 15px;
`;

const ConfirmationMessage = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 20px;
  margin-bottom: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export default ConfirmationPage;
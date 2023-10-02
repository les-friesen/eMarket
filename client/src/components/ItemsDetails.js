import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiShoppingCartLine } from 'react-icons/ri';
import AddToCartAction from './AddToCartAction';
import { StoreContext } from '../context-and-reducer/StoreContext';
import { CircularProgress } from '@mui/material';
const ItemsDetails = ({ setCartUpdate }) => {
    
    const { items } = useContext(StoreContext); 

  const { itemId } = useParams();

  // Checking to see if the item is already in the cart - if existingItem exists, the
  // number available will be updated based on what is in the cart. 

  const existingItem = items.find(item => item._id === +itemId)

  // Using state because we want to set the fetching data
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchItemDetails();
  }, [itemId]);

  const fetchItemDetails = async () => {
    try {
      const response = await fetch(`/items/${itemId}`);
      const data = await response.json();
      setSelectedItem(data);
      setIsLoading(false); 
    } catch (error) {
      console.error(error);
      setSelectedItem(null);
      setIsLoading(false);
    }
  };
  if (isLoading) {
    // Show Spinner while loading items
    return (
        <MainDiv>
  <CircularProgress /> 
        </MainDiv>
      );
    } else {

  return (
    <CenteredContainer>
      {selectedItem ? (
        <Card>
            <div>
            <ItemImage src={selectedItem.imageSrc} alt={selectedItem.name} />
            </div>
        <Detail>

          <ItemDetails>
              <ItemName>{selectedItem.name}</ItemName>
              <ItemPrice>Price: {selectedItem.price}</ItemPrice>
              <ItemDescription>{selectedItem.description}</ItemDescription>
              <ItemAvailability available={selectedItem.numInStock > 0}>
                {selectedItem.numInStock > 0 ? 'Available' : 'Out of stock'}
              </ItemAvailability>
              <ItemLeft available={selectedItem.numInStock > 0}>
      
                { existingItem && selectedItem.numInStock - existingItem.quantity > 0 ?
                (`Only ${ existingItem ? existingItem.numInStock - existingItem.quantity : selectedItem.numInStock } left`)
                : existingItem && selectedItem.numInStock - existingItem.quantity === 0 ?
                  <span style={{ color: 'green' }}> Looks like you've snatched up the last remaining stock of this item! Please proceed to your cart or continue shopping </span>
                : selectedItem.numInStock > 0  ? (
                  `Only ${ existingItem ? existingItem.numInStock - existingItem.quantity : selectedItem.numInStock } left`
                ) : (
                  <span style={{ color: 'red' }}> Please do try again in next few days </span>
                )}
              </ItemLeft>

              {selectedItem.numInStock > 0 && (
                <AddToCartAction
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  setCartUpdate={setCartUpdate}
                  existingItem={existingItem}
                />
              )}
            </ItemDetails>
            <CompanyInfo>
              <h3>This item made by </h3>
              <p>{selectedItem.company.name} </p>
              <p>Country: {selectedItem.company.country}</p>
              <p>
                Website: <a href={selectedItem.company.url} target="_blank" rel="noopener noreferrer">{selectedItem.company.url}</a>
              </p>
            </CompanyInfo>
            </Detail>
        </Card>
      ) : (
        <LoadingMessage>Loading...</LoadingMessage>
      )}
    </CenteredContainer>
  );
};
}
const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

`;
const Card = styled.div`
  display: flex;
  align-items: center; 
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  overflow: hidden;
  padding: 20px 40px; 
`;

const Detail = styled.div`
display: flex;
flex-direction: column;
padding: 40px;
  max-width: 400px;
`
const ItemImage = styled.img`
  width: 300px; 
  height: 250px; 
  object-fit: contain;
`;

const ItemDetails = styled.div`
  padding: 20px;
  max-width: 400px; 
`;

const ItemName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ItemPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ItemDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ItemAvailability = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => (props.available ? 'green' : 'red')};
`;

const ItemLeft = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: ${(props) => (props.available ? 'green' : 'red')};
  font-weight: ${(props) => (props.available ? 'normal' : 'bold')};
`;

const LoadingMessage = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
  margin-top: 10px;

  &:hover {
    color: #ff4500;
  }
`;

const ShoppingCartIcon = styled(RiShoppingCartLine)`
  margin-right: 5px;
`;

const CompanyInfo = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 5px;
  }

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default ItemsDetails;
// revised

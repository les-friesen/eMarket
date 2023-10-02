import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "./assets/E-marketlogo.png";
import online from "./assets/online.webp";
import { FaTruck, FaCreditCard, FaStar } from "react-icons/fa";


const bigImage = online;

const HomePage = () => {
  return (
    <CenteredWrapper>
      <BigImageWrapper>
        <BigImage src={bigImage} alt="Big Image">
          <LogoImage src={logo} alt="E-Marketplace Logo" />
          <ShopNowSection>
            <ShopNowContent>
              <CatchySlogan>Discover Delights at Every Click!</CatchySlogan>
              <StyledLink to={"/Items"}>Shop Now</StyledLink>
            </ShopNowContent>
          </ShopNowSection>
          <SpecialFeatureWrapper>
            <SpecialFeature>
              <SpecialIcon>
                <FaTruck size={32} />
              </SpecialIcon>
              <SpecialText>Free Shipping</SpecialText>
            </SpecialFeature>
            <SpecialFeature>
              <SpecialIcon>
                <FaCreditCard size={32} />
              </SpecialIcon>
              <SpecialText>Secure Payments</SpecialText>
            </SpecialFeature>
            <SpecialFeature>
              <SpecialIcon>
                <FaStar size={32} />
              </SpecialIcon>
              <SpecialText>Top-Rated Products</SpecialText>
            </SpecialFeature>
          </SpecialFeatureWrapper>
        </BigImage> 
      </BigImageWrapper>
    
    </CenteredWrapper>
  );
};

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:850px;
  background-color: #FFB700;
`;

const BigImageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

`;
const BigImage = styled.div`
  position: relative;
  width: 100%;
  min-height: 800px; /* Change 'height' to 'min-height' */
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;

`;
const ShopNowSection = styled.div`
  position: absolute;
  left: 150px;
  top: 400px;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 10px;
  color: #fff;
`;

const ShopNowContent = styled.div`
  text-align: center;
`;

const CatchySlogan = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const StyledLink = styled(NavLink)`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #FFB700;
  padding: 20px 40px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #000066;
    cursor: pointer;
    color:white;
    }
    transition: background-color 0.3s;
`;

const LogoImage = styled.img`
  position: absolute;
  top: 80px;
  right: 100px;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50% ;
  border: solid 5px  #FFA200;
  
`;

const SpecialFeatureWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;
  margin: 20px;
`;

const SpecialFeature = styled.div`
  margin-top:5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000066;
`;

const SpecialIcon = styled.div`
  background-color: #FFB700;
  border-radius: 50%;
  padding: 10px;
`;

const SpecialText = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;

export default HomePage;
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import background from "./assets/background.jpg";
import { Link } from "react-router-dom";
import { CircularProgress } from '@mui/material';

// This component displays an About page which shows the stores mission statement and 
// has links to all of our partner websites. 

const About = () => {

  const [companyData, setCompanyData] = useState(); 

// Creation of a loading state to show a spinner while company data is being fetched. 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems(); 
}, []);

// Fetches info for all of the companies from the server

const fetchItems = async () => {
    try {
    const response = await fetch('/companies'); 
    const data = await response.json();
    console.log(data)
    setCompanyData(data);
    setIsLoading(false); 
    } catch (error) {
    console.error(error);
    setCompanyData([]); 
    setIsLoading(false);
    }
};

  return (
    isLoading ? <ProgressDiv><CircularProgress /> </ProgressDiv>
    : 
    <FullPage>
      <ImageDiv style={{ backgroundImage: `url(${background})` }}>
        <TextDiv>
          Welcome to e-market! We provide a seamless online shopping experience
          for clients seeking a wide range of durable, made-to-last products. 
          Our mission is to curate a selective offering from exclusive partners 
          who share our commitment to reducing waste and increasing the life-span of
          products that we need and use in our every day lives.  
          Each e-market product has been carefully selected and vetted by our team 
          of experts to ensure that it is of top-notch quality in terms of its 
          materials, design, functionality and aesthetic. 
        </TextDiv>
        <TextDiv2>
          Our partners
        </TextDiv2>
      </ImageDiv>
      <PartnersDiv>
          { companyData.map((item) => {
            return (
              <div className="partners">
                <StyledLink target="_blank" to={item.url}><Button> {item.name}</Button></StyledLink>
              </div>
            )
          })}
        </PartnersDiv>
    </FullPage>
  );
};

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction:column;
  align-items: center;
  height:850px;
`;

const StyledLink = styled(Link)`
text-decoration: none; 
`; 

const ProgressDiv = styled.div`
display: flex; 
justify-content: center;
align-items: center; 
height: 100vh;
width: 100vw; 
`

const PartnersDiv = styled.div`
padding: 10px 0 10px 0; 
width: 100vw; 
display: flex;
flex-direction: row; 
flex-wrap: wrap; 
justify-content: center;  
width: 100vw; 
`

const ImageDiv = styled.div`
  background-image: url(${background});
  margin: 0;
  padding: 0;
  height: 80vh; 
  width: 100vw;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between; 

  img {
    height: 80px; 
  }
`;

const TextDiv2 = styled.div`
color: white;
font-size: 17px;
border-radius: 15px; 
margin-bottom: 10px; 
background-color: #000066;
opacity: 0.8;
padding: 20px;
`; 

const TextDiv = styled.div`
width: 60vw;
margin-top: 160px; 
color: white;
font-size: 17px;
border-radius: 15px; 
margin-bottom: 20px; 
background-color: #000066;
opacity: 0.8;
padding: 20px;
`;

const Button = styled.button`
margin: 2px; 
display: flex; 
justify-content: center; 
align-items: center; 
text-decoration: none;
color: white;
font-size: 12px;
background-color: #FFB700;
padding: 10px 20px;
height: 25px; 
border-radius: 5px;
transition: background-color 0.3s;

&:hover {
  background-color: #000066;
}
`;

export default About;

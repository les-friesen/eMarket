import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

// Component to display all available items. They can be filtered by category and a maximum
// of 50 items will be displayed per page. 

const Items = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Number of items to display per page

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/items");
      const data = await response.json();
      setItems(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setItems([]);
      setIsLoading(false);
    }
  };

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const uniqueCategories = [
    "All",
    ...new Set(items.map((item) => item.category)),
  ];

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  // Calculate the range of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

  // Function to handle page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <Container>
        <LeftSection>
          <H2>Categories</H2>
          <CategoryList>
            {uniqueCategories.map((category) => (
              <CategoryItem key={category}>
                <CategoryButton onClick={() => setSelectedCategory(category)}>
                  {category}
                </CategoryButton>
              </CategoryItem>
            ))}
          </CategoryList>
        </LeftSection>
        <RightSectionContainer>
          <RightSection>
            {itemsToDisplay.map((item) => (
              <ProductItem key={item._id}>
                <Link
                  to={`/items/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ProductImage src={item.imageSrc} alt={item.name} />
                </Link>
                <ProductName to={`/items/${item._id}`}>{item.name}</ProductName>
                <ProductPrice>Price: {item.price}</ProductPrice>
                <Link
                  to={`/items/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <BuyNowButton>
                    Buy now <CartIcon />
                  </BuyNowButton>
                </Link>

              
              </ProductItem>
            ))}
          </RightSection>
        </RightSectionContainer>
        <PaginationContainer>
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationItem>
            ))}
          </Pagination>
        </PaginationContainer>
      </Container>
    );
  }
};

const H2= styled.div`
font-size: 20px;
font-weight: bold;
color: #000066;
margin-bottom:15px;
`
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

const CartIcon = styled(RiShoppingCartLine)`
  font-size: 18px;
  margin-left: 6px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;
  position: relative;
  background-color: #f5f5f5;
  
`;

const LeftSection = styled.nav`
  flex: 0 0 auto;
  background-color: #f0f0f0;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin-left: 10px;
  margin-top: 20px;
  border: 1px solid #ccc;

`;

const CategoryList = styled.ul`
  list-style: none;
  padding-top: 10px;
`;

const CategoryItem = styled.li`
  margin-bottom: 10px;
  
`;

const CategoryButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 10;
  font-size: 16px;
  color: black; 
  transition: transform 0.2s ease-in-out; 
  border-radius: 6px; 
  &:hover {
    color: black;
    text-decoration: underline; 
    background-color:#007bff;
    transform: scale(1.1);
    
  }

  &:focus {
    outline: none;
  }
`;

const RightSectionContainer = styled.div`
  flex: 1;
  margin-left: 200px; 
  padding-left: 10px;
`;

const RightSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  align-items: center; 
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

const PaginationItem = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
  color: ${({ active }) => (active ? "#007bff" : "black")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border: 1px solid ${({ active }) => (active ? "#007bff" : "#ccc")};
  border-radius: 4px;

  &:hover {
    background-color: ${({ active }) => (active ? "#007bff" : "#f0f0f0")};
  }
`;

const ProductItem = styled.div`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px; 
  
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px; 
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProductName = styled(Link)`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  flex-grow: 1;
  &:hover {
    color: #007bff;
    cursor: pointer;
  }
`;

const ProductPrice = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const BuyNowButton = styled.button`
  border: none;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

export default Items;

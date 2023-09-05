import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';

import Menu from "./Menu";

const Container = styled.div`
  position: fixed;
   top: 0;
   left: 0;
  // // width: 100vw;
  // // height: 100vh;
  // flex-wrap: wrap;
  // overflow: hidden;
  // display: flex;
  // border: solid;
`;

const BurgerIconWrapper = styled.div`
    position: relative;
    top: 8px;
    left: 10px;
`;



const MenuItemOuterContainer = styled.div`
  display: flex;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s;
  width: 100%;
  height: 100%;
  margin-top: 6px;
  margin-left: 5px;

`;

const MenuItemInnerContainer = styled.div`
 // background-color: rgba(255, 255, 255);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: fit content;
  background-color: rgba(245, 245, 250);
  border-radius: 5px;
  border: solid 1px gray;

`;

const EmptyRightContainer = styled.div`
  flex-basis: 100%;
  //background-color: rgba(0,0,0,0.5);

`;

const BurgerIcon = styled.div`
  justify-content: center;
  align-items: top;
  cursor: pointer;
  width: 25px;
  height: 30px;
  padding: 5px;
`;

const BurgerLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
  margin: 4px 0;
  transition: transform 0.3s;
`;

const FirstLine = styled(BurgerLine)`
  transform: ${({ isOpen }) =>
    isOpen ? "rotate(45deg) translate(4px, 4px)" : "rotate(0)"};
`;

const MiddleLine = styled(BurgerLine)`
  opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
`;

const ThirdLine = styled(BurgerLine)`
  transform: ${({ isOpen }) =>
    isOpen ? "rotate(-45deg) translate(4px, -4px)" : "rotate(0)"};
`;






const EmptyBottomContainer = styled.div`
  //top: 50px;
  position: relative;
  height: 100%;
`;

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(null);
    const containerRef = useRef(null); // Ref to the Container element

    const handleMenuClick = () => 
    {
        setIsOpen(!isOpen);
    }
    
    const handleClickOutside = (event) => {
      // Check if the click event is outside the Container
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      // Attach event listener when the component mounts
      document.addEventListener("click", handleClickOutside);
      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
  
    return (
        <Container>
            <BurgerIconWrapper>
                <BurgerIcon onClick={handleMenuClick}>
                    <FirstLine isOpen={isOpen}/>
                    <MiddleLine isOpen={isOpen}/>
                    <ThirdLine isOpen={isOpen}/>
                </BurgerIcon>
            </BurgerIconWrapper>
            <MenuItemOuterContainer isOpen={isOpen}>
                <MenuItemInnerContainer>
                    <Menu fromBurger={true} />
                    <EmptyBottomContainer onClick={handleMenuClick}/>

                </MenuItemInnerContainer>
                <EmptyRightContainer onClick={handleMenuClick}></EmptyRightContainer>
            </MenuItemOuterContainer>
  
        </Container>
    );
};

export default BurgerMenu;
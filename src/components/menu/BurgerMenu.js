import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';

import Menu from "./Menu";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  flex-wrap: wrap;
  overflow: hidden;
  display: flex;
`;

const BurgerIconWrapper = styled.div`
    position: relative;
    top: 10px;
    left: 10px;
`;



const MenuItemOuterContainer = styled.div`
  display: flex;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s;
  width: 100%;
  height: 100%;
  margin-top: 15px;
  z-index: 999;

`;

const MenuItemInnerContainer = styled.div`
    flex-basis: 70%;
    background-color: rgba(0,10,10,1);

`;

const EmptyRightContainer = styled.div`
  flex-basis: 30%;
  background-color: rgba(0,0,0,0.5);


`;

const BurgerIcon = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 25px;
  height: 30px;
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
    width: 100%;
    height: 100%;
`;

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(null);

    const handleMenuClick = () => 
    {
        setIsOpen(!isOpen);
    }

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
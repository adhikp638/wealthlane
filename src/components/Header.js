import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import logo_dark from "../assets/img/wealthlane.svg";
import logo_white from "../assets/img/logowhite.png";
import BurgerMenu from "./menu/BurgerMenu";
import Menu from "./menu/Menu";
import wl_background from "../assets/img/wealthlane_background_alt4.jpeg";

const Container = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding-bottom: 5px;
  z-index: 999;
  background-color: rgba(255,255,255,1);
  color: black;
  border-bottom: solid 1px rgba(0,10,10,0.5);

`;

const Left = styled.div`
  display: none;
  top: 10px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.img`
  top: 20px;
  padding-top: 10px;
  padding-left: 2%;
  max-width: 40%;
  max-height: 40%;
`;

const Center = styled.div`
  top: 10px;
  display: block;
  padding-top: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Right = styled.div`
  padding-top: 10px;
`;

const StyledLink = styled.a`
  color: black;
  margin-right: 10px;
  margin-left: 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const Header = () => {

  return (
    <Container>
      {/* <Left> */}
        {/* <BurgerMenu/> */}
      {/* </Left> */}
      <a href="/"><Logo src={logo_dark}/></a>
      <Center>
        {/* <Menu layout="row" /> */}
      </Center>
      <Right>
        <StyledLink href="https://wealthlane-customer-uat.wealthlane.co/"> Customer Login</StyledLink>
        <span>|</span>
        <StyledLink href="https://wealthlane-participant-uat.wealthlane.co/"> Participant Login</StyledLink>
      </Right>
    </Container>
  );
};

export default Header;

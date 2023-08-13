import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import logo_dark from "../assets/img/Logo.svg";
import logo_white from "../assets/img/logowhite.png";
import logo_alt from "../assets/img/wl_alt_logo_4.jpeg";

import BurgerMenu from "./menu/BurgerMenu";
import Menu from "./menu/Menu";
import wl_background from "../assets/img/wealthlane_background_alt4.jpeg";

const Container = styled.div`
  padding-left: 5%;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  height: 40px;
  padding-bottom: 5px;
  z-index: 1;
  // background-color: rgba(255,255,255,1);
  background-color: rgba(245, 245, 250);

  color: black;
  border-bottom: solid 1px rgba(0,10,10,0.5);

`;

const Left = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.img`
  width: 180px;
`;

const Right = styled.div`
  position: relative;  
  left: 100px;
  top: 5px;
  margin-right : auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLogo = styled.div`
  position: relative;  
  left: 20px;
  top: 5px;
  @media (max-width: 768px) {
    left: 60px;
  }
`;


const StyledLink = styled.a`
  color: black;
  margin-right: 10px;
  margin-left: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`
const Header = () => {

  return (
    <Container>
      <Left>
        <BurgerMenu/>
      </Left>
      {/* <Logo src={logo_dark}/> */}

      <StyledLogo>
        <a href="/"><Logo src={logo_dark}/></a>
      </StyledLogo>

      <Right>
        <Menu />
      </Right>

    </Container>
  );
};

export default Header;

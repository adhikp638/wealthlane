import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import logo_dark from "../assets/img/Logo.svg";
import logo_white from "../assets/img/logowhite.png";
import logo_alt from "../assets/img/wl_alt_logo_4.jpeg";

import BurgerMenu from "./menu/BurgerMenu";
import Menu from "./menu/Menu";
import wl_background from "../assets/img/wealthlane_background_alt4.jpeg";

const Container = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  height: 40px;
  padding-bottom: 5px;
  z-index: 999;
  background-color: rgba(255,255,255,1);
  color: black;
  border-bottom: solid 1px rgba(0,10,10,0.5);

`;

const Left = styled.div`
`;

const Logo = styled.img`
  width: 180px;

`;

const Center = styled.div`
  position: relative;  
  left: 60px;
  top: 5px;
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

      <Center>
      <a href="/"><Logo src={logo_dark}/></a>
      </Center>

    </Container>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import wl_background from "../assets/img/wealthlane_background_alt4.jpeg";
import "./Main.css";
import Header from "./Header";

const MainContainer = styled.div`
  position: relative;
`;


const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  z-index: 0; /* Set a lower z-index to place it below the overlay */
`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10% 15%;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15% 10%;
  }
  
  background: rgba(20, 0, 0, 0.3);
  height: 68vh;
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MainBodyText = styled.div`
  margin-top: 5%;
  line-height: 1.5;
  font-size: 24px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  animation: ${({ loaded }) => (loaded ? fadeInAnimation : "none")} 1s ease-in-out;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const HeaderBodyText = styled.div`
  line-height: 1.5;
  font-size: 36px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  animation: ${({ loaded }) => (loaded ? fadeInAnimation : "none")} 1s ease-in-out;
  margin-top: 10px;
  @media (max-width: 768px) {
    font-size: 24px;
  }

  text-decoration: underline;
`;

const LargeBodyText = styled.div`
  line-height: 1.5;
  font-size: 36px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  animation: ${({ loaded }) => (loaded ? fadeInAnimation : "none")} 1s ease-in-out;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Main = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = wl_background;
    image.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <MainContainer>
        <BackgroundImage src={wl_background} alt="Background Image" loaded={imageLoaded} />
      <ContentContainer>
        <HeaderBodyText loaded={imageLoaded}>Wealthlane <br/> Equity Awards Reimagined </HeaderBodyText>
        <MainBodyText loaded={imageLoaded}>
        A meticulously crafted SaaS solution built from the ground up to cater to 
        the modern workplace where Equity Awards are increasingly becoming a key differentiator
        for employee acquisiton, engagement and retention.    

        <br/>
        <br/>
          Partner with wealthlane to fully realize the potential of this important offering and 
          join us as we disrupt the Equity Awards landscape of today and tomorrow.
        </MainBodyText>
      </ContentContainer>
    </MainContainer>
  );
};

export default Main;

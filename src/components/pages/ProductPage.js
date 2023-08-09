import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import abc from "../../assets/video/cust_persona_draft.mp4";
import system_img  from "../../assets/img/system.jpeg";

const Container = styled.div``;

const PageContainer = styled.div`
    display: flex;
    flex-flow: row;
    box-sizing: border-box;
    width: 100%;
    padding-left: 50px;
    padding-right: 50px;
    align-items: top;
    justify-content: top;
    height: 100vh;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Align the HeadingText to the left */
    height: 40px;
    margin-bottom: 40px;
    margin-left: 45px;
`;

const VideoDescriptionWrapper = styled.div`
    display: flex;
    width: 50%;
    height: 50vh;
    position: relative;
    align-items: top;
    flex-flow: column;
    justify-content: top;
    border: solid 1px rgba(0,10,10,0.3);
    background-color: rgba(245, 245, 250);

`;

const HeadingText = styled.div`
    font-size: 18px;
    color: black;
    border-bottom: solid 1px rgba(0,10,10,0.3);
    margin-top: 20px;
    display: flex;
    text-align: left;
`;

const BodyText = styled.div`
    font-size: 16px;
    color: black;
    padding-right: 20px;
    padding-top: 10px;
    padding-left: 20px; 
    padding-bottom: 10px;
    
`;

const LI = styled.li`
    line-height: 1;
    margin-bottom: 15px;
    background-color: rgba(220, 220, 255);
    padding: 5px;
    border-radius: 5px;
`;

const UL = styled.ul`
    line-height: 2;
    padding-top: 10px;
    padding-bottom: 20px;
    list-style-type:none;
    padding:0;
    margin:0;

`;

const VideoContainer = styled.div`
    width: 0;
    height: 100%;
    // z-index: 1;
    overflow: hidden;
    transition: width 0.5s ease-in-out;

    ${({ isVisible }) =>
      isVisible &&
      css`
        width: 100%;
      `}
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const VideoContainerWrapper = styled.div`
    display: flex;
    width: 50%;
    height: 50vh;
    background-image: url(${system_img});
    background-size: cover;
    background-position: center;
    border: solid 1px rgba(0,10,10,0.3);

    @media (max-width: 768px) {
        width: 100%;
      }
`;

const CustomerDemoDescription = ({ onClick }) => {
    return (
        <VideoDescriptionWrapper>
                     <BodyText>We have built a wealth of features for equity plan administrators with 
                self-service as the driving mantra:
                <UL>
                    <LI>
                        A comprehensive and interactive dashboard for effective task management as well as 
                        a holistic view of the Company's equity award footprint.
                    </LI>
                    <LI>
                        Highly configurable and robust entitlements framework that allows the admin to 
                        configure fine grained access control
                    </LI>
                    <LI>
                        Rich set of features for uploading plans, creating grants and custom 
                        vesting templates on top of pre-defined ones.
                    </LI>
                    <LI>
                        A powerful tax configuration engine to create any type of tax for any jurisdiction
                        that comes with pre-sets that can be copied from and overriden as needed
                    </LI>
                    <LI>
                        API based integration with Finch to auto-source employee demographics and payroll data
                    </LI>
                    <LI>
                        Robust features to manage all aspects of the equity award lifecycle
                    </LI>
                </UL>
                <a href="#" onClick={onClick}>Explore the video</a>
            </BodyText>
        </VideoDescriptionWrapper>
    );
};

const ProductPage = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const toggleVideoVisibility = () => {
    setIsVideoVisible(!isVideoVisible);
  };

  return (
    <Container>
      <Top>
        <HeadingText>Wealthlane Customer Portal</HeadingText>
      </Top>
      <PageContainer>
        {/* <CustomerDemoDescription onClick={toggleVideoVisibility} /> */}
        <VideoContainerWrapper>
          <VideoContainer isVisible={true}>
            <Video controls>
              <source src={abc} type="video/mp4" />
              Your browser does not support the video tag.
            </Video>
          </VideoContainer>
        </VideoContainerWrapper>

      </PageContainer>
    </Container>
  );
};

export default ProductPage;

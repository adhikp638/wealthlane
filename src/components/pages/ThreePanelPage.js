import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from 'aos';
import 'aos/dist/aos.css';
import office_building from "../../assets/img/office_building.jpeg";
import employee_img from "../../assets/img/employees.jpeg";
import system_img  from "../../assets/img/system.jpeg";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding-left: 2%;
  padding-right: 2%;
  margin-bottom: 30px;
`;

const PanelPage = styled.div`
  display: flex;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Panel = styled.div`
  border: solid 1px rgba(0,10,10,0.3);
  flex: 1;
  min-height: 550px;
  margin: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Rectangle = styled.div`
  position: absolute;  
  top: 0%;
  width: 100%;
  height: 40%;
  //border-radius: 50%;
  //margin-bottom: 10px;
  overflow: hidden;
  display: flex;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SmallText = styled.p`
  position: absolute;
  top: 50%;
  margin-top: 20px;
  color: black;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 1.5;
`;

const LargeText = styled.div`
  position: absolute;
  top: 40%;
  margin-top: 20px;
  color: black;
  font-size: 30px;  
  border-bottom: solid 1px rgba(0,10,10,0.3);
  padding-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageHeader = styled.div`
  color: black;
  font-size: 36px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  border-bottom: solid 1px rgba(0,10,10,0.3);
  padding-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;
const ThreePanelPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 500, // Set the duration to 500 milliseconds (0.5 seconds)
    });
  }, []);

  return (
    <Page>
      <PageHeader data-aos="fade-in">
        Our unique offering
      </PageHeader>
      <PanelPage>
        <Panel data-aos="fade-in">
          <Rectangle>
            <img src={system_img} alt="system" />
          </Rectangle>
          <TextWrapper>
            <LargeText>The Wealthlane System</LargeText>
            <SmallText>Wealthlane is a cloud native platform that is fully greenfield. 
                It is highly configurable and automated which allows for self service. It was designed with productivity and ease of use in mind. 
                It has built in integration with HRIS platforms and API based architecture that will seamlessly allow for third party intigrations including AI platforms.
                
                </SmallText>

          </TextWrapper>
        </Panel>
        <Panel data-aos="fade-in">
          <Rectangle>
            <img src={office_building} alt="Office Building" />
          </Rectangle>
          <TextWrapper>
            <LargeText>For Employers</LargeText>
            <SmallText>
                A highly automated system to seamlessly manage Equity awards with a highly configurable tax engine and dynamic reporting. 
                Access to a broad knowledge base around Equity Compensation.
            </SmallText>

          </TextWrapper>
        </Panel>
        <Panel data-aos="fade-in">
          <Rectangle>
            <img src={employee_img} alt="Employees" />
          </Rectangle>
          <TextWrapper>
            <LargeText>For Employees</LargeText>
            <SmallText>A holistic view of Equity Award portfolio with trading capibilities </SmallText>

          </TextWrapper>
        </Panel>
      </PanelPage>
    </Page>
  );
};

export default ThreePanelPage;

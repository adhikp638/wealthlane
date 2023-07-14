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
  border: solid 1px yellow;
  padding-left: 10%;
  padding-right: 10%;
`;

const PanelPage = styled.div`
  display: flex;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Panel = styled.div`
  border: solid 1px green;
  flex: 1;
  min-height: 700px;
  margin: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Circle = styled.div`
  position: absolute;  
  top: 10%;
  border: solid 1px red;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  //margin-bottom: 10px;
  overflow: hidden;
  display: flex;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const SmallText = styled.p`
  position: absolute;
  top: 50%;
  margin-top: 10px;
  color: black;
  padding-left: 10px;
  padding-right: 10px;
`;

const LargeText = styled.div`
  position: absolute;
  top: 40%;
  margin-top: 10px;
  color: black;
  font-size: 30px;  
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageHeader = styled.div`
  color: black;
  font-size: 26px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: underline;
  margin-top: 20px;
`;

const ThreePanelPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 500, // Set the duration to 500 milliseconds (0.5 seconds)
    });
  }, []);

  return (
    <Page>
      <PageHeader>
        Our unique offering
      </PageHeader>
      <PanelPage>
        <Panel data-aos="fade-in">
          <Circle>
            <img src={system_img} alt="system" />
          </Circle>
          <TextWrapper>
            <LargeText>The Wealthlane System</LargeText>
            <SmallText>Wealthlane is a cloud native platform that is fully greenfield. 
                It is highly configurable and automated which allows for self service. It was designed with productivity and ease of use in mind. 
                It has built in integration with HRIS platforms and API based architecture that will seamlessly allow for third party intigrations including AI platforms.
                
                </SmallText>

          </TextWrapper>
        </Panel>
        <Panel data-aos="fade-in">
          <Circle>
            <img src={office_building} alt="Office Building" />
          </Circle>
          <TextWrapper>
            <LargeText>For Employers</LargeText>
            <SmallText>
                A highly automated system to seamlessly manage Equity awards with a highly configurable tax engine and dynamic reporting. 
                Access to a broad knowledge base around Equity Compensation.
            </SmallText>

          </TextWrapper>
        </Panel>
        <Panel data-aos="fade-in">
          <Circle>
            <img src={employee_img} alt="Employees" />
          </Circle>
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

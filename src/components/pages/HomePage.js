import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Main from "../Main";
import ThreePanelPage from "./ThreePanelPage";
import ContactPage from "./ContactsPage";

const AppContainer = styled.div`
  box-sizing: border-box;
`;

const HomePage =()=> {

    return(
    <AppContainer>
        {/* <Header /> */}
        <Main />
        <ThreePanelPage />
        <ContactPage/>
      </AppContainer>
    );

}

export default HomePage;